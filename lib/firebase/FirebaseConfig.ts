// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJy4e-FQtBn0NTO1IZfJaGuM6Qhz1_vYc",
  authDomain: "first-app-fed81.firebaseapp.com",
  databaseURL:
    "https://first-app-fed81-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "first-app-fed81",
  storageBucket: "first-app-fed81.appspot.com",
  messagingSenderId: "298293343826",
  appId: "1:298293343826:web:136fbec5a2c7cb5019918b",
  measurementId: "G-SF6T0TY42D",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
