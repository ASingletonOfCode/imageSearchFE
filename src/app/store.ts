import { configureStore } from '@reduxjs/toolkit';
import flashcardReducer from './components/flashcard/flashcardSlice';

const store = configureStore({
    reducer: flashcardReducer,
    });


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;