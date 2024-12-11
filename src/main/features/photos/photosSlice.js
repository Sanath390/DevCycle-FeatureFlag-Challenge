import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    photos: []
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        addPhotos: (state, action) => {
            const newPhotos = action.payload.map(photoUrl => ({
                id: Date.now().toString() + Math.random().toString(36).slice(2, 9),
                url: photoUrl,
                date: new Date().toLocaleDateString()
            }));
            state.photos.push(...newPhotos);
        },
        removePhoto: (state, action) => {
            state.photos = state.photos.filter(photo => photo.id !== action.payload);
        },
        clearPhotos: (state) => {
            state.photos = [];
        }
    }
});

export const { addPhotos, removePhoto, clearPhotos } = photosSlice.actions;
export const selectPhotos = (state) => state.photos.photos;
export default photosSlice.reducer;
