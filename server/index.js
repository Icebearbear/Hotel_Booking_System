const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
//const firebase = require("../booking-sys/src/db/firebase");
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

//get selected hotel info
app.get("/viewhotel", (req, res) => {
  hotelId = req.query.hotelId;
  try {
    axios.get(`https://hotelapi.loyalty.dev/api/hotels/${hotelId}`)
      .then((hotelres) => {
        console.log("From API: "+hotelId)
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
  try {
    axios
      .get("https://ascendahotels.mocklab.io/api/hotels/diH7/prices/ean")
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
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
