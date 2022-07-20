const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
//const firebase = require("../booking-sys/src/db/firebase");
const cors = require("cors");
const axios = require("axios");
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
} = require("firebase/firestore");

const fc = require("./firebase_config");
// console.log(fc);
const apps = initializeApp(fc.firebaseConfig);
const auth = getAuth(apps);
const db = getFirestore(apps);

// server start message
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

//get selected hotel info
app.get("/viewhotel", (req, res) => {
  try {
    axios
      .get(
        "https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU",
        req.body
      )
      .then((hotelres) => {
        res.status(200);
        res.send(hotelres.data);
      })
      .catch((error) => {
        console.log(error);
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
  // try {
  //   axios
  //     .get("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
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
        res.status(200);
        res.send(prices.data); //returned data is in prices.data and send it to react frontend
      })
      .catch((error) => {
        console.log(error);
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
        // console.log(hotelres.data);
        res.send(hotelres.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/hotelnprices", (req, res) => {
  const searchData = JSON.parse(req.query.data);
  console.log(searchData);
  var destination_id = searchData.destination_id;
  var checkin = searchData.checkin;
  var checkout = searchData.checkout;
  var urlPrice = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`;
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

// book hotel
app.post("/bookhotel", (req, res) => {
  try {
    //firebase.bookHotel(req.body);
    console.log("booked");
    res.status(200).send("booked");
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user auth (not fully working)
// app.get("/user", (req, res) => {
//   try {
//     const auth = firebase.auth;
//     // console.log(auth);

//     res.status(200).send(auth);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
// logout user
// app.post("/logout", (req, res) => {
//   firebase.Logout();
//   console.log("signout");
//   res.status(200).send("signed out");
// });

// login existing user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const r = await signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        res.status(200).send(userCredentials);
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
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
