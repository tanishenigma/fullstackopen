const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
