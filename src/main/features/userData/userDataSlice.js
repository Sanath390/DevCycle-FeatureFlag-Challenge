import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coverPhoto: '',
    textInput: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eaque. Quod, quibusdam?',
    theme: '',
    userName: '',
    isPremium: false,
    photos: [],
    articlesData: [],
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState:{
        ...initialState
    },
    reducers: {
        setCoverPhoto: (state, action) => {
            state.coverPhoto = action.payload;
        },
        setTextInput: (state, action) => {
            state.textInput = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        togglePremium: (state) => {
            state.isPremium = !state.isPremium;
        },
        setPhotos: (state, action) => {
            state.photos = action.payload;
        },
        setArticlesData: (state, action) => {
            const index = state.articlesData.findIndex(article => article.id === action.payload.id);
            if (index === -1) {
                state.articlesData.push(action.payload);
            } else {
                state.articlesData[index] = {
                    ...state.articlesData[index],
                    ...action.payload
                };
            }
        },
        removeArticle: (state, action) => {
            state.articlesData = state.articlesData.filter(
                article => article.id !== action.payload
            );
        },
        resetUserData: (state) => {
            return initialState;
        }
    }
});

export const {
    setCoverPhoto,
    setTextInput,
    setTheme,
    setUserName,
    togglePremium,
    setPhotos,
    setArticlesData,
    removeArticle,
    resetUserData
} = userDataSlice.actions;

// Safer selectors with fallbacks
export const selectCoverPhoto = (state) => state.userData.coverPhoto ;
export const selectTextInput = (state) => state.userData.textInput ;
export const selectTheme = (state) => state.userData.theme;
export const selectUserName = (state) => state.userData.userName;
export const selectIsPremium = (state) => state.userData.isPremium ;
export const selectPhotos = (state) => state.userData.photos;
export const selectArticlesData = (state) => state.userData.articlesData;

export default userDataSlice.reducer;
