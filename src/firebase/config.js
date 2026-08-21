import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXsZhVKDGhmQ7FVAkv0VvmBBXfIRBkWNI",
  authDomain: "college-event-site-68d8c.firebaseapp.com",
  projectId: "college-event-site-68d8c",
  storageBucket: "college-event-site-68d8c.firebasestorage.app",
  messagingSenderId: "481594832523",
  appId: "1:481594832523:web:ef9c6a50f884628339068e",
  measurementId: "G-KCFQDP3NVQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);