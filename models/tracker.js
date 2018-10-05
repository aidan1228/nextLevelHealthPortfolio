const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tracker = new Schema({
  date: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  sugar: { type: Number, required: true },
  sodium: { type: Number, required: true }
  
});

const Tracker = mongoose.model("Tracker", tracker);

module.exports = Tracker;
