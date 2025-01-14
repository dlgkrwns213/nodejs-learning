import express from "express";
import {getLogin, loginUser, 
  getRegister, registerUser} from "../controllers/loginController.js";

const router = express.Router();

router.route("/")
  .get(getLogin)
  .post(loginUser);

router.route("/register")
  .get(getRegister)
  .post(registerUser);

export default router;