import express from "express";
import taskModel from "../models/task-model.js";
import projectModel from "../models/project-model.js";
import mongoose from "mongoose";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.find({}).populate("subtask");
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
};

export const getTasksById = async (req, res, next) => {
  const id = req.params.id;
  console.log("ID", id);
  try {
    // const tasks = await taskModel.findById({ _id: id }).populate({
    //   path: "subtask",
    //   populate: {
    //     path: "subtask",
    //     // model: 'Component'
    //     populate: {
    //       path: "subtask",
    //       populate: {
    //         path: "subtask",
    //         populate: {
    //           path: "subtask",
    //           populate: {
    //             path: "subtask",
    //             populate: { path: "subtask", populate: { path: "subtask" } },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    const tasks = await taskModel.findById({ _id: id });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (req, res, next) => {
  const { name, project } = req.body;

  try {
    const existingProject = await projectModel.findById(project);
    if (!existingProject) {
      res.status(500).json("could not find project");
    }
    const task = new taskModel({
      name,
      index: existingProject.tasks.length,
      project: existingProject._id,
    });
    await task.project.push(existingProject._id);
    await task.save();

    existingProject.tasks.unshift(task._id);
    await existingProject.save();

    // // update task count
    // const numOfTask = await taskModel.countDocuments({
    //   parent: existingProject._id,
    // });
    // const completedTaskNum = await taskModel.countDocuments({
    //   parent: existingProject._id,
    //   isCheck: true,
    // });
    // await existingProject({
    //   taskCount: {
    //     numOfTask,
    //     completedTaskNum,
    //   },
    // });
    // await existingProject.save();
    console.log("PROJECT", existingProject);
    console.log("TASK:", task);
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (req, res, next) => {
  const { name, isCheck } = req.body;
  const id = req.params.id;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { name, isCheck },
      { new: true }
    );
    // .populate({
    //   path: "subtask",
    //   populate: {
    //     path: "subtask",
    //     // model: 'Component'
    //     populate: {
    //       path: "subtask",
    //       populate: {
    //         path: "subtask",
    //         populate: {
    //           path: "subtask",
    //           populate: {
    //             path: "subtask",
    //             populate: { path: "subtask", populate: { path: "subtask" } },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    res.status(201).json(updatedTask);
  } catch (err) {
    console.log(err);
  }
};

export const addSubtask = async (req, res, next) => {
  const { name } = req.body;
  const id = req.params.id;

  try {
    const parentTask = await taskModel.findById(id);
    const newTask = new taskModel({
      name,
      parent: parentTask._id,
      project: parentTask.project,
    });

    // newTask.parent.push(existingTask._id);
    await newTask.save();

    parentTask.subtask.unshift(newTask._id);
    // parentTask.subtask.map((task, index) => {
    //   return { ...task, index: index };
    // });

    await parentTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
  }
};

export const insertSubtask = async (req, res, next) => {
  const { name } = req.body;
  const prevSiblingId = req.params.id;
  console.log(prevSiblingId);
  try {
    console.log("INSERT SUBTASK");
    const prevSibling = await taskModel.findById(prevSiblingId);
    const parentTask = await taskModel.findById(prevSibling.parent);
    console.log("PREV TASK NAME:", prevSibling.name);
    console.log("PARENT TASK NAME:", parentTask.name);
    const newSubtask = await taskModel.create({
      name: name,
      parent: parentTask._id,
    });

    const prevSiblingIndex = parentTask.subtask.findIndex(
      (task) => task._id.toString() === prevSibling._id.toString()
    );
    console.log("INDEX:", prevSiblingIndex);

    // console.log("PREV SIBLING INDEX", prevSiblingIndex);
    // parentTask.subtask.push([
    //   $each: {newSubtask._id},
    //   $position: prevSiblingIndex + 1
    // ]);

    // parentTask.subtask.push({
    //   $each: [newSubtask._id],
    //   $position: prevSiblingIndex + 1,
    // });
    parentTask.subtask.splice(prevSiblingIndex + 1, 0, newSubtask._id);
    parentTask.save();
    console.log(parentTask.subtask);
    res.status(201).json(newSubtask);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await taskModel.findByIdAndDelete(id);
    res.status(201).json({ message: "successfully deleted..", task });
  } catch (err) {
    console.log(err);
  }
};
