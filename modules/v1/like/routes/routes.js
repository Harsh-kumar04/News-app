import express from "express";
import { toggleLike } from "../controllers/likecontroller.js";
import { tokenverify } from "../../../../middleware/middleware.js";

const router = express.Router();

// Toggle like/dislike
router.post("/like", tokenverify, toggleLike);

export default router;
