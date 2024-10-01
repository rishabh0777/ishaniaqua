// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR4cuzoxT0EaCeyx4erYYBFuUiGLRIJH8",
  authDomain: "ishaniaquamineralwater.firebaseapp.com",
  projectId: "ishaniaquamineralwater",
  storageBucket: "ishaniaquamineralwater.appspot.com",
  messagingSenderId: "814469387669",
  appId: "1:814469387669:web:98472b9d2eeef6e60b529c",
  measurementId: "G-B8FL8K9LV2",
  databaseURL:'https://ishaniaquamineralwater-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)

export { auth, db }
