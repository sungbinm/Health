const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  username: { type: String, required: true },
  day: { type: String, required: true },
  exercise: { type: String, required: true },
  count: { type: Number, required: true },
  setCount: { type: Number, required: true },
  weight: { type: Number, required: true },
  time: { type: Number, required: true },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
