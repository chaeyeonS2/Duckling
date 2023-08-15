// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import "firebase/storage";

const provider = new TwitterAuthProvider();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
	databaseURL: process.env.REACT_APP_DATABASE
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);  //앱 초기화
const auth = getAuth();  //인증 초기화
const database = getDatabase(app);  //데이터베이스 초기화

export { auth, database }  //관련 기능 사용