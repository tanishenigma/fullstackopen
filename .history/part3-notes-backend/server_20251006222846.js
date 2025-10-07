const dotenv = require("dotenv");
const express = require("express");
const Phonebook = require("./models/person");

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.static("dist"));

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
  Phonebook.findById(req.params.id).then(contact=>{
    if(contact=>{
      res.json(contact);
    })
  })
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
app.delete("/api/persons/:id", (req, res) => {});
app.put("/api/persons/:id", (req, res) => {});
app.post("/api/persons", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running at ${baseURL}`);
});
