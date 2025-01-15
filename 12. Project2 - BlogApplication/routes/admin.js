import dotenv from "dotenv";
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// Check Login
const checkLogin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/admin");
  } else {
    try {
      const decode = jwt.verify(token, jwtSecret);
      req.userId = decode.userId;
      next();
    } catch (error) {
      res.redirect("/admin");
    }
  }
}

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

// Get all Posts
// GET /allPosts
router.get("/allPosts", checkLogin, asyncHandler( async (req, res) => {
  const locals = {
    title: "Posts",
  }
  const data = await Post.find();

  res.render("admin/allPosts", {locals, data, layout: "../views/layouts/admin.ejs"});
}));

// Admin logout
// Get /logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
})

// Admin - Add Post
// GET /add
router.get("/add", checkLogin, asyncHandler( async (req, res) => {
  const locals = {
    title: "게시물 작성",
  }
  res.render("admin/add", {locals, layout: "../views/layouts/admin.ejs"});
}))

// Admin - Add Post
// POST /add
router.post("/add", checkLogin, asyncHandler( async (req, res) => {
  const {title, body} = req.body;
  const newPost = new Post({
    title: title,
    body: body,
  });

  await Post.create(newPost);
  res.redirect("/allPosts");
}))

// Admin - Edit post
// GET /edit/:id
router.get("/edit/:id", checkLogin, asyncHandler( async (req, res) => {
  const locals = {
    title: "게시물 편집",
  }
  const data = await Post.findOne({ _id: req.params.id });
  res.render("admin/edit", {locals, data, layout: "../views/layouts/admin.ejs"});
}));

// Admin - Edit post
// PUT /edit/:id
router.put("/edit/:id", checkLogin, asyncHandler( async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    createAt: Date.now(),
  });
  res.redirect("/allPosts");
}));

export default router;