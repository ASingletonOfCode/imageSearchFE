import { Button, Card, CardActions, CardContent, CardCover } from "@mui/joy";

export default function EditFlashCard() {
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
          <h1>Edit Flashcard</h1>
          <CardActions>
            <Button>Submit</Button>
          </CardActions>
        </CardContent>
      </CardCover>
    </Card>
  );
}
