import express from "express";
import { addCity, getCities } from "../controllers/controller.js";
const router = express.Router();

router.post("/getcities", getCities);
router.post("/addCity", addCity);

export default router;
