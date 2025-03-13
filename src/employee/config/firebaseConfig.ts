import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: "lafarge-management.firebaseapp.com",
  projectId: "lafarge-management",
  storageBucket: "lafarge-management.firebasestorage.app",
  messagingSenderId: "65778745058",
  appId: process.env.EXPO_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Pass the app instance

const usersCollection = collection(db, "users");

getDocs(usersCollection)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => console.log(doc.id, "=>", doc.data()));
  })
  .catch((error) => console.error("Error fetching users:", error));

export const auth = getAuth(app);
export { db }; // Export Firestore instance if needed elsewhere
export default app;
