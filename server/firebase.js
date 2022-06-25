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

const bookHotel = (info) => {
  try {
    const hotelBookRef = collection(db, "booking");
    return addDoc(hotelBookRef, info);
  } catch (error) {
    throw error;
  }
};
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
    console.log("registered user");
  } catch (error) {
    throw error;
  }
};

const Login = async (email, password) => {
  console.log(email, password);
  try {
    const r = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

const Logout = () => {
  signOut(auth);
};

module.exports = { registerWithEmailAndPassword, Login, Logout, bookHotel };
