import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn2g3rZGbaKckJuNcPnibn3Q3zf7K1cF8",
  authDomain: "health20-b7852.firebaseapp.com",
  projectId: "health20-b7852",
  storageBucket: "health20-b7852.appspot.com",
  messagingSenderId: "1061496737167",
  appId: "1:1061496737167:web:b89e6d0673449feecb4ffa",
  measurementId: "G-ZR3ZCE3N02",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
