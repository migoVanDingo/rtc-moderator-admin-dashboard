import { useEffect, useState } from "react";
import { getAllUsers, removeUserFromChatroom } from "../firebase/collections/user";
import { subscribeToChatroomUsers } from "../firebase/collections/chatroom";

export const useUserList = (currentChatroom: string) => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);


      

    useEffect(() => {
        const init = () => {
            currentChatroom !== "" ? getRoomMembers(currentChatroom) : fetchUsers();

        }
        return init();
    }, [])

    useEffect(() => {
        const init = () => {
            currentChatroom !== "" && getRoomMembers(currentChatroom);

        }
        return init();
    }, [currentChatroom]);

    const fetchUsers = async () => {
        console.log('fetch all users')
        const username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).username : "";
        let users = await getAllUsers() as any;        
        users = users.filter((user: any) => user.username !== username && user.active);
        setUserList(users);
        setLoading(false)
    }

    const getRoomMembers = async (chatroomId: string) => {

        console.log('Get Room Members')

        const callback = (members: any) => {
            setUserList(members.filter((member: any) => member.email !== email));
        }

        subscribeToChatroomUsers(chatroomId, callback);
        const email = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).email : "";

        console.log("email", email)
        
        
    }

    const bootUser = async (chatroomId: string, userId: string) => {
        removeUserFromChatroom(chatroomId, userId);
    }


    return { userList, loading, getRoomMembers, bootUser }

}