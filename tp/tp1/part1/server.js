const express = require("express");
const app = express();
const port = 3000;

app.get("/ping", (req, res) => {
  res.json({ answer: "pong !" });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Server listening at port: ", port);
});
