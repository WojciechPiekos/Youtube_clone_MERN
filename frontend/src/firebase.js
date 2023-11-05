// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "video-29405.firebaseapp.com",
  projectId: "video-29405",
  storageBucket: "video-29405.appspot.com",
  messagingSenderId: "522769148576",
  appId: "1:522769148576:web:41bd48ba1164d3d79e37c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider()

export default app;
