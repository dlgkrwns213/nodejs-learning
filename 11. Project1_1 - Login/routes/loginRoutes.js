import express from "express";
import {getLogin, loginUser} from "../controllers/loginController.js";

const router = express.Router();

router.route("/")
  .get(getLogin)
  .post(loginUser);

export default router;