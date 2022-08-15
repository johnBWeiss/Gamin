import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const initialState = {
    pending: false,
    showPopUp: false,
    popUpData: {},
    homeGamesArray: [],
    homeGamesArrayTotalLength: 0,
    homeGamesArrayTitle: 'All Games',
    gameOptions: {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: { platform: 'all', 'sort-by': 'release-date' },
        headers: {
            'X-RapidAPI-Key': '09fd63799amsh2a9669f12442c07p113242jsn8e195afa1988',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
};


export const getAllGames = createAsyncThunk('gameSlice/getAllGames',

    async ([options, { indexStart }], thunkAPI) => {
        try {
            let response = await axios(options)
            let shortenedResponse = response?.data?.slice(indexStart, indexStart + 8) ?? []
            let responseLength = response?.data?.length
            return ({ data: shortenedResponse, dataLength: responseLength, options })
        } catch (error) {
            /*
             I use both the try catch method and the builder rejected method to catch errors,
             because the rejected method does not cover all instances of errors. 
            */
            thunkAPI.dispatch(errorHandler())
        }
    })


export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {

        errorHandler: (state) => {
            state.homeGamesArray = []
            state.homeGamesArrayTitle = 'error'
            state.pending = true
        },
        changePopUpStatus: (state, { payload }) => {
            state.showPopUp = !state.showPopUp
            state.popUpData = { ...payload }
        },
        changeOptions: (state, { payload }) => {
            state.gameOptions = payload
            let dynamicTitle = 'All Games'
            if (payload?.params?.category) {
                payload?.params?.category === 'martial-arts' ?
                    dynamicTitle = 'Fighting' : dynamicTitle = payload.params.category
            }
            state.homeGamesArrayTitle = dynamicTitle
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGames.pending, (state) => {
                state.pending = true
            })
            .addCase(getAllGames.fulfilled, (state, { payload }) => {
                state.pending = false
                state.homeGamesArray = payload.data
                state.homeGamesArrayTotalLength = payload.dataLength
                state.gameOptions = payload.options
            })
            .addCase(getAllGames.rejected, (state) => {
                state.homeGamesArray = []
                state.homeGamesArrayTitle = 'error'
                state.pending = true


            })

    },
});

export const {

    changeOptions,
    changePopUpStatus,
    errorHandler

} = gameSlice.actions;

export const gameSelector = (state) => { return state.gameSlice };


export default gameSlice.reducer;
