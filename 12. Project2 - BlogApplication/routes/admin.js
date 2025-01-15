import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Admin Page
// Get /admin

router.get("/admin", (req, res) => {
  const locals = {
    title: "관리자 페이지",
  };
  res.render("admin/index", {locals, layout: "../views/layouts/admin-nologout.ejs"});
});

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

  res.json(`user created: ${user}`);
}));

export default router;