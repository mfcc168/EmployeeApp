import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: "lafarge-management.firebaseapp.com",
  projectId: "lafarge-management",
  storageBucket: "lafarge-management.firebasestorage.app",
  messagingSenderId: "65778745058",
  appId: process.env.EXPO_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
