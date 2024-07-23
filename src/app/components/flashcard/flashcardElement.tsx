"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import store from "@/app/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
} from "@mui/joy";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { fetchCards } from "../../requests/flashcard";
import CreateFlashCard from "./createFlashCard";
import DisplayFlashCard from "./displayFlashCard";
import EditFlashCard from "./editFlashCard";
import {
  fetchFlashcardsFailure,
  fetchFlashcardsSuccess,
  flashcardDisplayTypes,
  setCurrentCard,
  setCurrentDisplay,
} from "./flashcardSlice";

export default function FlashcardElement() {
  const dispatch = useAppDispatch();
  const currentDisplay = useAppSelector((state) => state.currentDisplay);
  const currentCard = useAppSelector((state) => state.currentFlashcard);

  useEffect(() => {
    fetch(fetchCards)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchFlashcardsSuccess(data));
        !currentCard && dispatch(setCurrentCard(data[0]));
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchFlashcardsFailure("Error fetching flashcards!"));
      });
  }, []);

  return (
    <Provider store={store}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          width: "100vh",
        }}
      >
        {currentDisplay === flashcardDisplayTypes.flashcard ? (
          <DisplayFlashCard />
        ) : currentDisplay === flashcardDisplayTypes.addCard ? (
          <CreateFlashCard />
        ) : (
          <EditFlashCard />
        )}

        <Card
          className="border rounded"
          sx={{
            width: "80%",
            maxWidth: "80%",
            boxShadow: "lg",
            height: "10%",
          }}
        >
          <CardCover
            sx={{
              // height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardActions>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    setCurrentDisplay(flashcardDisplayTypes.addCard)
                  }
                >
                  Add Card
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    setCurrentDisplay(flashcardDisplayTypes.editCard)
                  }
                >
                  Edit Card
                </Button>
              </CardActions>
            </CardContent>
          </CardCover>
        </Card>
      </Box>
    </Provider>
  );
}
