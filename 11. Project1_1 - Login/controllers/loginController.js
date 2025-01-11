import asyncHandler from "express-async-handler";

// Get login page
// Get /
const getLogin = (req, res) => {
  res.render("home");
}

// Login user
// POST /
const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body;

  if (username === "admin" && password == "1234") {
    res.send("Login success");
  } else {
    res.send("Login Failed");
  }
});

export {
  getLogin,
  loginUser,
};