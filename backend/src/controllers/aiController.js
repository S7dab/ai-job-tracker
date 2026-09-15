import ai from "../config/ai.js";

const analyzeJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, skills } = req.body;

    if (!jobTitle || !jobDescription || !skills) {
      return res
        .status(400)
        .json({ status: false, message: "All field required" });
    }
    // prompt
    const prompt = `
Analyze this job opportunity and compare it with the candidate's skills.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Candidate Skills:
${skills}

Provide the result in valid JSON only.

Use exactly this structure:

{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "analysis": "",
  "recommendation": ""
}

Rules:
- matchScore must be a number from 0 to 100.
- matchingSkills must be an array of strings.
- missingSkills must be an array of strings.
- analysis must be a short string.
- recommendation must be either "Apply" or "Not Recommended".
- Do not include markdown.
- Do not include \`\`\`json.
- Return JSON only.
- Respond in the same language as the user's job description.
- If the job description is in Arabic, write the analysis and recommendation in Arabic.
- If the job description is in English, write the analysis and recommendation in English.
- Keep skill names in their original technical form.`;

    // ai calling
    const completion = await ai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: "You are an expert job matching assistant",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // result
    const result = JSON.parse(completion.choices[0].message.content);

    return res.status(200).json({ status: true, result });
  } catch (error) {
    console.log("Ai error", error);
    return res
      .status(500)
      .json({ status: false, message: "AI analysis failed" });
  }
};

export { analyzeJob };
