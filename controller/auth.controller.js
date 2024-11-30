import UserModel from "../models/user.model.js";
import { generateTokens } from "../utils/token.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password, cPassword, userName } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists Please Login" });
    }
    if (password !== cPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    // creating userId
    const lastCustomer = await UserModel.findOne().sort({ userId: -1 });
    const lastNumber = lastCustomer
      ? parseInt(lastCustomer.userId.substring(2), 10)
      : 0;
    const newUserId = `CU${(lastNumber + 1).toString().padStart(4, "0")}`;
    const user = await UserModel.create({
      userId: newUserId,
      name: name,
      email: email,
      password: hasPassword,
      userName: userName,
      role: "user",
    });
    res.status(200).json({
      message: "user Sign up successfully pls login now ",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
// customer Login
export const userSignIn = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const user = await UserModel.findOne({
      $or: [{ email }, { userName }],
    }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email is not register please signup" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateTokens(user);
    res.status(200).json({
      message: "Login successfully ",
      data: {
        Id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login user" });
  }
};

// adminSignup
export const adminSignup = async (req, res) => {
  try {
    const { name, email, password, cPassword } = req.body;
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists Please Login" });
    }
    if (password !== cPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    // creating serviceProvider adminId
    const newAdmin = await UserModel.create({
      name: name,
      email: email,
      password: hasPassword,
      role: "admin",
    });
    res.status(200).json({
      message: "admin Sign up successfully pls login now ",
      data: newAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
// admin Login
export const adminSigIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await UserModel.findOne({
      email,
      role: "admin",
    });
    if (!admin) {
      return res
        .status(400)
        .json({ message: "email is not register as Admin" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateTokens(admin);
    res.status(200).json({
      message: "Login successfully",
      data: {
        adminId: admin._id,
        email: admin.email,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login user" });
  }
};
