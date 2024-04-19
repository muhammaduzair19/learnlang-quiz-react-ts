import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState: StateType = {
    loading: false,
    words: [],
    result: []
}







const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        getWordRequest: (state) => {
            state.loading = true
        },
        getWordSucces: (state, action: PayloadAction<WordType[]>) => {
            state.loading = false;
            state.words = action.payload

        },
        getWordFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        saveResult: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.result = action.payload;

        },
        clearState: (state) => {

            state.loading = false;
            state.words = [];
            state.result = [];
            state.error = undefined
        }
    }
})

export const { getWordRequest,getWordSucces,getWordFail,saveResult,clearState} = rootSlice.actions
export default rootSlice.reducer