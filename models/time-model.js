import mongoose from "mongoose";

const timeSchema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  duration: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const timeModel = mongoose.model("time", timeSchema);
export default timeModel;
