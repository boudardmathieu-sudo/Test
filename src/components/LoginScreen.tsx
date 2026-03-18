import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User as UserIcon, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { User as UserType } from "../App";
import { LeafLogo } from "./ui/LeafLogo";

export const LoginScreen = ({ onLogin }: { onLogin: (u: UserType) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch('/api/users');
      const storedUsers = await res.json();
      const user = storedUsers.find((u: any) => u.username === username && u.password === password);
      if (user) {
        onLogin({ username: user.username, role: user.role });
      } else {
        setError("Identifiants incorrects");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      style={{ width: '100%', maxWidth: 360, padding: '0 20px' }}
    >
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -12, borderRadius: '50%',
              background: 'rgba(244,63,94,0.12)', filter: 'blur(12px)',
            }} />
            <LeafLogo size={52} glow />
          </div>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.5px' }}>
          Lumina<span style={{ color: '#f87171', fontWeight: 300 }}>OS</span>
        </h1>
        <p style={{ fontSize: 13, color: '#4b5563', marginTop: 6 }}>Connexion à votre espace</p>
      </div>

      {/* Form card */}
      <div style={{
        background: '#0d0d12',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 24, right: 24, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

        <form onSubmit={handleSubmit} style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Username */}
          <div>
            <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
              Utilisateur
            </label>
            <div style={{ position: 'relative' }}>
              <UserIcon style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#4b5563', pointerEvents: 'none' }} />
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(""); }}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '13px 14px 13px 42px', color: 'white', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(244,63,94,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                placeholder="Votre nom d'utilisateur"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 11, color: '#6b7280', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#4b5563', pointerEvents: 'none' }} />
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '13px 14px 13px 42px', color: 'white', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(244,63,94,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171', fontSize: 13,
                  background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)',
                  borderRadius: 12, padding: '10px 14px' }}
              >
                <AlertCircle style={{ width: 15, height: 15, flexShrink: 0 }} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !username || !password}
            style={{
              width: '100%', marginTop: 4, padding: '14px', borderRadius: 14, cursor: 'pointer',
              background: 'linear-gradient(135deg, #f43f5e, #7c3aed)',
              border: 'none', color: 'white', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: (isLoading || !username || !password) ? 0.5 : 1,
              boxShadow: '0 8px 24px rgba(244,63,94,0.25)',
              transition: 'opacity 0.2s, transform 0.1s',
            }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }}
              />
            ) : (
              <>Se connecter <ArrowRight style={{ width: 16, height: 16 }} /></>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
