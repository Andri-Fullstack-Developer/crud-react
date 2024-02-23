import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArxTgWrsyOyELd8S300bzXGi_SkEKXh4s",
  authDomain: "andev-3e08b.firebaseapp.com",
  projectId: "andev-3e08b",
  storageBucket: "andev-3e08b.appspot.com",
  messagingSenderId: "346397684188",
  appId: "1:346397684188:web:2dfeb99ddd03a29e521f19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getGalery = getStorage(app);
export const firestoreDb = getFirestore(app);
