const express = require("express");
const app = express();
const port = randomizePortListening(4000, 3000);

app.get("/ping", (req, res) => {
  res.json({ answer: "pong !" });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Server listening at port: ", port);
});

function randomizePortListening(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
