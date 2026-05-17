import type { ExportModalProps } from "./types";

export const ExportModal = ({ code, onClose }: ExportModalProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-background-primary)",
          borderRadius: "var(--border-radius-lg)",
          border: "0.5px solid var(--color-border-tertiary)",
          padding: "1.5rem",
          maxWidth: "800px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "1rem" }}>
          Exported synth.ts
        </h2>
        <pre
          style={{
            background: "var(--color-background-secondary)",
            padding: "1rem",
            borderRadius: "var(--border-radius-md)",
            overflow: "auto",
            fontSize: "12px",
            lineHeight: 1.5,
            marginBottom: "1rem",
          }}
        >
          {code}
        </pre>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={handleCopy}>Copy to clipboard</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
