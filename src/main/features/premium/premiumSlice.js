import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themes:0,
    articles:0,
    photos:0,
    music:false
};

const premiumSlice = createSlice({
    name: "premium",
    initialState,
    reducers:{
        themesCount:(state)=>{
            state.themes+=1;
        },
        articlesAdd:(state)=>{
            state.articles+=1;
        },
        articlesRemove:(state)=>{
            state.articles-=1;
        },
        photosAdd:(state)=>{
            state.photos+=1;
        },
        photosRemove:(state)=>{
            state.photos-=1;
        },
        musicAllow:(state)=>{
            state.music = !state.music;
        }
    }
})

export const {themesCount,articlesAdd,articlesRemove,photosAdd,photosRemove,musicAllow} = premiumSlice.actions;
export default premiumSlice.reducer;