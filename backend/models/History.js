const mongoose = require("mongoose");
const historySchema = new mongoose.Schema({
  task_id: { type: String },
});

const History = mongoose.model("history", historySchema);
