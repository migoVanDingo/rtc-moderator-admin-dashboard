import { db } from "../../../config/firebase";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";

export const sendMessage = async (chatroomId: string, senderId: string, content: string) => {
  try {
    await addDoc(collection(db, "messages"), {
      chatroomId,
      senderId,
      content,
      timestamp: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const getMessagesForChatroom = async (chatroomId: string) => {
  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("chatroomId", "==", chatroomId), orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);

    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
