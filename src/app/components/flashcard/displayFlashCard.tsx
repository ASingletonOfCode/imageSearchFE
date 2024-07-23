import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  CircularProgress,
} from "@mui/joy";
import { fetchCards, Flashcard, removeCard } from "../../requests/flashcard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchFlashcardsFailure,
  fetchFlashcardsSuccess,
  setCurrentCard,
} from "./flashcardSlice";

export default function DisplayFlashCard() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.flashcards);
  const card = useAppSelector((state) => state.currentFlashcard);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getNextCard = () => {
    if (cards && card) {
      const index = cards.findIndex((c) => c === card);
      index == cards.length - 1
        ? dispatch(setCurrentCard(cards[0]))
        : dispatch(setCurrentCard(cards[index + 1]));
    }
  };

  return (
    <Card
      sx={{
        width: "80%",
        maxWidth: "80%",
        boxShadow: "lg",
        height: "60%",
      }}
    >
      <CardCover
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {card ? (
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="w-1000 text-4xl font-bold">
              {showAnswer ? card?.answer : card?.question}
            </div>
            <CardActions>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {!showAnswer ? "Show Answer" : "Show Question"}
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowAnswer(false);
                  getNextCard();
                }}
              >
                Next
              </Button>
              {!showConfirmation ? (
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowConfirmation(true)}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    // setCards(cards.filter((c) => c.question !== card.question));
                    setShowConfirmation(false);
                    // dispatch(removeCard(card.id);
                  }}
                >
                  Are you sure?
                </Button>
              )}
            </CardActions>
          </CardContent>
        ) : (
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress className="self-center" />
          </CardContent>
        )}
      </CardCover>
    </Card>
  );
}
