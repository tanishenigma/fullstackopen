const express = require("express");
const app = express();

const notes = [
  {
    id: "7c38",
    name: "Michael",
    phone: "9876543210",
    important: true,
  },
  {
    id: "d5a1",
    name: "Sophia",
    phone: "8765432109",
    important: false,
  },
  {
    id: "e913",
    name: "Arjun",
    phone: "7654321098",
    important: false,
  },
  {
    id: "4b22",
    name: "Liam",
    phone: "6543210987",
    important: true,
  },
  {
    id: "f8c7",
    name: "Olivia",
    phone: "5432109876",
    important: false,
  },
];

const PORT = 3001;
app.get("/", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.param.id;
  const note = notes.find((note) => note.id === id);
  res.send(note);
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
