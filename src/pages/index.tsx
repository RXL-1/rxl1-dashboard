import { useState } from "react";
import Head from "next/head";
import ChatHistory from "../components/ChatHistory";
import VoiceToTextButton from "../components/VoiceToTextButton";
import AdminOverride from "../components/AdminOverride";

export default function Home() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"civilian" | "tactical">("civilian");
  const [messages, setMessages] = useState<{ type: string; text: string }[]>([]);
  const [adminVisible, setAdminVisible] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");

    const res = await fetch("/api/rxl1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, mode }),
    });

    const data = await res.json();
    const reply = data.output;
    setMessages((prev) => [...prev, { type: "bot", text: reply }]);

    const utterance = new SpeechSynthesisUtterance(reply);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Head><title>RXL-1 Interface</title></Head>
      <main className="container">
        <h1>🧠 RXL-1 Interface</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Type your command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="mode-buttons">
            <button onClick={() => setMode("civilian")} className={mode === "civilian" ? "active" : ""}>Civilian Mode</button>
            <button onClick={() => setMode("tactical")} className={mode === "tactical" ? "active" : ""}>Tactical Mode</button>
          </div>
          <button className="submit" onClick={sendMessage}>Submit</button>
          <VoiceToTextButton setInput={setInput} />
        </div>
        <ChatHistory messages={messages} />
        <AdminOverride visible={adminVisible} setVisible={setAdminVisible} />
      </main>
    </>
  );
}
