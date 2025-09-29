import express from "express";
import {
  addNews,
  getNewsList,
  getNewsDetails,
} from "../controller/newscontroller.js"; // ✅ sahi path + case
import { tokenverify } from "../../../../middleware/middleware.js";

const router = express.Router();

router.post("/add",tokenverify, addNews);
router.get("/list", getNewsList);
router.get("/:id", getNewsDetails);

export default router;
