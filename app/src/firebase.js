// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEQRoLZ8y7-xFeDusdTaaav-l132xd06Q",
  authDomain: "sport-social-network-fea41.firebaseapp.com",
  projectId: "sport-social-network-fea41",
  storageBucket: "sport-social-network-fea41.appspot.com",
  messagingSenderId: "1047887461675",
  appId: "1:1047887461675:web:cc67eb35ff284d19e9596e",
  measurementId: "G-M6NPDPKQK2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);