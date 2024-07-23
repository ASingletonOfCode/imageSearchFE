export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export const fetchCards = new Request("http://localhost:8000/cards/", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa("david:password")}`,
  },
});

export const removeCard = (id: number) => {
  fetch(`http://localhost:8000/cards/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("david:password")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error);
};

export const createCard = (question: string, answer: string) => {
  fetch("http://localhost:8000/cards/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("david:password")}`,
    },
    body: JSON.stringify({ question: question, answer: answer }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};
