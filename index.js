const express = require("express");
const port = 1234;
const app = express();

app.get("/", (req, res) => {
  res.send("Chào mừng đến với ứng dụng Node.js!");
});

require("dotenv").config();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
