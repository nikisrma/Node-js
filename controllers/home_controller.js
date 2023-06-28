const todoSchema = require("../models/todo.model");

/** Render home page */
module.exports.home = async function (req, res) {
  let tasks = await todoSchema.find();
  return res.render("home", {
    title: "TODO App",
    tasks: tasks,
  });
};

/** Add Task */
module.exports.addTask = async function (req, res) {
  let task = await todoSchema.create({ ...req.body });
  if (!task) {
    console.log("Error in creating a task!");
    return;
  }
  console.log("Task created.. ");
  return res.redirect("/");
};

/** Delete Tasks */
module.exports.deleteTask = async function (req, res) {
  const result = await todoSchema.deleteMany(req.body);
  if (result) {
    console.log("Task Deleted successfully");
  } else {
    console.log("Something went wrong!");
  }
  return res.redirect("/");
};
