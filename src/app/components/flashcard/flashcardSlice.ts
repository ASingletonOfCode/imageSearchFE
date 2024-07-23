import { Flashcard } from "@/app/requests/flashcard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const flashcardDisplayTypes = {
    flashcard: "flashcard",
    addCard: "addCard",
    editCard: "editCard",
  };

interface FlashcardState {
    flashcards: Flashcard[];
    loading: boolean;
    error: string | null;
    currentDisplay: string;
    currentFlashcard: Flashcard | null;
}

export const initialState: FlashcardState = {
    flashcards: [],
    loading: false,
    error: null,
    currentDisplay: flashcardDisplayTypes.flashcard,
    currentFlashcard: null,
};

// Define flashcard state modifier functions
export const flashcardSlice = createSlice({
    name: "flashcard",
    initialState,
    reducers: {
        fetchFlashcards: (state) => {
            state.loading = true;
            
        },
        fetchFlashcardsSuccess: (state, action: PayloadAction<Flashcard[]>) => {
            console.dir(action)
            state.loading = false;
            state.flashcards = action.payload;
        },
        fetchFlashcardsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentDisplay: (state, action: PayloadAction<string>) => {
            state.currentDisplay = action.payload;
        },
        setCurrentCard: (state, action: PayloadAction<Flashcard>) => {
            state.currentFlashcard = action.payload;
        },
    },
});

// Export flashcard state modifier functions
export const { fetchFlashcards, fetchFlashcardsFailure, fetchFlashcardsSuccess, setCurrentCard, setCurrentDisplay } = flashcardSlice.actions;

// Export flashcard state accessors
export const selectCurrentCard = (state: { flashcard: FlashcardState }) => state.flashcard.currentFlashcard;
export const selectCurrentDisplay = (state: { flashcard: FlashcardState }) => state.flashcard.currentDisplay;
export const selectFlashcards = (state: { flashcard: FlashcardState }) => state.flashcard.flashcards;

// Export flashcard state reducer
export default flashcardSlice.reducer;