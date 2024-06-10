import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  deadline: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "time",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

var populateObj = (obj) => {
  function iterate(obj) {
    obj.forEach((item) => {
      if (obj.tasks && obj.tasks.length > 0) {
        obj.tasks.populate("tasks");
      }
      if (obj.subtask && obj.subtask.tasks.length > 0) {
        obj.subtask.populate("subtask");
      }
      Object.keys(item).forEach((key) => {
        if (typeof item[key] === "object" && item[key] !== null) {
          iterate(item[key]);
        }
      });
    });
  }
};

var autoPopulateChildren = function (next) {
  this.populate("tasks");

  next();
};

projectSchema.pre("find", autoPopulateChildren);
projectSchema.pre("findOne", autoPopulateChildren);
projectSchema.pre("findById", autoPopulateChildren);

const projectModel = mongoose.model("project", projectSchema);
export default projectModel;
