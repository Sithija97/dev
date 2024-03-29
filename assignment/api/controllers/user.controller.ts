import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.util.js";
import { CustomRequest } from "../interfaces/index.js";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error(`Please fill in all required fields`);
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error(`Password must be upto 6 characters`);
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const { _id, username, email, photo } = user;
    generateToken(res, _id);
    res.status(201).json({ _id, username, email, photo });
  } else {
    res.status(400);
    throw new Error(`Invalid user data`);
  }
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please add username and password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (passwordIsCorrect) {
    generateToken(res, user._id);
  }
  if (user && passwordIsCorrect) {
    const { _id, username, email, photo } = user;
    res.json({
      _id,
      username,
      email,
      photo,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { _id, username, email, photo } = req.user;
  const user = { _id, username, email, photo };
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: CustomRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { username, email, photo } = user;
    user.email = email;
    user.username = req.body.username || username;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photo: updatedUser.photo,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getLoggedInStatus = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  }

  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getLoggedInStatus,
};
