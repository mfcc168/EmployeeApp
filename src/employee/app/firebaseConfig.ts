import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTce8kSu7LlDcgF3SJzUGt_KcQWEEkotQ",
  authDomain: "lafarge-management.firebaseapp.com",
  projectId: "lafarge-management",
  storageBucket: "lafarge-management.firebasestorage.app",
  messagingSenderId: "65778745058",
  appId: "1:65778745058:android:5f11a6dcd1d19ffa08a8bb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
