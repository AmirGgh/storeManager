import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmCjBv5-SRpwA-0J1WWZ-xnYPmOc0x6bI",
  authDomain: "reactfinalproject-c10a3.firebaseapp.com",
  projectId: "reactfinalproject-c10a3",
  storageBucket: "reactfinalproject-c10a3.appspot.com",
  messagingSenderId: "498213838969",
  appId: "1:498213838969:web:6c479e5fd0ad7bce3ef4a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
