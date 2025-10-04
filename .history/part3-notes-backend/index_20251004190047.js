const express = require("express");
const app = express();

const notes = [
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

app.delete("/api/notes/:id",(req,res)=>{
	
})

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
