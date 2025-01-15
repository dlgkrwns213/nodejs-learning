import express from "express";

const router = express.Router();

// Admin Page
// Get /admin

router.get("/admin", (req, res) => {
  const locals = {
    title: "관리자 페이지",
  };
  res.render("admin/index", {locals, layout: "../views/layouts/admin-nologout.ejs"});
});

export default router;