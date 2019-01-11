const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tracker = new Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  mealTitle: { type: String, required: false },
  foodItem: { type: String, required: false },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  sugar: { type: Number, required: true },
  sodium: { type: Number, required: true },
  mealTotal: { type: Object, required: true }
});

const Tracker = mongoose.model("Tracker", tracker);

module.exports = Tracker;
