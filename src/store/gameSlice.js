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

// export const userAuth = createAsyncThunk(
//     'loginBoxSlice/userAuth',

//     async (_, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const loginState = state.loginBoxSlice;
//             if (loginState.status === 'verifyingUser') return;
//             thunkAPI.dispatch(updateStatusToVerifying());
//             const response = await axios.post(`${authPath}/login`, {
//                 email: loginState.emailAddress,
//             });
//             return { ...(response?.data ?? {}), xcid: response?.headers['x-cid'] };
//         } catch (error) {
//             thunkAPI.dispatch(updateStatusToNotVerifying());

//             if (error.response.status !== 500) {
//                 thunkAPI.dispatch(
//                     validationError({ error: true, errorMessage: 'אירעה שגיאה במערכת' }),
//                 );
//             }
//             if (error.response.status === 500) {
//                 thunkAPI.dispatch(
//                     validationError({
//                         error: true,
//                         errorMessage: ' WXG-שם משתמש לא קיים, יש לפנות ל ',
//                     }),
//                 );
//             }

//             setTimeout(() => {
//                 thunkAPI.dispatch(
//                     validationError({
//                         error: false,
//                     }),
//                 );
//             }, 2000);
//         }
//     },
// );

// export const authOTP = createAsyncThunk('user/authOTP', async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const stateOTP = state.loginBoxSlice;

//     try {
//         if (stateOTP.userOTP.completed) {
//             const response = await axios.post(
//                 `/otp`,
//                 {
//                     otp: stateOTP.OTPCode_Server,
//                     email: stateOTP.emailAddress,
//                 },
//                 {
//                     headers: {
//                         'x-cid': stateOTP.xcid,
//                     },
//                 },
//             );

//             return response;
//         }
//     } catch (error) {
//         if (error.response.status !== 500)
//             thunkAPI.dispatch(
//                 validationError({ error: true, errorMessage: 'אירעה שגיאה במערכת' }),
//             );
//         if (error.response.status === 500)
//             thunkAPI.dispatch(
//                 validationError({
//                     error: true,
//                     errorMessage: 'הקוד שהוקש שגוי, יש לנסות שוב',
//                 }),
//             );
//     }
// });

export const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,

    reducers: {
        sendAgainOTP: (state) => {
            state.otpDigit1 = false;
            state.otpDigit2 = false;
            state.otpDigit3 = false;
            state.otpDigit4 = false;
            state.userOTP.completed = false;
        },
        refreshOTP: (state) => {
            state.OTPVerified = false;
            state.otpDigit1 = false;
            state.otpDigit2 = false;
            state.otpDigit3 = false;
            state.otpDigit4 = false;
            state.userOTP.completed = false;
        },
        resetLoginState: (state) => {
            Object.assign(state, initialState);
        },
        logOut: (state) => { },
        otpVerified: (state, { payload }) => {
            state.status = 'loggedIn';
            //TODO:put in function
            // const decode = jwt_decode(payload.token);
            // const name = decode?.unique_name;
            // state.userName = name;
        },
        emailLink: (state, { payload }) => {
            state.redirectHandler = payload.redirectHandler;
            state.emailAddress = payload.email;
            state.loginHandler = payload.loginHandler;
        },
        userDetailsSetter: (state, { payload }) => {
            state.emailAddress = payload;
        },
        setInputDigit: (state, { payload }) => {
            state.userOTP.completed = false;
            switch (payload.index) {
                case 1:
                    state.otpDigit1 = payload.value;
                    break;
                case 2:
                    state.otpDigit2 = payload.value;
                    break;
                case 3:
                    state.otpDigit3 = payload.value;
                    break;
                case 4:
                    state.otpDigit4 = payload.value;
                    break;

                default:
                    state.userOTP = { completed: false };
            }
            if (
                state.otpDigit1 &&
                state.otpDigit2 &&
                state.otpDigit3 &&
                state.otpDigit4
            ) {
                const OTP =
                    state.otpDigit1 + state.otpDigit2 + state.otpDigit3 + state.otpDigit4;

                state.userOTP = { completed: true, value: OTP };
            } else {
                state.userOTP = { completed: false };
            }
        },
        validationError: (state, action) => {
            state.error = action.payload.error;
            action.payload.errorMessage &&
                (state.errorMessage = action.payload.errorMessage);
            action.payload.errorType && (state.error = action.payload.errorType);
            state.active = action.payload.active;
        },
        setFooterFixed: (state, { payload }) => {
            state.footerFixed = payload;
        },
        updateStatusToVerifying: (state) => {
            state.status = 'verifyingUser';
        },
        updateStatusToNotVerifying: (state) => {
            state.status = '';
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllGames.pending, (state, action) => { })
            .addCase(getAllGames.fulfilled, (state, { payload }) => {
                state.homeGamesArray = payload ? payload : []
            })
        //this is related app status not user status affect error list
        // .addCase(userAuth.rejected, (state, action) => {
        //     state.error = true;
        //     state.errorMessage = 'שם המשתמש אינו קיים במערכת';
        // })
        // .addCase(
        //     authOTP.fulfilled,
        //     (
        //         state,
        //         {
        //             payload: {
        //                 data: { token },
        //             },
        //         },
        //     ) => {
        //         state.status = 'loggedIn';
        //         localStorage.setItem('token', token);
        //         const navigate = useNavigate();
        //         navigate('/home', { replace: true });
        //     },
        // )
        // .addCase(authOTP.rejected, (state, action) => {
        //     state.error = true;
        //     state.errorMessage = 'הקוד שהוקש שגוי, יש לנסות שוב';
        // });
    },
});

export const {
    otpVerified,
    OTPInputSetter,
    OTPInputDelete,
    userDetailsSetter,
    setInputDigit,
    resetOTP,
    logOut,
    validationError,
    setFooterFixed,
    refreshOTP,
    emailLink,
    updateStatusToVerifying,
    updateStatusToNotVerifying,
    resetLoginState,
    sendAgainOTP,
} = gameSlice.actions;

// export const gameSliceSelector = (state) => state.gameSlice;
// console.log(gameSliceSelector);

// export const verifyUser =
//     ({ xcid, userOTP, homeNavigationHandler }) =>
//         async (dispatch, getState) => {
//             const loginState = getState()?.loginBoxSlice;
// const projectState = getState()?.projectSlice;
//TODO encapsulate to functions by decision the steps are getToken,saveToken,getProjects,navigate
// const response = await axios.post(
//     `${authPath}/otp`,
//     {
//         otp: userOTP,
//         email: loginState.emailAddress,
//     },
//     {
//         headers: {
//             'x-cid': xcid,
//         },
//     },
// );
// if (response?.data) {
//     localStorage.setItem('token', response?.data?.token);
// }

// dispatch(otpVerified({ token: response?.data?.token }));
//TODO may need to determine if isMobile, if is, set index end here at 2 instead of 8
//     if (loginState.redirectHandler) {
//         // const projectId = projectState.currentProjectId;
//         dispatch(
//             // chooseSingleProject({ id: projectId }, loginState.redirectHandler),
//         );
//     } else {
//         // dispatch(getMyProjects());
//         homeNavigationHandler();
//     }
// };
// export const loginByLink =
//     ({ email, redirectHandler, loginHandler }) =>
//         async (dispatch) => {
//             dispatch(emailLink({ loginHandler, redirectHandler, email }));
//             // dispatch(userAuth(email));
//         };

export default gameSlice.reducer;
