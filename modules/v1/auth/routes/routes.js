import express from "express";
import {
  enc,
  forgotpassword,
  login,
  logout,
  resetpassword,
  signup,
} from "../controller/controller.js";
import { decryptBody, tokenverify } from "../../../../middleware/middleware.js";

const router = express.Router();
router.post("/encry", enc);
router.post("/signup", decryptBody, signup);
router.post("/login", decryptBody, login);
router.get("/logout", tokenverify, logout);
router.post("/forgotpassward", forgotpassword);
router.post("/resetpassword", resetpassword);

export default router;
