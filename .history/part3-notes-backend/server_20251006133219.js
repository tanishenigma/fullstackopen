const mongoose = require("mongoose");
const dotenv = required("dotenv");
dotenv.config();
const password = process.argv[2];
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: string,
  phone: string,
  important: important || false,
});

const Person = mongoose.model("Person", personSchema);

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
