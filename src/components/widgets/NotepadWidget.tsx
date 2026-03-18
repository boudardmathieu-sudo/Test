import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const NotepadWidget = () => {
  const [note, setNote] = useState(() => localStorage.getItem("lumina_note") ?? "");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setSaved(false);
    const id = setTimeout(() => {
      localStorage.setItem("lumina_note", note);
      setSaved(true);
    }, 600);
    return () => clearTimeout(id);
  }, [note]);

  return (
    <GlassCard delay={0.25}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText style={{ width: 18, height: 18, color: "#60a5fa" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Notes</span>
        </div>
        <span style={{ fontSize: 11, color: saved ? "#34d399" : "#6b7280", transition: "color 0.3s" }}>
          {saved ? "Sauvegardé" : "…"}
        </span>
      </div>

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Vos notes ici… (sauvegarde automatique)"
        style={{
          width: "100%", minHeight: 140,
          background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, padding: "13px 14px",
          color: "white", fontSize: 14, lineHeight: 1.6,
          outline: "none", resize: "vertical",
          boxSizing: "border-box", fontFamily: "inherit",
        }}
        onFocus={e => (e.target.style.borderColor = "rgba(96,165,250,0.35)")}
        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
      />
    </GlassCard>
  );
};
