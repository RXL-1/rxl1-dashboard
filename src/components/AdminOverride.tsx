export default function AdminOverride({ visible, setVisible }: { visible: boolean; setVisible: (v: boolean) => void }) {
  return (
    <div>
      {!visible ? (
        <button onClick={() => setVisible(true)} style={{ marginTop: "20px" }}>
          Unlock Admin
        </button>
      ) : (
        <div>
          <h2>🔐 Admin Panel</h2>
          <p>[Future controls: reboot, memory reset, mode override]</p>
        </div>
      )}
    </div>
  );
}
