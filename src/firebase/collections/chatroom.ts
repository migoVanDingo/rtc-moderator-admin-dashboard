import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const createChatroom = async (name: string, createdBy: string) => {

  try {
    const docRef = await addDoc(collection(db, "chatrooms"), {
      name,
      createdBy,
      members: [createdBy],
      createdAt: serverTimestamp(),
    });
    console.log("Chatroom created with ID:", docRef.id);

    localStorage.setItem("chatroomId", docRef.id);
    return docRef.id;

  } catch (error) {
    console.error("Error creating chatroom:", error);
  }
};

export const getAllChatrooms = async () => {
  try {
    const chatroomsSnapshot = await getDocs(collection(db, "chatrooms"));
    const chatroomsList = chatroomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(chatroomsList);
    return chatroomsList;
  } catch (error) {
    console.error("Error getting chatrooms: ", error);
  }
};


export const addUserToChatroom = async (chatroomId: string, userId: string) => {
  try {
    const chatroomRef = doc(db, "chatrooms", chatroomId);

    await updateDoc(chatroomRef, {
      members: arrayUnion(userId), // Add userId to the array without duplicates
      updateAt: serverTimestamp(),
    });

    console.log(`User ${userId} added to chatroom ${chatroomId}`);
    return true;
  } catch (error) {
    console.error("Error adding user to chatroom:", error);
    return false;
  }
};



export const getUsersFromChatroom = async (chatroomId: string) => {
  try {
    // Get chatroom document
    const chatroomRef = doc(db, "chatrooms", chatroomId);
    const chatroomSnap = await getDoc(chatroomRef);

    if (!chatroomSnap.exists()) {
      console.error("Chatroom not found");
      return [];
    }

    const { members } = chatroomSnap.data(); // Get members array (userIds)
    if (!members || members.length === 0) return [];

    // Query users where ID is in the members array
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("__name__", "in", members));

    const usersSnapshot = await getDocs(q);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error("Error fetching users from chatroom:", error);
    return [];
  }
};


export const subscribeToChatroomUsers = (chatroomId: string, callback: any) => {
  // Listen for changes in the chatroom document
  const chatroomRef = doc(db, "chatrooms", chatroomId);

  const unsubscribe = onSnapshot(chatroomRef, async (chatroomSnap) => {
    if (!chatroomSnap.exists()) {
      console.error("Chatroom not found");
      callback([]); // Return empty array if chatroom doesn't exist
      return;
    }

    const { members } = chatroomSnap.data();
    if (!members || members.length === 0) {
      callback([]);
      return;
    }

    try {
      // Fetch users where ID is in the members array
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("__name__", "in", members));

      const usersSnapshot = await getDocs(q);
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(users); // Update UI with new users
    } catch (error) {
      console.error("Error fetching users from chatroom:", error);
      callback([]);
    }
  });

  return unsubscribe; // Call this function to stop listening when needed
};

