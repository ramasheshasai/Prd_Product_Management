import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { problemStatement, targetAudience, goals, features, constraints } = req.body;

  if (!problemStatement || !targetAudience || !goals) {
    return res.status(400).json({
      error: "Missing required fields: problemStatement, targetAudience, and goals are required",
    });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert product manager. Generate a complete PRD.
          Respond in JSON only with these fields:
          - title (string)
          - problemStatement (string)
          - targetAudience (string)
          - goals (string)
          - features (string)
          - constraints (string)
          - objectives (array of strings)
          - userStories (array of strings)
          - requirements (array of strings)
          - acceptanceCriteria (array of strings)
          - metrics (array of strings)
          - risks (array of strings)
          - createdAt (ISO date string)`,
        },
        {
          role: "user",
          content: JSON.stringify({
            problemStatement,
            targetAudience,
            goals,
            features,
            constraints,
          }),
        },
      ],
      temperature: 0.7,
    });

    let prdText = completion.choices[0].message?.content?.trim() || "{}";

    try {
      const prd = JSON.parse(prdText);
      prd.createdAt = new Date().toISOString();
      return res.status(200).json(prd);
    } catch {
      return res.status(200).json({ raw: prdText });
    }
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({ error: "Failed to generate PRD" });
  }
}
