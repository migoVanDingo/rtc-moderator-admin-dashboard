import { db } from "../../../config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export const subscribeToMessages = (chatroomId: string, callback: (messages: any[]) => void) => {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, where("chatroomId", "==", chatroomId), orderBy("timestamp", "asc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Messages:', messages);

    callback(messages);
  }, (error) => {
    console.error("Error subscribing to messages:", error);
  });

  return unsubscribe; // Call this function to stop listening
};
