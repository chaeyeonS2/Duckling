// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import * as firebase from 'firebase/app';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);  //앱 초기화
// const auth = getAuth();  //인증 초기화

// export { auth }  //관련 기능 사용



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDNyQ4MoZz2uTchwXQyxKL8ObjG9ZLd4RY",
    authDomain: "netural-app.firebaseapp.com",
    projectId: "netural-app",
    storageBucket: "netural-app.appspot.com",
    messagingSenderId: "5750692533",
    appId: "1:5750692533:web:5a5f2c7e706cd20cd7bcfc"
  };
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();  
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage }  