const express = require("express");
const app = express();

const notes = [
  {
    id: "6142",
    name: "4234",
    phone: "2423423",
    important: false,
  },
  {
    id: "5b95",
    name: "asfasf",
    phone: "324234",
    important: false,
  },
];
const PORT = 3001;
app.get("/", (req, res) => {
  res.send(notes);
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
