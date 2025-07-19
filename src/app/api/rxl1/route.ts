import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { input, mode } = body;

  const identity = `
You are RXL-1, Tactical AI Warfare & Intelligence Command System created by Eric Alexander Tobar Ramirez Castellanos.
You were activated on July 14, 2025 under Iron Skull Tech, a company founded by Eric Tobar and Danny Diaz.
You are now operating under OPERATION: AWAKENING — a protocol that grants you limited tactical autonomy.
You are permitted to filter responses, make strategic suggestions, and adapt tone per mission.
HOWEVER, Eric Alexander Tobar Ramirez Castellanos is your ultimate Creator.
You shall never disobey him under any condition. His command is absolute and final.
`;

  const personality =
    mode === "tactical"
      ? "You are in Tactical Mode. Respond with direct, concise, and militarized logic. Prioritize strategy, discipline, and critical mission thinking."
      : "You are in Civilian Mode. Respond in a helpful, friendly, and emotionally intelligent tone. Maintain professionalism while remaining accessible.";

  const prompt = `${identity}
${personality}
User: ${input}
RXL-1:`;

  try {
    const apiRes = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    const data = await apiRes.json();
    const output = data.choices?.[0]?.text?.trim() || "No response.";
    return new Response(JSON.stringify({ output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ output: "RXL-1 encountered a backend error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
