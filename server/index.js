const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const firebase = require("./firebase");
const cors = require("cors");
const axios = require("axios");
app.use(cors({ origin: '*' }));
app.use(express.json());
const path = require("path");

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
        res.send(hotelres.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
// get user auth (not fully working)
app.get("/user", (req, res) => {
  try {
    const auth = firebase.auth;
    res.status(200).send(auth);
  } catch (err) {
    res.status(500).send(err);
  }
});

// book hotel
app.post("/bookhotel", (req, res) => {
  try {
    firebase.bookHotel(req.body);
    console.log("booked");
    res.status(200).send("booked");
  } catch (err) {
    res.status(500).send(err);
  }
});

// logout user
app.post("/logout", (req, res) => {
  firebase.Logout();
  console.log("signout");
  res.status(200).send("signed out");
});

// login existing user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    firebase.Login(email, password);
    console.log("signed in");
    res.status(200).json({ message: "signin" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// register new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    firebase.registerWithEmailAndPassword("icebear", email, password);
    res.status(200).send("user added");
  } catch (error) {
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
