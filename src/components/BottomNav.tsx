import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Sparkles, Home, Server, Grid3X3 } from 'lucide-react';

const TABS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Accueil',  color: '#f43f5e' },
  { id: 'lumy',      icon: Sparkles,        label: 'Lumy',     color: '#fbbf24' },
  { id: 'home',      icon: Home,            label: 'Maison',   color: '#a78bfa' },
  { id: 'server',    icon: Server,          label: 'Serveur',  color: '#38bdf8' },
  { id: '_menu',     icon: Grid3X3,         label: 'Plus',     color: '#94a3b8' },
];

interface BottomNavProps {
  currentView: string;
  onViewChange: (v: string) => void;
  onMenuOpen: () => void;
}

export const BottomNav = ({ currentView, onViewChange, onMenuOpen }: BottomNavProps) => {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(8, 8, 14, 0.88)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(32px)',
      WebkitBackdropFilter: 'blur(32px)',
      paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {TABS.map((tab) => {
          const isActive = currentView === tab.id;
          const isMenu = tab.id === '_menu';
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => isMenu ? onMenuOpen() : onViewChange(tab.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 4, padding: '12px 4px 10px',
                background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
              }}
            >
              {/* Active pill indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    style={{
                      position: 'absolute', top: 8,
                      width: 36, height: 36, borderRadius: 12,
                      background: tab.color + '16',
                      border: `1px solid ${tab.color}22`,
                    }}
                  />
                )}
              </AnimatePresence>

              <tab.icon
                style={{
                  width: 20, height: 20, position: 'relative',
                  color: isActive ? tab.color : '#374151',
                  transition: 'color 0.2s',
                }}
              />
              <span style={{
                fontSize: 10, fontWeight: isActive ? 600 : 400,
                color: isActive ? tab.color : '#374151',
                letterSpacing: '0.01em', lineHeight: 1,
                transition: 'color 0.2s',
              }}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
