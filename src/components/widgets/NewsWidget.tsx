import React, { useState, useEffect } from "react";
import { Newspaper, RefreshCw, ExternalLink } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const NewsWidget = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.france24.com/fr/rss");
      const data = await res.json();
      if (data.items) setNews(data.items.slice(0, 5));
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetch_();
    const id = setInterval(fetch_, 300000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassCard delay={0.3}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Newspaper style={{ width: 18, height: 18, color: "#60a5fa" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Actualités</span>
        </div>
        <button
          onClick={fetch_}
          style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", padding: 4 }}
        >
          <RefreshCw style={{ width: 14, height: 14, animation: loading ? "spin 1s linear infinite" : "none" }} />
        </button>
      </div>

      {loading && news.length === 0 ? (
        <div style={{ fontSize: 13, color: "#374151", textAlign: "center", padding: "16px 0" }}>Chargement…</div>
      ) : news.length === 0 ? (
        <div style={{ fontSize: 13, color: "#374151", textAlign: "center", padding: "16px 0" }}>Impossible de charger les actualités.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
                padding: "12px 0",
                borderBottom: i < news.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                textDecoration: "none",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e7eb", lineHeight: 1.45, marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: "#374151" }}>
                  {new Date(item.pubDate).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  {" · "}France 24
                </div>
              </div>
              <ExternalLink style={{ width: 13, height: 13, color: "#374151", flexShrink: 0, marginTop: 2 }} />
            </a>
          ))}
        </div>
      )}
    </GlassCard>
  );
};
