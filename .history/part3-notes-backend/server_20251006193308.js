const dotenv = require("dotenv");
const express = require("express");
const Person = require("./models/person");
dotenv.config();
app.use(express.static("dist"));
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;
const date = new Date();
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

const persons = Person.find({});
app.get("/", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((person) => {
    res.json(person);
  });
});

app.get("/info", async (_, res) => {
  try {
    const persons = await Person.find({});
    res.send(
      `<h3>Phonebook has info for ${persons.length} people</h3><h3>${date}</h3>`
    );
  } catch (e) {
    console.error("Error fetching persons:", e);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.post("/api/persons", (req, res) => {
  const { name, phone, important } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "The name or number is missing" });
  }

  const person = new Person({
    name,
    phone,
    important: important || false,
  });

  person.save().then((savedContact) => {
    res.json(savedContact);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id,
    persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at ${baseURL}`);
});
