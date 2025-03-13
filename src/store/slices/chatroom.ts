import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatrooms: [],
    currentChatroom: "",
    messages: [],
    members: [],

}

export const chatroomSlice = createSlice({
    name: "chatroom",
    initialState,
    reducers: {
        setChatrooms: (state, action) => {
            state.chatrooms = action.payload
        },
        setCurrentChatroom: (state, action) => {
            state.currentChatroom = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setMembers: (state, action) => {
            state.members = action.payload
        }
        
    }
})

export const { setChatrooms, setCurrentChatroom, setMessages, setMembers } = chatroomSlice.actions