const dotenv = require("dotenv");
const express = require("express");
const Person = require("./models/person");
dotenv.config();

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

app.get("/", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/info", (_, res) => {
  try {
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server running at ${baseURL}`);
});
