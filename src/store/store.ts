import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import { chatroomSlice } from "./slices/chatroom";
export default configureStore({
    reducer: {
        user: userSlice.reducer,
        chatroom: chatroomSlice.reducer
    }
})