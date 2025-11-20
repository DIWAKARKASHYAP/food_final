import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCg5zb2l8aCWAvqfxIIWahPdQAiAw8V7RU",

  authDomain: "food-app-5656c.firebaseapp.com",

  projectId: "food-app-5656c",

  storageBucket: "food-app-5656c.firebasestorage.app",

  messagingSenderId: "757010974851",

  appId: "1:757010974851:web:e07124ba56cb8a0683f3b6",

  measurementId: "G-H3N1CX2BK8"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
