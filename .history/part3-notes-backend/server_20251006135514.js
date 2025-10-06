const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;

if (process.argv.length < 5) {
  console.log("Usage: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

app.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.listen(PORT, () => {
  console.log(`The server is running at the port ${PORT} `);
  console.log(`Click Here 👉️ ${baseURL}`);
});
