import { configureStore } from "@reduxjs/toolkit";
import { directionReducer } from "./Slices/flexDirectionSlice";
import { countReducer } from "./Slices/livesCountSlice";
import { sizeReducer } from "./Slices/cellSizeSlice";
import { useSelector } from "react-redux";

export const store = configureStore({

    reducer: {
        directionState: directionReducer,
        countState: countReducer,
        sizeState: sizeReducer
    }
})

export function useSelectorDirection() {
    return useSelector<any,any>(state => state.directionState.direction)
}

export function useSelectorCount() {
    return useSelector<any,any>(state => state.countState.count)
}

export function useSelectorSize() {
    return useSelector<any,any>(state => state.sizeState.size)
}