import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();


const ai = new OpenAI({
    baseURL:"https://openrouter.ai/api/v1",
    apiKey:process.env.OPENROUTER_API_KEY
});


export default ai;