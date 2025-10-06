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
console.log("Connecting to MongoDB...");
mongoose
  .connect(url, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB Sucessfully!");

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

    app.get("/api/persons", (request, response) => {
      Person.find({})
        .then((persons) => {
          response.json(persons);
        })
        .catch((error) => {
          console.error("Error fetching persons:", error);
          response.status(500).send("An error occurred while fetching data.");
        });
    });

    app.get("/api/persons/:id", (request, response) => {
      Person.findById(request.params.id)
        .then((person) => {
          if (person) {
            response.json(person);
          } else {
            response.status(404).end();
          }
        })
        .catch((error) => {
          console.error("Error fetching person:", error);
          response.status(400).send({ error: "malformatted id" });
        });
    });

    app.post("/api/persons", (request, response) => {
      const { name, phone, important } = request.body;

      if (!name || !phone) {
        return response.status(400).json({ error: "The name or number is missing" });
      }

      const person = new Person({
        name,
        phone,
        important: important || false,
      });

      person
        .save()
        .then((savedPerson) => {
          response.status(201).json(savedPerson);
        })
        .catch((error) => {
          console.error("Error saving person:", error);
          response.status(500).json({ error: "Error saving person" });
        });
    });

    app.put("/api/persons/:id", (request, response) => {
      const { name, phone, important } = request.body;

      Person.findByIdAndUpdate(
        request.params.id,
        { name, phone, important },
        { new: true, runValidators: true, context: "query" }
      )
        .then((updatedPerson) => {
          if (updatedPerson) {
            response.json(updatedPerson);
          } else {
            response.status(404).end();
          }
        })
        .catch((error) => {
          console.error("Error updating person:", error);
          response.status(400).send({ error: "malformatted id" });
        });
    });

    app.delete("/api/persons/:id", (request, response) => {
      Person.findByIdAndDelete(request.params.id)
        .then((deletedPerson) => {
          if (deletedPerson) {
            response.status(204).end();
          } else {
            response.status(404).end();
          }
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          response.status(400).send({ error: "malformatted id" });
        });
    });

    const unknownEndPoint = (req, res) => {
      res.status(404).send({ error: "unknown endpoint" });
    };
    app.use(unknownEndPoint);

    app.listen(PORT, () => {
      console.log(`Server running at ${baseURL}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
