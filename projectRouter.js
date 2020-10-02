const { json } = require("express");
const express = require("express");
const router = express.Router();
const project = require("./data/helpers/projectModel.js");

router.get("/", (req, res) => {
  project
    .get()
    .then((success) => {
      res.status(200).json({ success });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ message: "Unable to retrieve at this time" });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(500).json({ message: "Please supply name and description" });
  } else {
    project
      .insert(req.body)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not add at this time" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id || !changes) {
    res.status(500).json({ message: "Please supply ID and changes" });
  } else {
    project
      .update(id, changes)
      .then((success) => {
        res.status(201).json({ success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not find user" });
      });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ message: "Must give id" });
  } else {
    project
      .remove(id)
      .then((success) => {
        res.status(200).json({ message: "User deleted", success });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json({ message: "Could not delete at this time" });
      });
  }
});

// test

module.exports = router;
