// articlesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: []
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle: (state) => {
            state.articles.push({
                id: Date.now().toString(),
                title: `Article ${state.articles.length + 1}`,
                content: 'Start writing your content...',
                date: new Date().toLocaleDateString(),
                image: '',
            });
        },
        removeLastArticle: (state) => {
            state.articles.pop();
        },
        updateArticle: (state, action) => {
            const { id, ...updates } = action.payload;
            const articleIndex = state.articles.findIndex(article => article.id === id);
            if (articleIndex !== -1) {
                state.articles[articleIndex] = {
                    ...state.articles[articleIndex],
                    ...updates
                };
            }
        },
        clearArticles: (state) => {
            state.articles = [];
        }
    }
});

export const { addArticle, removeLastArticle, updateArticle, clearArticles } = articlesSlice.actions;
export const selectArticles = (state) => state.articles.articles;
export default articlesSlice.reducer;
