const dotenv = require("dotenv");
const express = require("express");
const Person = require("./models/person");
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

    app.get("/", async (req, res) => {
      try {
        const persons = await Person.find({});
        res.json(persons);
      } catch (error) {
        console.error("Error fetching persons:", error);
        res.status(500).send("An error occurred while fetching data.");
      }
    });

    const unknownEndPoint = (_, res) => {
      res.status(404).send({ error: "unknown endpoint" });
    };
    app.use(unknownEndPoint);

    app.listen(PORT, () => {
      console.log(`Server running at ${baseURL}`);
    });

  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
