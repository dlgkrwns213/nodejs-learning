import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecret = process.env.jwt_Secret;

// Get login page
// Get /
const getLogin = (req, res) => {
  res.render("home");
}

// Login user
// POST /
const loginUser = asyncHandler( async(req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ message: "일치하는 사용자가 없습니다." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "올바르지 않은 비밀번호 입니다." });
  }

  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, {httpOnly: true});
  res.redirect("/contacts");
});

// Register page
// GET /register
const getRegister = (req, res) => {
  res.render("register");
}

// Register user
// POST /register
const registerUser = asyncHandler( async( req, res) => {
  const { username, password1, password2 } = req.body;
  if (password1 == password2) {
    // success
    const hashedPassword = await bcrypt.hash(password1, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.json({ message: "Register successful", user });
  } else {
    // fail
    res.send("Register Failed");
  }
})

export {
  getLogin,
  loginUser,
  getRegister,
  registerUser,
};