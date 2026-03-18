import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, HardDrive, Activity, Server, Link as LinkIcon, Check, X, AlertTriangle } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { User } from "../../App";

const Bar = ({ value, color, animated }: { value: number; color: string; animated?: boolean }) => (
  <div style={{ width: "100%", height: 6, background: "rgba(0,0,0,0.4)", borderRadius: 99, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
    <motion.div
      animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      transition={{ ease: "linear", duration: 0.5 }}
      style={{ height: "100%", background: color, borderRadius: 99 }}
    />
  </div>
);

export const SystemStatsWidget = ({ currentUser }: { currentUser: User }) => {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);
  const [storage, setStorage] = useState({ used: 2.1, total: 4.0 });
  const [zimaIp, setZimaIp] = useState("");
  const [connected, setConnected] = useState(false);
  const [showIp, setShowIp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/config").then(r => r.json()).then(d => {
      if (d?.zimaIp) { setZimaIp(d.zimaIp); setConnected(true); }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    let id: number;
    if (connected && zimaIp) {
      const poll = async () => {
        try {
          const res = await fetch(`/api/zimaos?ip=${encodeURIComponent(zimaIp)}`);
          if (res.ok) {
            const d = await res.json();
            if (d?.data) {
              setCpu(d.data.cpu?.percent ?? d.data.cpu?.usage ?? 0);
              const mU = d.data.mem?.used ?? 0, mT = d.data.mem?.total ?? 1;
              setRam((mU / mT) * 100);
              const dU = (d.data.disk?.used ?? 0) / 1e12, dT = (d.data.disk?.total ?? 1) / 1e12;
              if (dT > 0) setStorage({ used: dU, total: dT });
              setError(null);
            }
          } else { setError("Erreur API ZimaOS"); }
        } catch { setError("IP injoignable"); setCpu(0); setRam(0); }
      };
      poll(); id = window.setInterval(poll, 2000);
    } else {
      setError(null);
      id = window.setInterval(() => {
        setCpu(p => Math.max(5, Math.min(95, p + (Math.random() * 10 - 5))));
        setRam(p => Math.max(20, Math.min(80, p + (Math.random() * 4 - 2))));
      }, 2000);
    }
    return () => clearInterval(id);
  }, [connected, zimaIp]);

  const save = async (ip: string, c: boolean) => {
    await fetch("/api/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ zimaIp: ip }) }).catch(() => {});
  };

  const connect = () => { if (zimaIp.trim()) { setConnected(true); setShowIp(false); setError(null); save(zimaIp, true); } };
  const disconnect = () => { setConnected(false); setZimaIp(""); setError(null); save("", false); };

  const stats = [
    { label: "CPU", icon: Cpu, color: "linear-gradient(90deg,#f43f5e,#a855f7)", value: cpu, fmt: `${cpu.toFixed(1)}%` },
    { label: "RAM", icon: Activity, color: "linear-gradient(90deg,#a855f7,#3b82f6)", value: ram, fmt: `${ram.toFixed(1)}%` },
    { label: "Stockage", icon: HardDrive, color: "linear-gradient(90deg,#10b981,#14b8a6)", value: (storage.used / storage.total) * 100, fmt: `${storage.used.toFixed(1)} / ${storage.total.toFixed(1)} TB` },
  ];

  return (
    <GlassCard delay={0.05} accent="violet">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Server style={{ width: 18, height: 18, color: "#a78bfa" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Système</span>
        </div>
        <div>
          {currentUser.role === "admin" && !connected && !showIp && (
            <button onClick={() => setShowIp(true)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "5px 10px", borderRadius: 99, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280", cursor: "pointer" }}>
              <LinkIcon style={{ width: 11, height: 11 }} /> Lier ZimaOS
            </button>
          )}
          {connected && (
            <button onClick={currentUser.role === "admin" ? disconnect : undefined} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "5px 10px", borderRadius: 99, background: error ? "rgba(244,63,94,0.1)" : "rgba(16,185,129,0.1)", border: `1px solid ${error ? "rgba(244,63,94,0.25)" : "rgba(16,185,129,0.25)"}`, color: error ? "#fca5a5" : "#6ee7b7", cursor: currentUser.role === "admin" ? "pointer" : "default" }}>
              {error ? <AlertTriangle style={{ width: 11, height: 11 }} /> : <LinkIcon style={{ width: 11, height: 11 }} />}
              {error ? "Erreur réseau" : "ZimaOS lié"}
            </button>
          )}
        </div>
      </div>

      {/* IP input */}
      {showIp && !connected && (
        <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <input
            autoFocus
            value={zimaIp}
            onChange={e => setZimaIp(e.target.value)}
            onKeyDown={e => e.key === "Enter" && connect()}
            placeholder="IP (ex: 192.168.1.100)"
            style={{ flex: 1, background: "none", border: "none", color: "white", fontSize: 13, outline: "none" }}
          />
          <button onClick={connect} style={{ background: "rgba(16,185,129,0.2)", border: "none", borderRadius: 6, padding: "4px 8px", color: "#6ee7b7", cursor: "pointer" }}><Check style={{ width: 12, height: 12 }} /></button>
          <button onClick={() => setShowIp(false)} style={{ background: "rgba(244,63,94,0.2)", border: "none", borderRadius: 6, padding: "4px 8px", color: "#fca5a5", cursor: "pointer" }}><X style={{ width: 12, height: 12 }} /></button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ opacity: error ? 0.3 : 1, filter: error ? "blur(2px)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <s.icon style={{ width: 14, height: 14, color: "#6b7280" }} />
                <span style={{ fontSize: 13, color: "#9ca3af" }}>{s.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "white", fontVariantNumeric: "tabular-nums" }}>{s.fmt}</span>
            </div>
            <Bar value={s.value} color={s.color} />
          </div>
        ))}
      </div>

      {error && (
        <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: 10, textAlign: "center" }}>
          <AlertTriangle style={{ width: 14, height: 14, color: "#f87171", margin: "0 auto 4px" }} />
          <p style={{ fontSize: 12, color: "#fca5a5" }}>{error}</p>
        </div>
      )}
    </GlassCard>
  );
};
