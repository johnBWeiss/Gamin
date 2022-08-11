import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const initialState = {
    error: false,
    errorMessage: '',
    homeGamesArray: []
};

export const getAllGames = createAsyncThunk('gameSlice/getAllGames',

    async ([getAllGamesOptions, { indexStart }], thunkAPI) => {
        try {

            let response = await axios(getAllGamesOptions)
            response = response?.data.slice(indexStart, indexStart + 8) ?? []
            console.log(response);
            return (response)
        } catch (error) {

        }
    })


export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,

    reducers: {

        validationError: (state, action) => {
            state.error = action.payload.error;
            action.payload.errorMessage &&
                (state.errorMessage = action.payload.errorMessage);
            action.payload.errorType && (state.error = action.payload.errorType);
            state.active = action.payload.active;
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGames.pending, (state, action) => { })
            .addCase(getAllGames.fulfilled, (state, { payload }) => {
                state.homeGamesArray = payload ? payload : []
            })

    },
});

export const {

    validationError,

} = gameSlice.actions;

export default gameSlice.reducer;
