// Import the functions you need from the SDKs you need
//import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analy

import { setPersistence, browserLocalPersistence } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//import { getFirestore, addDoc, collection } from 'firebase/firestore';  // <-- Import FieldValue
//import { serverTimestamp } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyAxG3LGCtQHwZLxIxvFoaplouY5HlNU6JM",
  
    authDomain: "tc2023-21859.firebaseapp.com",
  
    projectId: "tc2023-21859",
  
    storageBucket: "tc2023-21859.appspot.com",
  
    messagingSenderId: "960022654133",
  
    appId: "1:960022654133:web:79b8495bce163d7f3322fc",
  
    measurementId: "G-589259DH29"
  
  };
  

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


const db = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { db, auth };
