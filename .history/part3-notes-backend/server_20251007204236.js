const dotenv = require("dotenv");
const express = require("express");
const Phonebook = require("./models/person");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("dist"));
console.log;
const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;
const date = new Date();

app.get("/api/persons", async (req, res) => {
  Phonebook.find({})
    .then((contact) => {
      res.json(contact);
    })
    .catch((e) => {
      res.status(404).json({ e: "Failed to fetch" });
    });
});

app.get("/api/persons/:id", (req, res) => {
  Phonebook.findById(req.params.id)
    .then((contact) => {
      if (contact) res.json(contact);
      else res.status(404).json({ error: "Contact not found" });
    })
    .catch((error) => {
      res.status(400).json({ error: "Invalid ID format" });
    });
});

app.get("/info", async (_, res) => {
  Person.find({})
    .then(() =>
      res.send(
        `<h3>Phonebook has info for ${persons.length} people</h3><h3>${date}</h3>`
      )
    )
    .catch(() => {
      res.status(500).send("An error occurred while fetching data.");
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Phonebook.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(() =>
      res.status(400).json({ error: "Invalid ID or deletion failed" })
    );
});

app.put("/api/persons/:id", (req, res) => {
  const { name, phone, important } = req.body;

  Phonebook.findByIdAndUpdate(
    req.params.id,
    { name, phone, important },
    { new: true, runValidators: true }
  )
    .then((updated) => res.json(updated))
    .catch(() => res.status(400).json({ error: "Update failed" }));
});

app.post("/api/persons", (req, res) => {
  const { name, phone } = req.body;
  const entry = new Phonebook({
    name,
    phone,
    important: false,
  });

  entry
    .save()
    .then((savedEntry) => {
      res.status(201).json(savedEntry);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if(error.name=="CastError"){
    return res.status(400).json({error:"malfromatted id"})
  }
};

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at ${baseURL}`);
});
