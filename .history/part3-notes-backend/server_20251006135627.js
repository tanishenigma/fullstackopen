const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}/`;

// The MONGODB_URI should be read from your .env file.
const url = process.env.MONGODB_URI;

if (!url) {
  console.log("Error: MONGODB_URI not found in .env file.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

// Connect to MongoDB with proper error handling.
console.log("Connecting to MongoDB...");
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  important: Boolean,
});

const Person = mongoose.model("Person", personSchema);

// This route now includes error handling.
app.get("/", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Send a server error status code back to the client.
      response
        .status(500)
        .json({ error: "Failed to fetch data from database" });
    });
});

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
  console.log(`Open in browser 👉️ ${baseURL}`);
});
