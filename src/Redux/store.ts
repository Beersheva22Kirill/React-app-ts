import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userStateReducer } from "./Slices/autorizedSlice";
import { codeReducer } from "./Slices/codeSlice";
import CodeType from "../Model/CodeType";
import { CodePayload } from "../Model/CodePayload";

export const store = configureStore({
   
    reducer: {
        userState:userStateReducer,
        codeState:codeReducer
    }
})

export function useSelectorUserState() {
    return useSelector<any,any>(state => state.userState.userStatus)
}

export function useSelectorCode() {
    return useSelector<any,CodePayload>(state => state.codeState.codeMessage)
}
