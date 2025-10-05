const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
let persons = require("./data.js");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;

const date = new Date();
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

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

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }

  const updatedPerson = { ...person, ...body };
  persons = persons.map((p) => (p.id === id ? updatedPerson : p));

  res.json(updatedPerson);
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

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndPoint);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
  console.log(`Click Here 👉️ ${baseURL}`);
});
