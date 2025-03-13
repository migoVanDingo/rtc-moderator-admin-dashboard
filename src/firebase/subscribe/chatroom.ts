import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../config/firebase"; // Adjust the import based on your firebase.js location

export const subscribeToChatrooms = (callback: (chatroom: any) => void) => {
    const q = query(collection(db, "chatrooms"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const chatroom = { id: change.doc.id, ...change.doc.data() }; // Include the chatroom ID
          callback(chatroom);
        }
      });
    });
  
    return unsubscribe;
  };