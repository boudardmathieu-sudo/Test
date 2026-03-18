import React, { useState, useEffect } from "react";
import { Home, Lightbulb, Power, Link as LinkIcon } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { User } from "../../App";

export const SmartHomeWidget = ({ currentUser }: { currentUser: User }) => {
  const [connected, setConnected] = useState(false);
  const [devices, setDevices] = useState({ salon: true, chambre: false, bureau: true, tv: false });

  useEffect(() => {
    fetch("/api/config").then(r => r.json()).then(d => {
      if (d?.googleHomeConnected !== undefined) setConnected(d.googleHomeConnected);
    }).catch(() => {});
  }, []);

  const toggle = (key: keyof typeof devices) => setDevices(p => ({ ...p, [key]: !p[key] }));

  const toggleConnect = async () => {
    if (currentUser.role !== "admin") return;
    const next = !connected;
    setConnected(next);
    await fetch("/api/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ googleHomeConnected: next }) }).catch(() => {});
  };

  const items = [
    { id: "salon", label: "Salon", Icon: Lightbulb },
    { id: "chambre", label: "Chambre", Icon: Lightbulb },
    { id: "bureau", label: "Bureau", Icon: Lightbulb },
    { id: "tv", label: "TV", Icon: Power },
  ];

  return (
    <GlassCard delay={0.05} accent="rose">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Home style={{ width: 18, height: 18, color: "#f43f5e" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Maison Connectée</span>
        </div>
        <button
          onClick={currentUser.role === "admin" ? toggleConnect : undefined}
          style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "5px 10px", borderRadius: 99, cursor: currentUser.role === "admin" ? "pointer" : "default",
            background: connected ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${connected ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)"}`,
            color: connected ? "#93c5fd" : "#6b7280",
          }}
        >
          <LinkIcon style={{ width: 11, height: 11 }} />
          {connected ? "Google Home lié" : "Lier Google Home"}
        </button>
      </div>

      {/* Devices grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map(({ id, label, Icon }) => {
          const on = devices[id as keyof typeof devices];
          return (
            <button
              key={id}
              onClick={() => toggle(id as keyof typeof devices)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 10, padding: "18px 12px", borderRadius: 16, cursor: "pointer",
                background: on ? "rgba(244,63,94,0.12)" : "rgba(0,0,0,0.25)",
                border: `1px solid ${on ? "rgba(244,63,94,0.3)" : "rgba(255,255,255,0.06)"}`,
                boxShadow: on ? "0 0 20px rgba(244,63,94,0.12)" : "none",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: on ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.04)",
              }}>
                <Icon style={{ width: 22, height: 22, color: on ? "#f87171" : "#4b5563" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#fca5a5" : "#6b7280" }}>{label}</span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
};
