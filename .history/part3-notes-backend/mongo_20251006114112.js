const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  important: Boolean,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const phonebook1 = new Phonebook({
  name: "Tanish",
  phone: "24234233423",
  important: false,
});
const phonebook2 = new Phonebook({
  name: "Smarth",
  phone: "24234233423",
  important: true,
});
phonebook1.save().then((result) => {
  console.log("Contact 1 saved!");
  mongoose.connection.close();
});

Phonebook.find({ important: true }).then((result) => {
  result.forEach((contact) => {
    console.log(contact);
  });
  mongoose.connection.close();
});
