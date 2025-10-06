const mongoose = require("mongoose");
const dotenv = required("dotenv");
dotenv.config();
const password = process.argv[2];
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

