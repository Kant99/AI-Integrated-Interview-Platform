// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSHlyLOqWkIhO2SpfGy2ijRofGOP3vWag",
  authDomain: "mockinterview-ai-6c2f1.firebaseapp.com",
  projectId: "mockinterview-ai-6c2f1",
  storageBucket: "mockinterview-ai-6c2f1.appspot.com",
  messagingSenderId: "691334985706",
  appId: "1:691334985706:web:807a27769ff9dc472a6493",
  measurementId: "G-TMXK96FJ80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
