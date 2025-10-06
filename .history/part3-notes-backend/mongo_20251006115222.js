const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Check arguments
if (process.argv.length < 5) {
  console.log("Usage: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

// Replace with your MongoDB URI from .env
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");

    const phonebookSchema = new mongoose.Schema({
      name: String,
      phone: String,
      important: Boolean,
    });

    const Phonebook = mongoose.model("Phonebook", phonebookSchema);

    const entry = new Phonebook({
      name,
      phone,
      important: false,
    });

    return entry.save();
  })
  .then(() => {
    console.log(`added ${name} number ${phone} to phonebook`);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
