import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt1zexw2sL0j7-PalnBXZAbhiZUZlD91E",
  authDomain: "notify-360-1751d.firebaseapp.com",
  projectId: "notify-360-1751d",
  storageBucket: "notify-360-1751d.appspot.com",
  messagingSenderId: "997192206713",
  appId: "1:997192206713:web:64eeb1762139d7f08ec7a8",
  measurementId: "G-LH6M8BTR51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
