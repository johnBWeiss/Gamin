import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const initialState = {
    error: false,
    errorMessage: '',
    pending: false,
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
            return ({ data: shortenedResponse, dataLength: responseLength })
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

        changeOptions: (state, action) => {
            state.gameOptions = action.payload
            let dynamicTitle = 'All Games'
            if (action.payload.params?.category) {
                action.payload.params?.category === 'martial-arts' ?
                    dynamicTitle = 'Fighting Games' : dynamicTitle = action.payload.params.category + ' Games'
            }
            state.homeGamesArrayTitle =
                dynamicTitle
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
            })

    },
});

export const {

    validationError,
    changeOptions

} = gameSlice.actions;

export default gameSlice.reducer;
