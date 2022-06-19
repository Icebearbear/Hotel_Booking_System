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
// console.log(firebaseConfig);
const app = initializeApp(fc.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("signed in");
  } catch (err) {
    throw error;
  }
};

const Login = async (email, password) => {
  console.log(email, password);
  try {
    const r = await signInWithEmailAndPassword(auth, email, password);
    console.log(r);
  } catch (error) {
    throw error;
  }
};

module.exports = { registerWithEmailAndPassword, Login };
