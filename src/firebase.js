// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnk_0PNkbovIp7i4c5k6iUpc3_fpJVvpc",
  authDomain: "womern-safety.firebaseapp.com",
  projectId: "womern-safety",
  storageBucket: "womern-safety.firebasestorage.app",
  messagingSenderId: "722733419923",
  appId: "1:722733419923:web:1e195760e86b08c1d3ec66",
  measurementId: "G-M02ELJPLM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, database, storage, analytics };
