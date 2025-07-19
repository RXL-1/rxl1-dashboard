export default function VoiceToTextButton({ setInput }: { setInput: (val: string) => void }) {
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");
    const recognition = new SpeechRecognition();
    recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  return <button onClick={startListening}>🎙️ Speak</button>;
}
