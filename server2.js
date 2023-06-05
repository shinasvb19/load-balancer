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
app.get("/:identity/:command", (req, res) => {
  const { identity, command } = req.params;
  socket.emit("send-request", identity, command);
  const resultHandler = (status) => {
    console.log(status);
    res.status(200).send(status);
    socket.off("result", resultHandler); // Remove the event listener
  };

  socket.on("result", resultHandler);
});

app.listen(3030);
