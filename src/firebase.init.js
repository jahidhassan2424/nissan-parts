
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: " AIzaSyDfUmiXqYlXaklfgujigKc_9fQOY62h9Kc",
//     authDomain: " nissan-parts.firebaseapp.com",
//     projectId: " nissan-parts",
//     storageBucket: " nissan-parts.appspot.com",
//     messagingSenderId: " 713230611424",
//     appId: " 1:713230611424:web:6f02c0d2cb559d795fb185",
// };
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;