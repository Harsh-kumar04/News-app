import express from "express";
import { tokenverify } from "../../../../middleware/middleware.js";
import { myNewsList } from "../controller/controller.js";

const router = express.Router();

router.get("/my-news", tokenverify, myNewsList);
export default router;
