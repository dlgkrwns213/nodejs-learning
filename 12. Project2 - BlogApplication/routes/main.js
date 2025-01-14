import express from "express";

const router = express.Router();

router.get(['/', "/home"], (req, res) => {
  const locals = {
    title: "Home"
  }
  res.render("index", {locals: locals, layout: "layouts/main"});
})

router.get("/about", (req, res) => {
  const locals = {
    title: "About"
  }
  res.render("about", {locals, layout: "layouts/main"});
})

export default router;