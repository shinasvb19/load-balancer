const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(cors());
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");
socket.on("connect", () => {
  console.log("you are connected with " + socket.id);
});
app.post("/:identity/:command", (req, res) => {
  const { identity, command } = req.params;
  socket.emit("send-request", identity, command, req.body);
  const resultHandler = (response) => {
    console.log(response);
    res.status(200).send(response);
    socket.off("response", resultHandler); // Remove the event listener
  };
  socket.on("response", resultHandler);
});

app.listen(3030);
