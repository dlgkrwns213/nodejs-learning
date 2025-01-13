import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get login page
// Get /
const getLogin = (req, res) => {
  res.render("home");
}

// Login user
// POST /
const loginUser = asyncHandler( async(req, res) => {
  const {username, password} = req.body;

  if (username === "admin" && password == "1234") {
    res.send("Login success");
  } else {
    res.send("Login Failed");
  }
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