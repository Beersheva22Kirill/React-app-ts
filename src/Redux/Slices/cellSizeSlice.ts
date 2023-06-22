import {createSlice} from '@reduxjs/toolkit'
import config from '../../Config/config.json';

const {matrix} = config;

function getSize(){
    
    return Math.min(window.innerHeight, window.innerWidth)/(matrix.heigth + matrix.width) - 2
}

const initialState = {
    size: getSize()
}

const slice = createSlice({
    initialState:initialState,
    name: 'sizeState',
    reducers: {
        setSize:(state) => {
            state.size = getSize();
        }
    }
})

export const sizeAction = slice.actions;
export const sizeReducer = slice.reducer;