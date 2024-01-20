const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    // user_id: { type: String, required: true },
    name: { type: String, required: true },
    priority: { type: Number, required: true },
    deadline: { type: Date, requiref: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
