const express = require("express");
const app = express();
app.use(express.json());

const date = new Date();
let persons = [
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
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.get("/", (_, res) => {
  res.send(persons);
});

app.get("/info", (_, res) => {
  res.send(
    `<h3>Phonebook has info for ${persons.length} people</h3><h3>${date}</h3>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, phone, important } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "The name or number is missing" });
  }

  const exists = persons.some((p) => p.name === name);
  if (exists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name,
    phone,
    important: important || false,
  };

  persons = persons.concat(person);
  res.status(201).json(person);
});

const unknownEndPoint=(req,res)=>{
	res.status(404).send({error:'unknown endpoint'})
}
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
