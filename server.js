const express = require("express");
const projectRouter = require("./projectRouter.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

server.use("/api/projects", projectRouter);

module.exports = server;
