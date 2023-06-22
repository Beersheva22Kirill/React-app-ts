import {createSlice} from "@reduxjs/toolkit";

function getDirection() : 'column' | 'row'{

    return window.innerWidth > window.innerHeight ? 'row' : 'column';
}
const initialState: {direction: 'column' | 'row'} = {
    direction: "row"
}

const slice = createSlice({
    initialState: initialState,
    name: 'directionState',
    reducers: {
        setDirection: (state) => {
            state.direction = getDirection()
        }
    }
});

export const directionActions = slice.actions;
export const directionReducer = slice.reducer;
