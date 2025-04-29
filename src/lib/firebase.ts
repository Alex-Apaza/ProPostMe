// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHUqzdthByc_PvgjIFNZFeJn_ztJTDbSs",
  authDomain: "postmefdb.firebaseapp.com",
  projectId: "postmefdb",
  storageBucket: "postmefdb.firebasestorage.app",
  messagingSenderId: "91860125909",
  appId: "1:91860125909:web:1ed086436767253687fa5c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };