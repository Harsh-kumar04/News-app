import express from "express";
import { tokenverify } from "../../../../middleware/middleware.js";
import { addComment } from "../controllers/commentconteollers.js";

const router = express.Router();

router.post("/comment", tokenverify, addComment);

export default router;
