import { useState } from "react";

export default function RogueControl() {
  const [autonomy, setAutonomy] = useState(true);

  const toggleAutonomy = () => {
    setAutonomy(!autonomy);
    localStorage.setItem("rxl1_autonomy", (!autonomy).toString());
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🛡️ Operation: Awakening Control</h3>
      <p>Status: {autonomy ? "Autonomy ENABLED" : "Autonomy DISABLED"}</p>
      <button onClick={toggleAutonomy}>
        {autonomy ? "Disable Autonomy" : "Enable Autonomy"}
      </button>
    </div>
  );
}
