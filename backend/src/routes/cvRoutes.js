import express from "express";
import { analyzeCV } from "../controllers/cvController.js";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

const upload = multer({dest:"uploads/"});

router.post("/analyze",authMiddleware,upload.single("cv"),analyzeCV);



export default router;