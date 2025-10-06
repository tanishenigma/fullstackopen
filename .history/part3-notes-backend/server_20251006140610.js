const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); // load env vars first

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
console.log("Connecting to MongoDB");
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");

    const personSchema = new mongoose.Schema({
      name: String,
      phone: String,
      important: Boolean,
    });

    const Person = mongoose.model("Person", personSchema);

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

    app.listen(PORT, () => {
      console.log(`Server running at ${baseURL}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
