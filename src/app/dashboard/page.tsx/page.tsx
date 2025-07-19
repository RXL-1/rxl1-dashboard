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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-white">
        <span className="mr-2">🧠</span> RXL-1 Interface
      </h1>

      <input
        type="text"
        placeholder="Type your command..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4 px-4 py-2 rounded bg-gray-800 text-white w-80 placeholder-gray-400 border border-gray-600"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("civilian")}
          className={`px-4 py-2 rounded text-white ${
            mode === "civilian" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Civilian Mode
        </button>
        <button
          onClick={() => setMode("tactical")}
          className={`px-4 py-2 rounded text-white ${
            mode === "tactical" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Tactical Mode
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-bold mb-6"
      >
        Submit
      </button>

      {response && (
        <div className="text-white text-lg text-center max-w-xl px-4 border-t border-gray-600 pt-4">
          {response}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
      )}
    </div>
  );
}
