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


        },
        changePopUpStatus: (state, action) => {
            state.showPopUp = !state.showPopUp
            state.popUpData = { ...action.payload }
        },

        changeOptions: (state, action) => {
            state.gameOptions = action.payload
            let dynamicTitle = 'All Games'
            if (action.payload?.params?.category) {
                action.payload?.params?.category === 'martial-arts' ?
                    dynamicTitle = 'Fighting' : dynamicTitle = action.payload.params.category
            }
            state.homeGamesArrayTitle = dynamicTitle
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGames.pending, (state, action) => {
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

            })

    },
});

export const {

    validationError,
    changeOptions,
    changePopUpStatus, errorHandler

} = gameSlice.actions;

export const gameSelector = (state) => { return state.gameSlice };


export default gameSlice.reducer;
