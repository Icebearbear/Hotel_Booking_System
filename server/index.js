const express = require("express");
// var session = require('express-session')
const PORT = process.env.PORT || 3001;
const support = require('axios-cookiejar-support');
const tough = require('tough-cookie');
const app = express();
const cors = require("cors");
const axios = require("axios");
const http = require("http");
const https = require("https");
const nodemailer = require("nodemailer");
require("dotenv").config();
app.use(cors({ origin: "*", credentials:true }));
app.use(express.json());
const path = require("path");

const httpAgent = new http.Agent({ keepAlive: true, keepAliveMsecs:5000 })
const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs:5000 })

const BASE_URL = "https://hotelapi.loyalty.dev/api/hotels/prices";

const jar = new tough.CookieJar();
const api = support.wrapper(axios.create({jar}));

const { initializeApp } = require("firebase/app");
const {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
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
  connectFirestoreEmulator,
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
  const { hotelName, price, noNight, email } = req.body;
  // const hotel = req.body.hotelName;
  // const price = req.body.price;
  // const noNight = req.body.noNight;
  // const cus_email = req.body.email;
  console.log(hotelName, price, noNight);
  // price set by Stripe is in cents. So convert to cents to show the correct on Stripe checkout page (price*50)
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sgd",
            product_data: {
              name: hotelName,
            },
            unit_amount: Math.floor(price * 50),
          },
          quantity: noNight,
        },
      ],
      success_url: "http://localhost:3000/success", // served upon success
      cancel_url: "http://localhost:3000/cancel", // served upon cancelled
    });
    console.log(session);
    res
      .status(200)
      .json({ url: session.url, paymentID: session.payment_intent });
  } catch (e) {
    console.log(e.message);
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
        console.log(
          "From API: " + `https://hotelapi.loyalty.dev/api/hotels/${hotelId}`
        );
        const imgDet = hotelres.data.image_details;
        const ids = hotelres.data.hires_image_index;

        const imgUrl = [];
        if (typeof ids !== "undefined") {
          const imgId = ids.split(",");
          imgId.forEach(
            (imageI) =>
              (imgUrl[`${imageI}`] =
                imgDet["prefix"] + imageI + imgDet["suffix"])
          );
        } else {
          for (let i = 0; i < hotelres.data.number_of_images; i++) {
            imgUrl[`${i}`] = imgDet["prefix"] + i + imgDet["suffix"];
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

app.get("/hotelnprices", async(req, res) => {
  const searchData = JSON.parse(req.query.data);
  // console.log(searchData);
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  // var today = new Date();
  // var date = +(today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate());
  // var start = +(checkin.replace(/-/g,""));
  // var end = +(checkout.replace(/-/g,""));
  var guests = searchData.guests;
  var urlPrice = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=${guests}&partner_id=1`;
  console.log(urlPrice);
  const requestPrice = api.get(urlPrice); 
  const requestHotel = api.get("https://hotelapi.loyalty.dev/api/hotels", {params: { destination_id: destination_id } });
  var fhotels = [];
  var len = 0;
  var hotelPrices = null;
  var hotelDetails = null;
  var completed = false;
  var nulls = [];
  
    await Promise
      .all([requestPrice, requestHotel])
      .then((responses) => {
          completed = responses[0].data.completed;
          console.log(completed);
          hotelPrices = responses[0].data.hotels;
          console.log(Object.keys(hotelPrices).length)
          hotelDetails = responses[1].data;
          hotelPrices.map((value) => {
            let match = hotelDetails.find((detail) => detail.id === value.id);
            const output = (value.id && match) || null;
            if (output !== null) {
              // console.log(typeof(value))
              fhotels.push({ ...value, ...output });
              // console.log(output);
              len = len + 1;
            }else{
              nulls.push(value)
            }});
          res.status(200).json({
            finalData: JSON.stringify(fhotels),
            nulls: JSON.stringify(nulls),
            dataLen: Object.keys(hotelPrices).length,
            complete: completed
        });
      })
    .catch((errors) => {
      // res.status(errors.response.status).send(errors.response.statusText);
      console.log("Error", errors.response.status, errors.response.statusText);
    });
});

app.get("/hotelidprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  // console.log(searchData);
  var hotel_id = searchData.hotel_id;
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  var url = `https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`;
  console.log("get from: " + url);

  //   try{
  //   return new Promise((resolve, reject) => {
  //     const request = (retries) => {
  //       axios
  //       .get(url)
  //       .then((roomres) => {
  //         console.log("got hotel rooms, completed: " + roomres.data.completed)
  //         if (roomres.data.completed === false && retries > 0) {
  //           console.log("false");
  //           request(--retries);
  //         }
  //         else {
  //           console.log(roomres.data);
  //           res.status(200).send(roomres.data); //returned data is in roomprices.data and send it to react frontend
  //           return resolve(roomres.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //         res.status(error.response.status).send(error.message);
  //         reject(error);
  //       });
  //     }
  //     request(5);
  //   })
  // }
  //   catch (err) {
  //     res.status(500).send(err);
  //   }
  axios
    .get(url)
    .then((roomres) => {
      console.log("got hotel rooms, completed: " + roomres.data.completed);
      // if (roomres.data.completed === false) {
      //   console.log("die");
      // }
      // else {
      res.status(200).send(roomres.data); //returned data is in roomprices.data and send it to react frontend
      // }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.response.status).send(error.message);
    });
});

//get hotel prices. need to match with the hotelID from /hotels route
//maybe request hotels and its prices at the same time using the same API route
//match up the hotel and its prices
//pass a clean data to the front end
app.get("/hotelprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  // console.log(searchData);
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

    if (finalData.length == 0) {
      res.status(404).send("No such booking found");
    } else {
      res.status(200).json({ finalData: finalData });
    }
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
    if (docSnapshot.docs.length == 0) {
      res.sendStatus(404);
    } else {
      const d = docSnapshot.docs.map((doc) => {
        finalData.push([doc.id, doc.data()]);
      });
      console.log("lalalal", finalData);
      res.status(200).json({ finalData: finalData });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});
// book hotel
app.post("/bookhotel", async (req, res) => {
  try {
    const hotelBookRef = collection(db, "booking");
    const docRef = await addDoc(hotelBookRef, req.body);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        res.status(200).json({ status: "booked", docId: docRef.id });
      } else {
        res.status(500).send("Login required");
      }
    });
    console.log("booked");
  } catch (err) {
    // console.log(err);
    res.status(500).send(err);
  }
});

app.post("/mail", async (req, res) => {
  const frommail = `${process.env.FROM_EMAIL}`;
  const password = `${process.env.PASSWORD}`;
  const guestInfo = req.body.guestInformation;
  const tomail = guestInfo.email;
  const hotelName = req.body.hotelName;
  const bookingDets = req.body.bookingInfo;
  const paymentId = req.body.payeeInformation.paymentID;
  console.log(frommail, password, tomail);
  var mailMessage = {
    from: frommail,
    to: tomail,
    subject: "Booking confirmation for Hotel " + hotelName,
    text:
      "Dear Ms/Mr " +
      guestInfo.firstName +
      ",\nBooking and payment confirmation for Hotel :" +
      hotelName +
      "\nPayment id: " +
      paymentId +
      "\nBooking details as follow: " +
      bookingDets,
  };
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: frommail,
      pass: password,
    },
  });
  transporter.sendMail(mailMessage, function (error, info) {
    if (error) {
      console.log("MAILLL ERROR ", error);
      res.status(500).json({
        msg: "fail",
      });
    } else {
      res.status(200).json({
        msg: "success",
      });
    }
  });
});
// get current session of loged in user
app.get("/getSession", (req, res) => {
  var data = { login: false, uid: null };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      data = { login: true, uid: user.id };
      // res.status(200).json({ login: true, uid: user.id });
    }
    res.status(200).json(data);
  });
});

// get user info (not fully working)
app.get("/user", async (req, res) => {
  const userID = req.query.uid;
  try {
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const docSnapshot = await getDocs(q);
    if (docSnapshot.docs.length == 0) {
      res.send(404);
    }
    docSnapshot.docs.map((doc) => {
      // console.log(doc.id, doc.data());
      res.status(200).json({ id: doc.id, data: doc.data() });
    });

    // reach this point means docSnapshot is empty
  } catch (err) {
    // console.log(err);
    res.status(500).send(err);
  }
});

app.post("/edituser", async (req, res) => {
  const { first_name, last_name, email, uid, dbDocId } = req.body;
  // console.log(dbDocId, first_name, last_name, email, uid);
  try {
    // onAuthStateChanged(auth, (user) => {
    //   if (!user) {
    //     res.status(500).send("Login required");
    //   }
    // });
    var update = true;
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const docSnapshot = await getDocs(q);
    console.log(docSnapshot.docs.length);
    if (docSnapshot.docs.length == 0) {
      res.status(404).send("not-found");
    } else {
      docSnapshot.docs.map((doc) => {
        if (
          doc.data().first_name == first_name ||
          doc.data().last_name == last_name ||
          doc.data().email == email
        ) {
          update = false;
        }
      });
      console.log(update);

      if (update == false) {
        res.status(500).send({ code: "not-new-data-given" });
      } else {
        const userRef = doc(db, "users", dbDocId);
        await updateDoc(userRef, {
          email: email,
          first_name: first_name,
          last_name: last_name,
        });
        res.status(200).send("updated");
      }
    }
  } catch (error) {
    console.log(error.message);
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
        // console.log(data.localId, data.email);
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
    res
      .status(200)
      .json({ data: JSON.stringify("user added with email: " + email) });
  } catch (error) {
    console.log("ERROR ", error);
    res.status(500).json(error);
  }
});

// app.get("/favicon.ico", (req, res) => {
//   // Use actual relative path to your .ico file here
//   res.sendFile(path.resolve(__dirname, "../favicon.ico"));
// });

// serve at port
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
