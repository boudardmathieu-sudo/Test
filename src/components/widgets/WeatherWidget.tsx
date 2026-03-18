import React, { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudLightning, CloudSnow, RefreshCw } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const getIcon = (code: number, sz: number, color?: string) => {
  const c = color ?? "#fbbf24";
  const style = { width: sz, height: sz, color: c };
  if (code <= 3) return <Sun style={style} />;
  if (code >= 45 && code <= 48) return <Cloud style={{ ...style, color: "#94a3b8" }} />;
  if (code >= 51 && code <= 67) return <CloudRain style={{ ...style, color: "#60a5fa" }} />;
  if (code >= 71 && code <= 77) return <CloudSnow style={{ ...style, color: "#bae6fd" }} />;
  if (code >= 95) return <CloudLightning style={{ ...style, color: "#fde68a" }} />;
  return <Cloud style={{ ...style, color: "#94a3b8" }} />;
};

const descCode = (code: number) => {
  if (code <= 1) return "Ensoleillé";
  if (code <= 3) return "Nuageux";
  if (code <= 48) return "Brumeux";
  if (code <= 67) return "Pluvieux";
  if (code <= 77) return "Neigeux";
  if (code >= 95) return "Orageux";
  return "Variable";
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=46.3231&longitude=-0.4609&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Europe%2FParis&forecast_days=1")
      .then(r => r.json())
      .then(d => { setWeather(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading || !weather) {
    return (
      <GlassCard delay={0.1} accent="sky">
        <div style={{ textAlign: "center", color: "#4b5563", padding: "24px 0", fontSize: 13 }}>
          Chargement de la météo…
        </div>
      </GlassCard>
    );
  }

  const cur = weather.current;
  const hourly = weather.hourly;
  const hIdx = new Date().getHours();
  const next = [1, 2, 3, 4].map(o => {
    const i = hIdx + o;
    return { time: `${i % 24}h`, temp: hourly.temperature_2m[i], precip: hourly.precipitation_probability[i], code: hourly.weather_code[i] };
  });

  return (
    <GlassCard delay={0.1} accent="sky">
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "white" }}>Niort</div>
          <div style={{ fontSize: 12, color: "#4b5563", marginTop: 2 }}>Deux-Sèvres, FR</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {getIcon(cur.weather_code, 36)}
          <button onClick={load} style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", padding: 4 }}>
            <RefreshCw style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* Temp + desc */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 52, fontWeight: 200, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>
          {Math.round(cur.temperature_2m)}°
        </span>
        <span style={{ fontSize: 14, color: "#6b7280" }}>{descCode(cur.weather_code)}</span>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Droplets style={{ width: 14, height: 14, color: "#60a5fa" }} />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{cur.relative_humidity_2m}%</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Wind style={{ width: 14, height: 14, color: "#94a3b8" }} />
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{cur.wind_speed_10m} km/h</span>
        </div>
      </div>

      {/* Hourly */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
        {next.map((h, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 11, color: "#4b5563" }}>{h.time}</span>
            {getIcon(h.code, 18, "#94a3b8")}
            <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{Math.round(h.temp)}°</span>
            <span style={{ fontSize: 11, color: "#60a5fa" }}>{h.precip}%</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
