import React, { useState, useEffect } from "react";
import { Music, Play, Pause, SkipForward, SkipBack, LogIn, AlertCircle } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { User } from "../../App";

export const SpotifyWidget = ({ currentUser }: { currentUser: User }) => {
  const [connected, setConnected] = useState(false);
  const [playerData, setPlayerData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayer = async () => {
    try {
      const res = await fetch(`/api/spotify/player?username=${currentUser.username}`);
      const data = await res.json();
      setConnected(data.connected);
      setPlayerData(data.connected && data.data ? data.data : null);
    } catch {}
  };

  useEffect(() => {
    fetchPlayer();
    const id = setInterval(fetchPlayer, 5000);
    return () => clearInterval(id);
  }, [currentUser]);

  useEffect(() => {
    const fn = (e: MessageEvent) => { if (e.data?.type === "SPOTIFY_AUTH_SUCCESS") fetchPlayer(); };
    window.addEventListener("message", fn);
    return () => window.removeEventListener("message", fn);
  }, []);

  const connect = async () => {
    try {
      const res = await fetch(`/api/spotify/auth-url?username=${currentUser.username}`);
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      window.open(data.url, "spotify_auth", "width=600,height=700");
    } catch { setError("Erreur de connexion au serveur"); }
  };

  const control = async (action: string) => {
    await fetch("/api/spotify/player/control", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUser.username, action }),
    });
    setTimeout(fetchPlayer, 500);
  };

  return (
    <GlassCard delay={0.2} accent="none">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Music style={{ width: 18, height: 18, color: "#4ade80" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Spotify</span>
        </div>
        {connected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />}
      </div>

      {/* Content */}
      {error ? (
        <div style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
          <AlertCircle style={{ width: 20, height: 20, color: "#f87171", margin: "0 auto 8px" }} />
          <p style={{ fontSize: 13, color: "#fca5a5" }}>{error}</p>
        </div>
      ) : !connected ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 }}>
            Connectez votre compte Spotify pour contrôler votre musique.
          </p>
          <button
            onClick={connect}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1db954", color: "white", border: "none",
              borderRadius: 999, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            <LogIn style={{ width: 15, height: 15 }} />
            Connecter Spotify
          </button>
        </div>
      ) : playerData?.item ? (
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <img
            src={playerData.item.album.images[0]?.url}
            alt="Album"
            style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0, objectFit: "cover" }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 3 }}>
              {playerData.item.name}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 12 }}>
              {playerData.item.artists.map((a: any) => a.name).join(", ")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => control("previous")} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 0 }}>
                <SkipBack style={{ width: 20, height: 20 }} />
              </button>
              <button
                onClick={() => control(playerData.is_playing ? "pause" : "play")}
                style={{
                  width: 36, height: 36, borderRadius: "50%", background: "white", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}
              >
                {playerData.is_playing
                  ? <Pause style={{ width: 16, height: 16, color: "#111" }} />
                  : <Play style={{ width: 16, height: 16, color: "#111", marginLeft: 2 }} />
                }
              </button>
              <button onClick={() => control("next")} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 0 }}>
                <SkipForward style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: "#4b5563", fontSize: 13, padding: "12px 0", lineHeight: 1.6 }}>
          Aucune musique en cours<br />
          <span style={{ fontSize: 12, color: "#374151" }}>Lancez Spotify sur un appareil</span>
        </div>
      )}
    </GlassCard>
  );
};
