const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
app.use(cors({ origin: "*" }));

app.use(express.json());
const path = require("path");

const { initializeApp } = require("firebase/app");
const {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} = require("firebase/auth");
const {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} = require("firebase/firestore");

const fc = require("./firebase_config");
// console.log(fc);
const apps = initializeApp(fc.firebaseConfig);
const auth = getAuth(apps);
const db = getFirestore(apps);

// server start message
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

const stripe = require("stripe")(`${process.env.PRIVATE_KEY}`);
// check out page served by Stripe for payment
app.post("/create-checkout-session", async (req, res) => {
  const hotel = req.body.hotelID;
  const price = req.body.price;
  const noNight = req.body.bookingInfo.noNight;
  // price set by Stripe is in cents. So convert to cents to show the correct on Stripe checkout page (price*50)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sgd",
            product_data: {
              name: hotel,
            },
            unit_amount: price * 50,
          },
          quantity: noNight,
        },
      ],
      success_url: "http://localhost:3000/success", // served upon success
      cancel_url: "http://localhost:3000/cancel", // served upon cancelled
    });

    res
      .status(200)
      .json({ url: session.url, paymentID: session.payment_intent });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//get selected hotel info from search
app.get("/viewhotel", (req, res) => {
  hotelId = req.query.hotelId;
  try {
    axios
      .get(`https://hotelapi.loyalty.dev/api/hotels/${hotelId}`)
      .then((hotelres) => {
        console.log("From API: " + hotelId);
        const imgDet = hotelres.data.image_details;
        const ids = hotelres.data.hires_image_index;

        const imgUrl = [];
        if (typeof ids !== 'undefined') {
          const imgId = ids.split(",");
          imgId.forEach(
            (imageI) =>
              (imgUrl[`${imageI}`] = imgDet["prefix"] + imageI + imgDet["suffix"])
          );
        }
        else{
          for (let i = 0; i < hotelres.data.number_of_images; i++) {
            imgUrl[`${i}`] = imgDet["prefix"] + i + imgDet["suffix"]
          }
            
        }

        res.status(200).json({
          data: JSON.stringify(hotelres.data),
          iurl: JSON.stringify(imgUrl),
        });
      })
      .catch((error) => {
        console.log("HUHHHHHHHHH " + error.message);
      });
  } catch (err) {
    res.status(500).send("WHATTTTTTTTTT " + err.message);
  }
});

app.get("/hotelnprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  console.log(searchData);
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  var guests = searchData.guests;
  var urlPrice = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=${guests}&partner_id=1`;
  const requestPrice = axios.get(urlPrice);
  const requestHotel = axios.get("https://hotelapi.loyalty.dev/api/hotels", {
    params: { destination_id: destination_id },
  });
  var fhotels = [];
  var len = 0;
  axios
    .all([requestPrice, requestHotel])
    .then(
      axios.spread((...responses) => {
        const hotelPrices = responses[0].data.hotels;
        const hotelDetails = responses[1].data;
        // console.log(hotelPrices);
        // console.log(hotelDetails);
        // console.log(hotelPrices);
        // hotelPrices.map((val) => console.log(val.id));
        hotelPrices.map((value) => {
          let match = hotelDetails.find((detail) => detail.id === value.id);

          const output = (value.id && match) || null;
          if (output !== null) {
            fhotels.push({ ...value, ...output });
            len = len + 1;
          }
        });
        // console.log("ONEEEE ", fhotels);
        // // console.log("TWOOOOOO ", responsetWO.data);

        res.status(200).json({
          finalData: JSON.stringify(fhotels),
          dataLen: len,
        });
        // use/access the results
      })
    )
    .catch((errors) => {
      console.log("ERRORR", errors.message);
      res.status(500).send(errors.message);
      // react on errors.
    });
});

app.get("/hotelidprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  console.log(searchData);
  var hotel_id = searchData.hotel_id;
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  var url = `https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`;
  console.log("get from: " + url);

  try {
    axios
      .get(url)
      .then((roomres) => {
        console.log("got SPECIFIC HOTEL room prices ")
        res.status(200);
        res.send(roomres.data); //returned data is in roomprices.data and send it to react frontend
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

//get hotel prices. need to match with the hotelID from /hotels route
//maybe request hotels and its prices at the same time using the same API route
//match up the hotel and its prices
//pass a clean data to the front end
app.get("/hotelprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  console.log(searchData);
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  var url = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`;
  console.log(url);

  // const {destination_id, checkin,checkout} = req.query.searchData;

  try {
    axios
      .get(url)
      .then((prices) => {
        console.log("got room prices " + prices.data);
        res.status(200);
        res.send(prices.data); //returned data is in prices.data and send it to react frontend
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

//get hotels
app.get("/hotels", (req, res) => {
  const destination_id = req.query.data;

  try {
    axios
      .get("https://hotelapi.loyalty.dev/api/hotels", {
        params: { destination_id: destination_id },
      })
      .then((hotelres) => {
        res.status(200);
        //console.log(hotelres.data);
        res.send(hotelres.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/deleteBook", async (req, res) => {
  const { docId, userID } = req.body;
  //check if id exist//////
  //////
  // const docId = "R3z3gkRt8b6GeuWgkv6s";
  console.log(docId, userID);
  try {
    await deleteDoc(doc(db, "booking", docId));
    var finalData = [];
    var ids = [];
    const q = query(collection(db, "booking"), where("uid", "==", userID));
    const docSnapshot = await getDocs(q);
    const d = docSnapshot.docs.map((doc) => {
      // const bookDt = doc.data();
      // finalData.push(bookDt);
      finalData.push([doc.id, doc.data()]);
    });
    res.status(200).json({ finalData: finalData });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/getBook", async (req, res) => {
  const userID = req.query.uid;
  // const userID = "rRETHSuFXTVjzmyN6VjnAPDj7YB2";
  try {
    var finalData = [];
    var ids = [];
    const q = query(collection(db, "booking"), where("uid", "==", userID));
    const docSnapshot = await getDocs(q);
    const d = docSnapshot.docs.map((doc) => {
      // finalData.push(doc.data());
      finalData.push([doc.id, doc.data()]);
    });
    res.status(200).json({ finalData: finalData });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
// book hotel
app.post("/bookhotel", (req, res) => {
  console.log("bookhotel");
  try {
    const hotelBookRef = collection(db, "booking");
    addDoc(hotelBookRef, req.body);
    console.log("booked");
    res.status(200).send("booked");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get user info (not fully working)
app.get("/user", async (req, res) => {
  const userID = req.query.uid;
  try {
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const docSnapshot = await getDocs(q);
    const d = docSnapshot.docs.map((doc) => {
      res.status(200).json({ id: doc.id, data: doc.data() });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/edituser", async (req, res) => {
  const { first_name, last_name, email, uid, dbDocId } = req.body;
  // console.log(dbDocId, first_name, last_name, email, uid);
  try {
    const userRef = doc(db, "users", dbDocId);
    updateDoc(userRef, {
      email: email,
      first_name: first_name,
      last_name: last_name,
    });
    res.status(200).send("updated");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// logout user
app.post("/logout", (req, res) => {
  signOut(auth);
  console.log("signout");
  res.status(200).send("signed out");
});

// login existing user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const r = await signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        var data = userCredentials.user.reloadUserInfo;
        res.status(200).json({ userId: data.localId, email: data.email });
      }
    );
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).send(err);
  }
});

// register new user
app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    //firebase.registerWithEmailAndPassword("icebear", email, password);

    const r = await createUserWithEmailAndPassword(auth, email, password);
    const user = r.user;
    addDoc(collection(db, "users"), {
      uid: user.uid,
      first_name,
      last_name,
      email,
    });
    console.log("registered user");
    res.status(200).send("user added");
  } catch (error) {
    console.log("ERROR ", error);
    res.status(500).send(error);
  }
});

app.get("/favicon.ico", (req, res) => {
  // Use actual relative path to your .ico file here
  res.sendFile(path.resolve(__dirname, "../favicon.ico"));
});

// serve at port
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
