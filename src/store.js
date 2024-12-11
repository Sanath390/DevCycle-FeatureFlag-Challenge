import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './main/features/userData/userDataSlice'
import articlesReducer from './main/features/articles/articlesSlice'
import photosReducer  from './main/features/photos/photosSlice'
import premiumReducer from './main/features/premium/premiumSlice'

export default configureStore({
  reducer: {
    userData: userDataReducer,
    articles: articlesReducer,
    photos: photosReducer,
    premium: premiumReducer
  },
})