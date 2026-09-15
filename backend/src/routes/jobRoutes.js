import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createJob, deleteJob, getAllJobs, getOneJobById, updateJob } from "../controllers/jobController.js";


const router = express.Router();

router.post("/",authMiddleware,createJob);

router.get("/",authMiddleware,getAllJobs);

router.get("/:id",authMiddleware,getOneJobById);

router.put("/:id",authMiddleware,updateJob);

router.delete("/:id",authMiddleware,deleteJob);


export default router;