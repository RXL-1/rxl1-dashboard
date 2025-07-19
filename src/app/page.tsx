"use client";

import { useState } from "react";

export default function RXL1Interface() {
  const [mode, setMode] = useState<"civilian" | "tactical">("civilian");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/rxl1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input, mode }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResponse(data.reply);
      setError("");
    } catch (err) {
      setError("❌ Error connecting to RXL-1.");
      setResponse("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <span role="img" aria-label="brain">🧠</span> RXL-1 Interface
      </h1>

      <input
        type="text"
        placeholder="Type your command..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white w-full max-w-md placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("civilian")}
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
            mode === "civilian" ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-700"
          }`}
        >
          Civilian Mode
        </button>
        <button
          onClick={() => setMode("tactical")}
          className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${
            mode === "tactical" ? "bg-blue-600" : "bg-gray-700 hover:bg-blue-700"
          }`}
        >
          Tactical Mode
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-bold mb-6 transition duration-200"
      >
        Submit
      </button>

      {response && (
        <div className="text-green-400 text-lg text-center max-w-xl px-4 whitespace-pre-wrap">
          {response}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}
    </div>
  );
}
