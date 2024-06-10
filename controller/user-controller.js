import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";
import projectModel from "../models/project-model.js";
import timeModel from "../models/time-model.js";
// import { createError } from "../utils/createError.js";

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  let existingUser;

  // check if user already exists
  try {
    existingUser = await userModel.findOne({ email });
  } catch (error) {
    // return next(createError(500, "Registration failed"));
    return res
      .status(401)
      .json({ message: "Registration failed", created: false });
  }

  if (existingUser) {
    return res
      .status(401)
      .json({ message: "User already exist! Login Instead", created: false });
  }

  // create new user
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  const doc = { username: username, email: email };
  return res
    .status(201)
    .json({ message: "User registered successfully", doc, created: true });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    // check if user exist
    if (!user) {
      return res
        .status(401)
        .json({ message: "User already exist! Login Instead" });
    }

    // check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // create token
    const token = jwt.sign(
      { user: { id: user._id, username: user.username } },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const newUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "5m",
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Login Failed." });
  }
};

export const logout = async (req, res, next) => {
  let token = req.cookies.access_token;
  console.log("DELETE TOKEN", token);
  try {
    res.clearCookie("access_token");
    res.json({ success: true, message: "You are logged out." });
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async (req, res, next) => {
  let user = req.user;
  console.log("REQ USER_ID", user);

  try {
    const profile = await userModel.findById(user.id).select("-password");
    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User not found", success: false });
  }
};

export const getProjects = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const projects = await userModel
      .findById(userId, { time: -1 })
      .select("project")
      .populate("project");
    console.log("HELLOOO");
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User not found", success: false });
  }
};

export const getProjectsSummary = async (req, res, next) => {
  let user = req.user;
  console.log("REQ USER_ID", user);

  try {
    const totalNumOfProjects = await projectModel.findById(userId).count();
    const inProgress = await projectModel
      .findById(userId, { status: "in progress" })
      .count();
    const finished = await projectModel
      .findById(userId, { status: "finished" })
      .count();
    const notStarted = await projectModel
      .findById(userId, { status: "not started" })
      .count();

    const projectsSummary = {
      totalNumOfProjects,
      inProgress,
      finished,
      notStarted,
    };

    return res.status(200).json(projectsSummary);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User not found", success: false });
  }
};

export const getTime = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const time = await timeModel
      .find({})
      .where({ user: userId })
      .populate("project", { tasks: 0, time: 0 });
    console.log(time);
    return res.status(200).json(time);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "User not found", success: false });
  }
};
