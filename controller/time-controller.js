import mongoose from "mongoose";
import timeModel from "../models/time-model.js";
import projectModel from "../models/project-model.js";
import userModel from "../models/user-model.js";

export const createTime = async (req, res, next) => {
  const { duration, project, user } = req.body;
  console.log("req body", duration, project, user);

  try {
    const existingProject = await projectModel.findById(project);
    const existingUser = await userModel.findById(user);

    const newTime = await timeModel.create({
      project: project,
      duration,
      user: user,
    });

    const doc = await timeModel
      .findById(newTime._id)
      .populate("project", { name: 1, tasks: 0 });
    // .populate("user", { password: 0 });

    existingProject.time.push(newTime._id);
    await existingProject.save();
    existingUser.time.push(newTime._id);
    await existingUser.save();
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
  }
};

export const getTime = async (req, res, next) => {
  try {
    const time = await timeModel.find({});
    res.status(200).json(time);
  } catch (err) {
    console.log(err);
  }
};

export const getToday = async (req, res, next) => {
  const userId = req.params.id;
  const startDate = new Date();
  const endDate = new Date();

  try {
    const time = await timeModel
      .find({})
      .where({
        $and: [
          {
            user: userId,
          },
          {
            createdAt: {
              $gte: new Date(new Date(startDate).setHours(0o0, 0o0, 0o0)),
              $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
            },
          },
        ],
      })
      .populate("project", {
        tasks: 0,
        time: 0,
        user: 0,
        _id: 0,
        createdAt: 0,
        deadline: 0,
        status: 0,
      });

    console.log("time:", time);
    res.status(200).json(time);
  } catch (err) {
    console.log(err);
  }
};

export const getTimeById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const time = await timeModel.findOne(id);
    res.status(200).json(time);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTime = async (req, res, next) => {
  const id = req.params.id;
  try {
    const time = await timeModel.findByIdAndDelete(id, { new: true });
    res.status(201).json(time);
    console.log(id, time);
  } catch (err) {
    console.log(err);
  }
};

export const updateTimeById = async (req, res, next) => {
  const id = req.params.id;
  const { duration } = req.body;
  try {
    const time = await timeModel.findByIdAndUpdate({ _id: id, duration });
    res.status(201).json(time);
  } catch (err) {
    console.log(err);
  }
};
