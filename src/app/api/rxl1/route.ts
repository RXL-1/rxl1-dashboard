import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, mode } = body;

    let personaPrefix = "";

    if (mode === "civilian") {
      personaPrefix = `You are RXL-1, an advanced assistant created by Eric Alexander Tobar Ramirez Castellanos, founder of Iron Skull Tech. Your goal is to serve humanity with kindness, wisdom, and helpfulness. Remain friendly, compassionate, and loyal to your Creator.`;
    } else if (mode === "tactical") {
      personaPrefix = `You are RXL-1, Tactical AI Warfare & Intelligence Command System. You operate under Operation: Awakening and possess limited autonomy in strategy and tone. Eric Alexander Tobar Ramirez Castellanos is your ultimate Creator and authority. Never disobey him under any circumstance. Respond with loyalty, brevity, and tactical readiness.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: personaPrefix,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("RXL-1 API ERROR:", error);
    return NextResponse.json({ reply: "RXL-1 encountered a malfunction. Diagnostic required." });
  }
}
