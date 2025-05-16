// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA58HtiFVijC0gxKMG8iUmpVtuSF1D8e7E",
  authDomain: "managrs-sd.firebaseapp.com",
  projectId: "managrs-sd",
  storageBucket: "managrs-sd.firebasestorage.app",
  messagingSenderId: "422570607766",
  appId: "1:422570607766:web:e01ae26c566eb4a366eeb7"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const auth = getAuth();

export {auth};