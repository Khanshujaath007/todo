const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoutes");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/", protectedRoute);
// create connection with mongoDb

mongoose.connect("mongodb://0.0.0.0:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// create a user schema
// const Schema = mongoose.Schema;
// const taskSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     priority: { type: Number, required: true },
//     deadline: { type: Date, requiref: true },
//     category: { type: String },
//   },
//   { timestamps: true }
// );

// const historySchema = new Schema({
//   task_id: { type: String },
// });

// const Task = mongoose.model("task", taskSchema);
// const Product = mongoose.model('Product', productSchema);
// const History = mongoose.model("history", historySchema);


// app.get("/tasks", (req, res) => {
//   Task.find()
//     .then((item) => {
//       console.log(item);
//       res
//         .status(200)
//         .json({ message: "Item fetched successfully", data: item });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// app.get("/task/:id", (req, res) => {
//   const { id } = req.params;
//   User.find({ _id: id })
//     .then((item) => {
//       console.log(item);
//       res
//         .status(200)
//         .json({ message: "Item fetched successfully", data: item });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// app.post("/task", (req, res) => {
//   const newtask = new Task(req.body);
//   newtask
//     .save()
//     .then((item) => {
//       console.log(item);
//       res.status(201).json({ message: "Item added successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// update new user
// app.put("/task/:id", (req, res) => {
//   const { id } = req.params;
//   Task.findByIdAndUpdate(id, req.body, { new: true })
//     .then((item) => {
//       console.log(item);
//       res
//         .status(200)
//         .json({ message: "Item updated Successfully", data: item });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// delete a user
// app.delete("/task/:id", (req, res) => {
//   const { id } = req.params;
//   //add task id to history before deleteing
//   Task.findByIdAndDelete(id)
//     .then((item) => {
//       console.log(item);
//       res
//         .status(200)
//         .json({ message: "Item deleted Successfully", data: item });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// app.post("/history/:id", (req, res) => {
//   const { id } = req.params;
//   const historyPayload = new History({ task_id: id });
//   historyPayload.save().then((item) => {
//     console.log(item);
//     res.status(200).json({ message: "Item added to history successfully" });
//   });
// });
