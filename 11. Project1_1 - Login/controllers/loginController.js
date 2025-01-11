import asyncHandler from "express-async-handler";

// Get login page
// Get /
const getLogin = (req, res) => {
  res.render("home");
}

export default getLogin;