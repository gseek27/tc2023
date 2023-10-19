// Import the functions you need from the SDKs you need
//import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from "firebase/analy

import { setPersistence, browserLocalPersistence } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//import { getFirestore, addDoc, collection } from 'firebase/firestore';  // <-- Import FieldValue
//import { serverTimestamp } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const apiKey = process.env.VUE_APP_FIRESTORE_API_KEY
const authDomain = process.env.VUE_APP_FIRESTORE_AUTH_DOMAIN
const projectId = process.env.VUE_APP_FIRESTORE_PROJECT_ID
const storageBucket = process.env.VUE_APP_FIRESTORE_STORAGE_BUCKET
const messagingSenderId = process.env.VUE_APP_FIRESTORE_MESSAGING_SENDER_ID
const appId = process.env.VUE_APP_FIRESTORE_APP_ID
const measurementId = process.env.VUE_APP_FIRESTORE_MEASUREMENT_ID

const firebaseConfig = {

  apiKey: apiKey,

  authDomain: authDomain,

  projectId: projectId,

  storageBucket: storageBucket,

  messagingSenderId: messagingSenderId,

  appId: appId,

  measurementId: measurementId

};




const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)

<<<<<<< HEAD
export { db, auth }
=======
export { db, auth }
>>>>>>> faea81d2 (Fix git fls errors)
