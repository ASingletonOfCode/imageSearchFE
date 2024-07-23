import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/joy";
import { useState } from "react";

import { createCard } from "../../requests/flashcard";
import { flashcardDisplayTypes } from "./flashcardSlice";

export default function CreateFlashCard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = () => {
    try {
      createCard(question, answer);
      // updateDisplayState(flashcardDisplayTypes.flashcard);
      setHasError(false);
    } catch (error) {
      console.error("Error creating card!");
      setHasError(true);
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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Create Flashcard</h1>
          <FormControl error={hasError}>
            <FormLabel>Question:</FormLabel>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
            />
          </FormControl>
          <FormControl error={hasError}>
            <FormLabel>Answer:</FormLabel>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer here..."
            />
            <FormHelperText>
              {hasError ? "Error creating card!" : ""}
            </FormHelperText>
          </FormControl>
          <CardActions>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setCurrentDisplay(flashcardDisplayTypes.flashcard)}
            >
              Cancel
            </Button>
          </CardActions>
        </CardContent>
      </CardCover>
    </Card>
  );
}
function setCurrentDisplay(flashcard: any) {
  throw new Error("Function not implemented.");
}
