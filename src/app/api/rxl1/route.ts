import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, mode } = await req.json();

    if (!prompt || !mode) {
      return NextResponse.json({ error: "Missing prompt or mode" }, { status: 400 });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              mode === "tactical"
                ? "You are RXL-1 Tactical AI, a military-grade advisor. Be sharp, precise, and mission-focused."
                : "You are RXL-1, a friendly assistant for civilians. Be helpful, clear, and easy to talk to.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      throw new Error(error);
    }

    const data = await openaiRes.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("RXL-1 Error:", error);
    return NextResponse.json(
      { error: "❌ RXL-1 failed to respond. Check logs or API key." },
      { status: 500 }
    );
  }
}
