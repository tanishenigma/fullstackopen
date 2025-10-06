const mongoose = require("mongoose");
const dotenv = require("dotenv");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("Connecting to MongoDB...");
mongoose
	.connect(url)
	.then(() => {
		console.log("Connected to MongoDB Sucessfully!");

		const personSchema = new mongoose.Schema({
			name: String,
			phone: String,
			important: Boolean,
		});
		personSchema.set("toJSON", {
			transform: (document, returnedObject) => {
				returnedObject.id = returnedObject._id.toString();
				delete returnedObject._id;
				delete returnedObject.__v;
			},
		});
		const Person = mongoose.model("Person", personSchema);
		