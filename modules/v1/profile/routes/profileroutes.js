import express from "express";
import { tokenverify } from "../../../../middleware/middleware.js";
import { getProfile, updateProfile } from "../controller/profilecontroller.js";
const router = express.Router();

router.get("/profile/:userId", getProfile);
router.post("/updateProfile/:userId", updateProfile);

export default router;
