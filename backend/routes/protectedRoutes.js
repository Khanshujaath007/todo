const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Task = require("../models/Task");
const History = require("../models/History");

const verifyToken = require("../middleware/authMiddleware");
// Protected route
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

router.get("/tasks", verifyToken, (req, res) => {
  Task.find()
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// fetch a task by id
router.get("/task/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item fetched successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// create a task
router.post("/task", verifyToken, (req, res) => {
  const newtask = new Task(req.body);
  newtask
    .save()
    .then((item) => {
      console.log(item);
      res.status(201).json({ message: "Item added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// update a task
router.put("/task/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  Task.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item updated Successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// delete a task
router.delete("/task/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  //add task id to history before deleteing
  Task.findByIdAndDelete(id)
    .then((item) => {
      console.log(item);
      res
        .status(200)
        .json({ message: "Item deleted Successfully", data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    });
});

// add to history if a task is completed successfully
router.post("/history/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const historyPayload = new History({ task_id: id });
  historyPayload.save().then((item) => {
    console.log(item);
    res.status(200).json({ message: "Item added to history successfully" });
  });
});

// fetch by category
router.get("/task/category/:type", verifyToken, (req, res) => {
    const { type } = req.params;
    Task.find({ category: type })
      .then((item) => {
        console.log(item);
        res
          .status(200)
          .json({ message: "Item fetched successfully", data: item });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      });
  });

module.exports = router;
