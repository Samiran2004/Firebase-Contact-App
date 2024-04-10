// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcaJrDkE0f6wyhkADP3OHwu0PQwCdrAsg",
  authDomain: "fir-contact-manager-c6516.firebaseapp.com",
  projectId: "fir-contact-manager-c6516",
  storageBucket: "fir-contact-manager-c6516.appspot.com",
  messagingSenderId: "583520789001",
  appId: "1:583520789001:web:85d1302dadac9359e84ed8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);