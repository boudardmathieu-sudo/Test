import React, { useState, useEffect } from "react";
import { Bell, Plus, X } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const [tz, setTz] = useState("Europe/Paris");
  const [alarms, setAlarms] = useState<{ t: string; on: boolean }[]>([]);
  const [newA, setNewA] = useState("");

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const addAlarm = () => {
    if (newA && !alarms.find(a => a.t === newA)) {
      setAlarms([...alarms, { t: newA, on: true }]);
      setNewA("");
    }
  };

  const timeStr = time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: tz });
  const secStr = time.toLocaleTimeString("fr-FR", { second: "2-digit", timeZone: tz }).slice(-2);
  const dateStr = time.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: tz });

  return (
    <GlassCard delay={0.05} accent="rose">
      {/* Time */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
          <span style={{ fontSize: 56, fontWeight: 200, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>
            {timeStr}
          </span>
          <span style={{ fontSize: 20, fontWeight: 300, color: "#f43f5e", opacity: 0.7, letterSpacing: "-1px" }}>
            {secStr}
          </span>
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, textTransform: "capitalize", letterSpacing: "0.02em" }}>
          {dateStr}
        </div>
      </div>

      {/* Timezone */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <select
          value={tz}
          onChange={e => setTz(e.target.value)}
          style={{
            background: "rgba(0,0,0,0.3)", color: "#9ca3af", fontSize: 12,
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
            padding: "5px 10px", outline: "none", cursor: "pointer",
          }}
        >
          <option value="Europe/Paris">Paris</option>
          <option value="America/New_York">New York</option>
          <option value="Asia/Tokyo">Tokyo</option>
          <option value="Europe/London">Londres</option>
        </select>
      </div>

      {/* Alarms section */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Bell style={{ width: 16, height: 16, color: "#f43f5e" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Alarmes</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            type="time"
            value={newA}
            onChange={e => setNewA(e.target.value)}
            style={{
              flex: 1, background: "rgba(0,0,0,0.3)", color: "white", fontSize: 14,
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
              padding: "9px 12px", outline: "none",
            }}
          />
          <button
            onClick={addAlarm}
            style={{
              background: "rgba(244,63,94,0.15)", color: "#f87171", border: "1px solid rgba(244,63,94,0.2)",
              borderRadius: 10, padding: "0 16px", fontSize: 18, cursor: "pointer",
            }}
          >
            <Plus style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {alarms.length === 0 && (
            <p style={{ fontSize: 12, color: "#4b5563", textAlign: "center", padding: "8px 0" }}>Aucune alarme</p>
          )}
          {alarms.map((a, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 12px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: a.on ? "white" : "#4b5563" }}>{a.t}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  onClick={() => {
                    const n = [...alarms]; n[i].on = !n[i].on; setAlarms(n);
                  }}
                  style={{
                    width: 36, height: 20, borderRadius: 10, cursor: "pointer",
                    background: a.on ? "#f43f5e" : "rgba(255,255,255,0.1)",
                    position: "relative", transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 2, left: a.on ? 18 : 2,
                    width: 16, height: 16, borderRadius: "50%", background: "white",
                    transition: "left 0.2s",
                  }} />
                </div>
                <button
                  onClick={() => setAlarms(alarms.filter((_, j) => j !== i))}
                  style={{ background: "none", border: "none", color: "#4b5563", cursor: "pointer", padding: 2 }}
                >
                  <X style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
