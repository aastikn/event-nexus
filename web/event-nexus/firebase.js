// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebaseConfig"
import { getAuth } from "firebase/auth";


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
