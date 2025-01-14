import express from "express";
import Post from "../models/Post.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(['/', "/home"], asyncHandler( async (req, res) => {
  const locals = {
    title: "Home"
  };
  const data = await Post.find();
  res.render("index", {locals: locals, data, layout: "layouts/main"});
}));

router.get("/about", (req, res) => {
  const locals = {
    title: "About"
  }
  res.render("about", {locals, layout: "layouts/main"});
})

// 게시물 상세보기
// GET /post/:id

router.get("/post/:id", asyncHandler( async (req, res) => {
  const data = await Post.findOne({ _id: req.params.id });
  res.render("post", {data, layout: "layouts/main"});
}))

export default router;

// mongoDB에 넣어줄 임시 값 (1회만 실행)
// Post.insertMany([
//   {
//     title: "제목1",
//     body: "Success doesn’t happen overnight; take consistent small steps."
//   },
//   {
//     title: "제목2",
//     body: "Dream big, start small, and work relentlessly every day."
//   },
//   {
//     title: "제목3",
//     body: "Positivity and effort can turn challenges into opportunities."
//   },
//   {
//     title: "제목4",
//     body: "Your potential is endless—believe, act, and achieve greatness."
//   },
//   {
//     title: "제목5",
//     body: "The best time to start is now; take that first step forward."
//   },
// ]);