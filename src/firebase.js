// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mega-estate-a0b37.firebaseapp.com",
  projectId: "mega-estate-a0b37",
  storageBucket: "mega-estate-a0b37.appspot.com",
  messagingSenderId: "1074165172817",
  appId: "1:1074165172817:web:d0e6a804d243b30a088670"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);