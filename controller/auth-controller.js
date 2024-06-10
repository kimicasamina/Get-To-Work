import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);

export const verifyGoogle = async (req, res) => {
  let user;
  console.log("google auth route");
  const { credentials } = req.body;
  console.log("token:", credentials);
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentials.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
        Accept: "application/json",
      },
    }
  );

  console.log(data);

  // Check if the user exists in your database
  user = await userModel.findOne({ email: data.email });
  if (!user) {
    // Create a user if they do not exist
    user = await userModel.create({
      email: data.email,
      username: data.name,
    });
  }

  // create token
  const token = jwt.sign(
    { user: { id: user._id, username: user.username } },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    expiresIn: "5m",
  });
  const newUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  res.status(201).json(newUser);
};
