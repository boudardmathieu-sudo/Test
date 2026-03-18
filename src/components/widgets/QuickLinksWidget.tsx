import React, { useState, useEffect } from "react";
import { Globe, Plus, Trash2, ExternalLink, X } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { User } from "../../App";

interface Link { name: string; url: string; }

export const QuickLinksWidget = ({ currentUser }: { currentUser: User }) => {
  const [links, setLinks] = useState<Link[]>(() => {
    const s = localStorage.getItem("lumina_quicklinks");
    return s ? JSON.parse(s) : [
      { name: "Router", url: "http://192.168.1.1" },
      { name: "GitHub", url: "https://github.com" },
      { name: "YouTube", url: "https://youtube.com" },
      { name: "Proxmox", url: "https://192.168.1.100:8006" },
    ];
  });
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => { localStorage.setItem("lumina_quicklinks", JSON.stringify(links)); }, [links]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    const finalUrl = url.startsWith("http") ? url : "https://" + url;
    setLinks([...links, { name, url: finalUrl }]);
    setName(""); setUrl(""); setAdding(false);
  };

  const COLORS = ["#f43f5e", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#38bdf8"];

  return (
    <GlassCard delay={0.25}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Globe style={{ width: 18, height: 18, color: "#60a5fa" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Raccourcis</span>
        </div>
        {currentUser.role === "admin" && (
          <button
            onClick={() => setAdding(!adding)}
            style={{
              background: adding ? "rgba(244,63,94,0.1)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
              padding: "5px 8px", color: adding ? "#f87171" : "#6b7280", cursor: "pointer",
            }}
          >
            {adding ? <X style={{ width: 14, height: 14 }} /> : <Plus style={{ width: 14, height: 14 }} />}
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={add} style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            placeholder="Nom (ex: NAS)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "10px 12px", color: "white", fontSize: 13, outline: "none",
            }}
          />
          <input
            placeholder="URL (ex: 192.168.1.50)"
            value={url}
            onChange={e => setUrl(e.target.value)}
            style={{
              background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "10px 12px", color: "white", fontSize: 13, outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.25)",
              borderRadius: 10, padding: "10px", color: "#60a5fa", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}
          >
            Ajouter
          </button>
        </form>
      )}

      {/* Links grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {links.map((link, i) => (
          <div key={i} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1, display: "flex", alignItems: "center", gap: 10,
                background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "11px 12px",
                textDecoration: "none", overflow: "hidden",
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: COLORS[i % COLORS.length] + "18",
                border: `1px solid ${COLORS[i % COLORS.length]}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ExternalLink style={{ width: 13, height: 13, color: COLORS[i % COLORS.length] }} />
              </div>
              <span style={{
                fontSize: 13, fontWeight: 500, color: "#d1d5db",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {link.name}
              </span>
            </a>
            {currentUser.role === "admin" && (
              <button
                onClick={() => setLinks(links.filter((_, j) => j !== i))}
                style={{
                  position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%",
                  background: "#1a1a1a", border: "1px solid rgba(244,63,94,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#f87171", cursor: "pointer", padding: 0,
                }}
              >
                <X style={{ width: 10, height: 10 }} />
              </button>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
