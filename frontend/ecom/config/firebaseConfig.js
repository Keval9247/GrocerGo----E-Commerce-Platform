// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBw_uDCTkcjAOLNW8mURx-cYRGqS9-oCnk",
    authDomain: "gocergo-396b9.firebaseapp.com",
    projectId: "gocergo-396b9",
    storageBucket: "gocergo-396b9.firebasestorage.app",
    messagingSenderId: "799571479352",
    appId: "1:799571479352:web:2edc46a7eaa2e589478fcd",
    measurementId: "G-M335MF87VY"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// for deploying and hostig this app to firebase use this commands for hosting ad setup.
// firebase login
// firebase init
// firebase deploy
