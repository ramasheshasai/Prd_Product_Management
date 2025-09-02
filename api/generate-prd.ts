import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Ensure env var is set
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { problemStatement, targetAudience, goals, features, constraints } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert product manager. Generate a complete PRD in strict JSON format only, no extra text.",
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

    // Try to extract JSON safely
    try {
      const prd = JSON.parse(prdText);
      res.status(200).json(prd);
    } catch {
      res.status(200).json({ raw: prdText }); // fallback if not valid JSON
    }
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "Failed to generate PRD" });
  }
}
