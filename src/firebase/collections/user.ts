import { db } from "../../../config/firebase";
import { arrayRemove, collection, doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export const createUser = async (userId: string, username: string) => {
  try {
    await setDoc(doc(db, "users", userId), {
      username,
      active: false,
      createdAt: new Date(),
    });
    console.log("User created!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getAllUsers = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
  
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID (user UID)
        ...doc.data(), // Spread the document data
      }));

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };



let typingTimeout: NodeJS.Timeout | null = null;

export const setTypingStatus = async (userId: string, isTyping: boolean) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isTyping,
      lastActive: serverTimestamp(), // Also update last active
    });

    // If user is typing, reset the timeout
    if (isTyping) {
      if (typingTimeout) clearTimeout(typingTimeout);

      typingTimeout = setTimeout(async () => {
        await updateDoc(userRef, { isTyping: false, lastActive: serverTimestamp() });
      }, 3000); // Reset after 3 seconds
    }

    console.log(`User ${userId} isTyping: ${isTyping}`);
  } catch (error) {
    console.error("Error updating typing status:", error);
  }
};

export const updateLastActive = async (userId: string) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        lastActive: serverTimestamp(),
        isTyping: false, // Ensure typing is reset when they leave
      });
    } catch (error) {
      console.error("Error updating last active:", error);
    }
  };
  
  // Call this function when the user leaves
  window.addEventListener("beforeunload", () => {
    updateLastActive("user123"); // Replace with actual user ID
  });


export const removeUserFromChatroom = async (chatroomId: string, userId: string) => {
  try {
    const chatroomRef = doc(db, "chatrooms", chatroomId);

    // Use arrayRemove to remove the userId from the members array
    await updateDoc(chatroomRef, {
      members: arrayRemove(userId),
      updatedAt: serverTimestamp(),
    });

    console.log(`User ${userId} removed from chatroom ${chatroomId}`);
    return true;
  } catch (error) {
    console.error("Error removing user from chatroom:", error);
    return false;
  }
};
