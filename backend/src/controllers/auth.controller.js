import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import Post from "../models/Post.model.js";

import { registerService, loginService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get single post by id

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      _id: id,
      isDeleted: false,
    }).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
