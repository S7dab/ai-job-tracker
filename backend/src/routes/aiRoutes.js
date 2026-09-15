import express from "express";
import {analyzeJob} from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js"



const router = express.Router();

router.post("/analyze-job",authMiddleware,analyzeJob);


export default router;