const axios = require("axios");
const express = require("express");
const router = express.Router();

require("../db/conn");
const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const todo = new Todo({ task, startTime, status });
    const saveTodo = await todo.save();
    res.json(saveTodo);
  } catch (error) {
    res.status(501).json({ error: "Cannot Post Data" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const completionTime = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Id Not Found" });
    }
    todo.completionTime = completionTime;
    await todo.save();
    return res.status(200).json({ message: "Object Updated Successfully" });
  } catch (error) {
    res.status(501).json({ error: "Cannot Update" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ error: "Not Found" });
    }
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(501).json({ error: "Cannot Delete" });
  }
});

router.get("/user", (req, res) => {
  res.send("User Page");
});

router.post("/user", async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      profilePic,
    });
    const userAdded = await user.save();
    if (!userAdded) {
      return res.json({ message: "User Not Created" });
    } else {
      return res.status(201).json({ message: "User Saved Successfully" });
    }
  } catch (error) {
    res.status(501).json({ message: "User Not Created" });
  }
});

module.exports = router;
