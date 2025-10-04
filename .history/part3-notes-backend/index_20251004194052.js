const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    name: "Michael",
    phone: "9876543210",
    important: true,
  },
  {
    id: "2",
    name: "Sophia",
    phone: "8765432109",
    important: false,
  },
  {
    id: "3",
    name: "Arjun",
    phone: "7654321098",
    important: false,
  },
  {
    id: "4",
    name: "Liam",
    phone: "6543210987",
    important: true,
  },
  {
    id: "5",
    name: "Olivia",
    phone: "5432109876",
    important: false,
  },
];

const PORT = 3001;

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.get("/", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.send(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  const note = req.body;
  note.id = String(maxId + 1);
  notes = notes.concat(note);

  res.json(note);
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
