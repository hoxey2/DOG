import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3j9VvWNxeE16lCyNDy7XFvpkNP6wlEjg",
  authDomain: "doge-37221.firebaseapp.com",
  projectId: "doge-37221",
  storageBucket: "doge-37221.appspot.com",
  messagingSenderId: "13095091904",
  appId: "1:13095091904:web:e2f765259b2e3e19563725",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
