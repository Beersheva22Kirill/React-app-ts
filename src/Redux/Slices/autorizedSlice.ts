import {createSlice} from "@reduxjs/toolkit";
import UserData from "../../Model/UserData";

const localUser:string|null = localStorage.getItem('localUser');
const currentUser:UserData = localUser ? JSON.parse(localUser) : {email:"unauthorized",role:"unauthorized"};
const initialState: {userStatus: UserData} = {
    
    userStatus: currentUser
}

const slice = createSlice({
    initialState,
    name:"userStatusState",
    reducers: {
        setStatus: (state,data) => {
            state.userStatus = data.payload as UserData;
        },
        reset: (state) => {
            state.userStatus = {email:"unauthorized",role:"unauthorized"}
        }
    }
})

export const userStateAction = slice.actions;
export const userStateReducer = slice.reducer;