import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Home, Server, Settings,
  Timer, Calculator, CheckSquare, Wrench,
  LogOut, X, Sparkles
} from 'lucide-react';
import { LeafLogo } from './ui/LeafLogo';

const MODULES = [
  { id: 'lumy',       label: 'Lumy',        sub: 'IA locale',           icon: Sparkles,        color: '#fbbf24', bg: 'rgba(251,191,36,0.08)'  },
  { id: 'dashboard',  label: 'Dashboard',   sub: 'Vue générale',        icon: LayoutDashboard, color: '#f43f5e', bg: 'rgba(244,63,94,0.08)'  },
  { id: 'home',       label: 'Maison',      sub: 'Google Home',         icon: Home,            color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  { id: 'server',     label: 'Serveur',     sub: 'ZimaOS',              icon: Server,          color: '#38bdf8', bg: 'rgba(56,189,248,0.08)'  },
  { id: 'pomodoro',   label: 'Pomodoro',    sub: 'Focus',               icon: Timer,           color: '#fb923c', bg: 'rgba(251,146,60,0.08)'  },
  { id: 'calculator', label: 'Calculette',  sub: 'Calculs rapides',     icon: Calculator,      color: '#34d399', bg: 'rgba(52,211,153,0.08)'  },
  { id: 'habits',     label: 'Habitudes',   sub: 'Suivi journalier',    icon: CheckSquare,     color: '#60a5fa', bg: 'rgba(96,165,250,0.08)'  },
  { id: 'tools',      label: 'Outils',      sub: 'Utilitaires',         icon: Wrench,          color: '#f472b6', bg: 'rgba(244,114,182,0.08)' },
  { id: 'settings',   label: 'Paramètres',  sub: 'Configuration',       icon: Settings,        color: '#94a3b8', bg: 'rgba(148,163,184,0.08)' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (v: string) => void;
  onLogout: () => void;
  userName: string;
}

export const FullScreenMenu = ({ open, onClose, currentView, onViewChange, onLogout, userName }: Props) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const select = (id: string) => { onViewChange(id); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'rgba(4, 4, 8, 0.97)',
            backdropFilter: 'blur(12px)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Glow */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.08 }}
              transition={{ duration: 0.7 }}
              style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: '#f43f5e', filter: 'blur(120px)' }}
            />
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.06 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ position: 'absolute', bottom: '20%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: '#7c3aed', filter: 'blur(110px)' }}
            />
          </div>

          {/* Header */}
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.35 }}
            style={{
              position: 'relative', zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 20px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LeafLogo size={28} />
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{userName}</div>
                <div style={{ color: '#4b5563', fontSize: 11 }}>LuminaOS v2.0.4</div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#6b7280', cursor: 'pointer',
              }}
            >
              <X style={{ width: 16, height: 16 }} />
            </motion.button>
          </motion.div>

          {/* Modules grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 100px', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 10, color: '#4b5563', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Modules
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {MODULES.map((mod, i) => {
                const isActive = currentView === mod.id;
                return (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.06 + i * 0.03, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => select(mod.id)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                      padding: '16px 14px', borderRadius: 18, cursor: 'pointer', textAlign: 'left',
                      background: isActive ? mod.bg : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isActive ? mod.color + '25' : 'rgba(255,255,255,0.06)'}`,
                      position: 'relative', overflow: 'hidden',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: '50%',
                        background: mod.color, boxShadow: `0 0 8px ${mod.color}`,
                      }} />
                    )}

                    {/* Icon */}
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: mod.color + '16',
                      border: `1px solid ${mod.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 12,
                    }}>
                      <mod.icon style={{ width: 18, height: 18, color: mod.color }} />
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 2 }}>{mod.label}</div>
                    <div style={{ fontSize: 11, color: '#4b5563' }}>{mod.sub}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            style={{
              position: 'relative', zIndex: 1,
              padding: '14px 20px 20px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => { onLogout(); onClose(); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px', borderRadius: 16,
                background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.15)',
                color: '#f87171', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <LogOut style={{ width: 16, height: 16 }} />
              Déconnexion
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
