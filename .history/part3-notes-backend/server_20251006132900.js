const mongoose = require("mongoose");
const dotenv = required("dotenv");
dotenv.config();
const password = process.argv[2];
const url = MONGODB_URI;
