const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

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

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});


app.listen(())
