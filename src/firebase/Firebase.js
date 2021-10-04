import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCHJXHa-pL3ssqfIHA62O_6XHmIn54P7c8",
  authDomain: "react-book-store-app-fc401.firebaseapp.com",
  projectId: "react-book-store-app-fc401",
  storageBucket: "react-book-store-app-fc401.appspot.com",
  messagingSenderId: "469173057072",
  appId: "1:469173057072:web:af201ba1e62d6de45bdff5",
  measurementId: "G-MB6VSBREZ3"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
