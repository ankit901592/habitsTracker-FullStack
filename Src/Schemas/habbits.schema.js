import mongoose from "mongoose";

const DayStatusSchema = mongoose.Schema({
  date: { type: Date, required: true }, // Date for each day
  status: { type: Boolean, default: null }, // Initially null, then true or false
});

const HabitsSchema = mongoose.Schema({
  Title: { type: String, required: true },
  descprition: { type: String, required: true },
  createdOn: { type: Date, default: Date.now() },
  weekStatus: {
    type: [DayStatusSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 7'], // Maximum 7 days status
  }
});
function arrayLimit(val) {
  return val.length <= 7;
}

export const habbitmodel = mongoose.model("Habits", HabitsSchema);
