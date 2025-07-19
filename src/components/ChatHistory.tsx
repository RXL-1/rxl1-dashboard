type Message = { type: string; text: string };

export default function ChatHistory({ messages }: { messages: Message[] }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={"message " + msg.type}>
          <strong>{msg.type === "user" ? "You" : "RXL-1"}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}
