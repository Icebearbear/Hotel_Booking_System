const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
//const firebase = require("../booking-sys/src/db/firebase");
const cors = require("cors");
const axios = require("axios");
app.use(cors({ origin: '*' }));
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
const {destination_id, checkin,checkout} = req.query.searchData;
  console.log(req.query);
  // var destination_id = searchData.destination_id;
  try {
    axios
      .get(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1`)
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
  try {
    axios
      .get("https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU")
      .then((hotelres) => {
        res.status(200);
        console.log(hotelres.data);
        res.send(hotelres.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(500).send(err);
  }
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
