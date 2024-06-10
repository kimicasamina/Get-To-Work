import express from "express";
import mongoose from "mongoose";
import projectModel from "../models/project-model.js";
import taskModel from "../models/task-model.js";
import userModel from "../models/user-model.js";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.find({});
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
  }
};

export const getProjectById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const project = await projectModel.findById(id);
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
};

export const getProjectsByUserId = async (req, res, next) => {
  const id = req.params.id;
  console.log("id:", id);
  try {
    const user = await userModel.findById(id);
    const projects = await projectModel.find({}, { where: { user: user._id } });
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
  }
};

export const getProjectTasks = async (req, res, next) => {
  const id = req.params.id;

  try {
    const tasks = await projectModel.findById({ _id: id }).select("tasks");

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
};

export const createProject = async (req, res, next) => {
  const { name, status, createdAt, deadline, user } = req.body;

  try {
    const project = await projectModel.create({
      name,
      status,
      createdAt,
      deadline,
      user,
    });
    const existingUser = await userModel.findById(project.user);
    existingUser.project.push(project._id);
    await existingUser.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = async (req, res, next) => {
  const { name, status, createdAt, deadline } = req.body;
  const id = req.params.id;
  try {
    const project = await projectModel.findByIdAndUpdate(
      { _id: id },
      {
        name,
        status,
        createdAt,
        deadline,
      },
      { new: true }
    );
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const project = await projectModel.findOneAndDelete({ _id: id });
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (req, res, next) => {
  const data = req.body;
  let id = req.params.id;

  try {
    const existingProject = await projectModel.findById(id);
    const task = await taskModel.create({
      ...data,
      project: existingProject._id,
    });

    existingProject.tasks.push(task._id);
    await existingProject.save();
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
};

export const getSummary = async (req, res, next) => {
  const id = req.params.id;

  try {
    const total = await projectModel.find({ user: id }).countDocuments();
    const inProgress = await projectModel
      .find({
        user: id,
        status: "in progress",
      })
      .countDocuments();
    const finished = await projectModel
      .find({ user: id, status: "finished" })
      .countDocuments();
    const notStarted = await projectModel
      .find({
        user: id,
        status: "not started",
      })
      .countDocuments();
    const overdue = await projectModel
      .find({
        deadline: {
          // $gte: new Date(2012, 7, 14),
          $lt: new Date(),
        },
      })
      .countDocuments();

    const projectSummary = {
      total,
      inProgress,
      finished,
      notStarted,
      overdue,
    };

    return res.status(200).json(projectSummary);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User not found", success: false });
  }
};
