import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    default: null,
  },
  subtask: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
});

var autoPopulateChildren = function (next) {
  this.populate("subtask");

  next();
};

taskSchema.pre("find", autoPopulateChildren);
taskSchema.pre("findOne", autoPopulateChildren);
taskSchema.pre("findById", autoPopulateChildren);

const taskModel = mongoose.model("task", taskSchema);
export default taskModel;
