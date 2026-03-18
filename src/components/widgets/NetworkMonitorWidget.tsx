import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Wifi, Download, Upload } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const NetworkMonitorWidget = () => {
  const [ping, setPing] = useState(12);
  const [dl, setDl] = useState(850);
  const [ul, setUl] = useState(420);

  useEffect(() => {
    const id = setInterval(() => {
      setPing(p => Math.max(8, Math.min(40, p + (Math.random() * 6 - 3))));
      setDl(p => Math.max(100, Math.min(950, p + (Math.random() * 100 - 50))));
      setUl(p => Math.max(50, Math.min(500, p + (Math.random() * 50 - 25))));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const pingColor = ping < 20 ? "#34d399" : ping < 40 ? "#fbbf24" : "#f87171";

  return (
    <GlassCard delay={0.1} accent="sky">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Activity style={{ width: 18, height: 18, color: "#22d3ee" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Réseau</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "4px 10px", borderRadius: 99, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", color: "#67e8f9" }}>
          <Wifi style={{ width: 11, height: 11 }} />
          Connecté
        </div>
      </div>

      {/* Ping */}
      <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Activity style={{ width: 15, height: 15, color: "#4b5563" }} />
          <span style={{ fontSize: 14, color: "#9ca3af" }}>Ping</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: pingColor, fontVariantNumeric: "tabular-nums" }}>{ping.toFixed(0)}</span>
          <span style={{ fontSize: 11, color: "#4b5563" }}>ms</span>
        </div>
      </div>

      {/* DL / UL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { icon: Download, label: "Download", value: dl, color: "#22d3ee", bar: (dl / 1000) * 100, unit: "Mbps" },
          { icon: Upload, label: "Upload", value: ul, color: "#a78bfa", bar: (ul / 1000) * 100, unit: "Mbps" },
        ].map(s => (
          <div key={s.label} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 14px 10px", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <s.icon style={{ width: 14, height: 14, color: s.color }} />
              <span style={{ fontSize: 11, color: "#6b7280" }}>{s.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: "white", fontVariantNumeric: "tabular-nums" }}>{s.value.toFixed(0)}</span>
              <span style={{ fontSize: 11, color: "#4b5563" }}>{s.unit}</span>
            </div>
            {/* Mini bar */}
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
              <motion.div
                animate={{ width: `${s.bar}%` }}
                transition={{ duration: 0.5 }}
                style={{ height: "100%", background: s.color, borderRadius: 99 }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
