const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (process.argv.length < 5) {
  console.log(" node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  important: Boolean,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const entry=new Phonebook
// phonebook.save().then((result) => {
//   console.log("Contact saved!");
//   mongoose.connection.close();
// });

Phonebook.find({}).then((result) => {
  result.forEach((contact) => {
    console.log(contact);
  });
  mongoose.connection.close();
});
