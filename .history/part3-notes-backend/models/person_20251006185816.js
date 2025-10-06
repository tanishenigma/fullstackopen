const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("Connecting to MongoDB...");
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB Sucessfully!");
});

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
  important: Boolean,
});
module.exports = mongoose.model("Person", personSchema);
