const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;
const url = process.env.MONGODB_URI;

// Define schema and model at the top level
const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

// Define routes at the top level
app.get("/", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.error("Error fetching persons:", error);
      response.status(500).send("An error occurred while fetching data.");
    });
});

// Connect to the database and then start the server
console.log("Connecting to MongoDB...");
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at ${baseURL}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
