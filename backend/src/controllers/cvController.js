import { PDFParse } from "pdf-parse";
import ai from "../config/ai.js";

const analyzeCV = async (req, res) => {
  try {
    // handling if user upload file or not
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "CV file is required",
      });
    }
    // converting cv pdf into Text
    const parse = new PDFParse({ url: req.file.path });

    const cvData = await parse.getText();

    const cvText = cvData.text;
    // setting prompt
    const prompt = `
Analyze the following CV and provide a professional assessment.

CV:
${cvText}

Provide the result in valid JSON only.

Use exactly this structure:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "summary": ""
}

Rules:
- score must be a number from 0 to 100.
- strengths must be an array of strings.
- weaknesses must be an array of strings.
- missingSkills must be an array of strings.
- suggestions must be an array of strings.
- summary must be a short string.
- Return JSON only.
- Do not include markdown.
- Do not include \`\`\`json.
- Detect the main language of the CV.
- If the CV is written in Arabic, write strengths, weaknesses, suggestions, and summary in Arabic.
- If the CV is written in English, write strengths, weaknesses, suggestions, and summary in English.
- If the CV contains both Arabic and English, use the language that is dominant in the CV.
- Keep technical skill names in their original form, such as React.js, Node.js, Express.js, MongoDB, JavaScript, JWT, REST APIs.
`;

    // ai cv analyzer calling
    const completion = await ai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: "You are an expert CV analysis assistant",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = JSON.parse(completion.choices[0].message.content);

    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
    console.log("error", error);
  }
};

export { analyzeCV };
