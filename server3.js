const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(cors());
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("you are connected with " + socket.id);
});
socket.on("test", (msg) => {
  console.log(msg);
  socket.emit("response", "this is result");
});

app.listen(3040);
