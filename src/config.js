import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import firestore
// require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyArxTgWrsyOyELd8S300bzXGi_SkEKXh4s",
  authDomain: "andev-3e08b.firebaseapp.com",
  projectId: "andev-3e08b",
  storageBucket: "andev-3e08b.appspot.com",
  messagingSenderId: "346397684188",
  appId: "1:346397684188:web:0677e4c15f22ead5521f19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);
export const firestoreDb = getFirestore(app);
