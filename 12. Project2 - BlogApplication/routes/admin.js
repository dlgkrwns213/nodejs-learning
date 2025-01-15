import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;
console.log("JWT Secret:", jwtSecret);  // 비어있지 않은 값이 출력될 것입니다.

// Admin Page
// Get /admin

router.get("/admin", (req, res) => {
  const locals = {
    title: "관리자 페이지",
  };
  res.render("admin/index", {locals, layout: "../views/layouts/admin-nologout.ejs"});
});

// Check Login
// POST /admin

router.post("/admin", asyncHandler( async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({ username });
  if(!user)
    return res.status(401).json({ Message: "일치하는 사용자가 없습니다" });
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).json({ Message: "비밀번호가 일치하지 않습니다" });

  console.log(jwtSecret);
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, {httpOnly: true});
  res.redirect("/allPosts");

}))

// View Register Form
// GET /register
router.get("/register", asyncHandler( async (req, res) => {
  res.render("admin/index", {layout: "../views/layouts/admin-nologout.ejs"});
}));

// View Register Form
// POST /register
router.post("/register", asyncHandler( async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword
  });

}));

export default router;