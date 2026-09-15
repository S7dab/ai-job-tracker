import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import dotenv from "dotenv";
import helmet from "helmet";
import dns from "dns";

dotenv.config();

// setting dns
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin:["https://ai-job-tracker-shadab.netlify.app","http://localhost:5173/"],
  }),
);
app.use(helmet());


app.get("/",(req,res)=>{
    res.status(200).json({message:"Server is Running"})
});
app.use("/api/jobs", jobRoutes);

app.use("/api/auth", authRoutes);

// ai api
app.use("/api/ai", aiRoutes);
// ai cv analyze
app.use("/api/cv", cvRoutes);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
