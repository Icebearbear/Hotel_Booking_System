const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const firebase = require("./firebase");
const cors = require("cors");
app.use(cors({ origin: true }));
app.use(express.json());

// server start message
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
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
app.post("/book", (req, res) => {
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

// serve at port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
