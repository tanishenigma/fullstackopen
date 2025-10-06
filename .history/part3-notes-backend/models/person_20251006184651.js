const mongoose = require("mongoose");
const dotenv = require("dotenv");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
