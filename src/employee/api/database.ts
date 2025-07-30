import { doc, getDoc } from "firebase/firestore";
import { db } from "@config/firebaseConfig";

export const fetchUser = async (userUid: string) => {
    const userDocRef = doc(db, "users", userUid);
    const userDoc = await getDoc(userDocRef);
  
    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No user found!");
    }
    return;
}