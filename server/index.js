const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const firebase = require("./firebase");

// // firebase part
// const admin = require("firebase-admin");
// const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const cors = require("cors");

// // initialize firebase and get firebase
// var serviceAccount = require("./service_account.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://HotelBooking.firebaseio.com",
// });
// const db = admin.firestore();

// const auth = getAuth(app)
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    firebase.Login(email, password);
    console.log("signed in");
    res.status(200).send("user signed in");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    firebase.registerWithEmailAndPassword("icebear", email, password);
    res.status(200).send("user added");
  } catch (error) {
    res.status(500).send(error);
  }

  // try{
  //   const {email, password} = req.body;
  //   console.log(email,password)
  //   getAuth().createUser({
  //     email: email,
  //     password: password
  //   })
  //   .then(userRecord => {
  //     console.log("Successfully created a new user: ", userRecord.uid);
  //     res.status(200).send({"Successfully created a new user: ": userRecord.uid})
  //   })
  //   .catch(error => {
  //     console.log("Error creating new user: ", error);
  //   })
  // }
  // catch(error) {
  //   console.log('error', error);
  //   return res.status(500).send(error)
  // }
});

// get all data
// app.get('/api/getAll', (req, res) => {
//   (async () => {
//       try {
//           let query = db.collection('users');
//           let response = [];
//           await query.get().then(querySnapshot => {
//           let docs = querySnapshot.docs;
//           for (let doc of docs) {
//               const selectedItem = {
//                   id: doc.id,
//                   name: doc.data().name
//               };
//               response.push(selectedItem);
//           }
//           });
//           // debugger;
//           return res.status(200).send(response);
//       } catch (error) {
//           console.log(error);
//           return res.status(500).send(error);
//       }
//       });
//   });

// create to db
// app.post('/api/create', (req, res) => {
//   (async () => {
//       try {
//         await db.collection('users').doc("la")
//             .create( {
//               id: "la",
//               name: "la"
//           });
//         return res.status(200).send();
//       } catch (error) {
//         console.log(error);
//         return res.status(500).send(error);
//       }
//     });
// });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
