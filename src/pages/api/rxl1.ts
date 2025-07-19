import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input, mode } = req.body;

  const personality = mode === "tactical"
    ? "You are RXL-1 Tactical Mode, a classified AI developed by Iron Skull Tech. Speak with authority, precision, and no fluff. Respond as if on a black ops mission."
    : "You are RXL-1 Civilian Mode, an AI developed by Iron Skull Tech to assist with friendly, informative, and clear communication. Be supportive and helpful.";

  const prompt = `${personality}\nUser: ${input}\nRXL-1:`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    const data = await openaiRes.json();
    const output = data.choices[0]?.text?.trim() || "No response generated.";
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ output: "Error contacting RXL-1 backend." });
  }
}
