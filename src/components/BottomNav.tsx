import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Sparkles, Home, Server, Menu
} from 'lucide-react';

const PRIMARY_ITEMS = [
  { id: 'dashboard',  icon: LayoutDashboard, color: '#f43f5e', label: 'Home' },
  { id: 'lumy',       icon: Sparkles,        color: '#fbbf24', label: 'Lumy' },
  { id: 'home',       icon: Home,            color: '#a78bfa', label: 'Maison' },
  { id: 'server',     icon: Server,          color: '#38bdf8', label: 'Serveur' },
];

interface BottomNavProps {
  currentView: string;
  onViewChange: (v: string) => void;
  onMenuOpen: () => void;
}

export const BottomNav = ({ currentView, onViewChange, onMenuOpen }: BottomNavProps) => {
  const isPrimaryView = PRIMARY_ITEMS.some(item => item.id === currentView);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'rgba(6, 6, 10, 0.94)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '8px 8px 4px' }}>
        {PRIMARY_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              whileTap={{ scale: 0.85 }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                padding: '10px 16px 8px',
                borderRadius: 16,
                border: 'none',
                background: isActive ? item.color + '14' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s',
                minWidth: 60,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="bnav-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 16,
                    border: `1px solid ${item.color}22`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Active dot above icon */}
              {isActive && (
                <motion.div
                  layoutId="bnav-dot"
                  style={{
                    position: 'absolute',
                    top: 5,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <item.icon
                style={{
                  width: 22,
                  height: 22,
                  color: isActive ? item.color : '#374151',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? item.color : '#374151',
                  transition: 'color 0.2s',
                  letterSpacing: '0.02em',
                  position: 'relative',
                  lineHeight: 1,
                }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}

        {/* More / Menu */}
        <motion.button
          onClick={onMenuOpen}
          whileTap={{ scale: 0.85 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            padding: '10px 16px 8px',
            borderRadius: 16,
            border: !isPrimaryView ? '1px solid rgba(244,63,94,0.2)' : 'none',
            background: !isPrimaryView ? 'rgba(244,63,94,0.1)' : 'transparent',
            cursor: 'pointer',
            minWidth: 60,
          }}
        >
          <Menu
            style={{
              width: 22,
              height: 22,
              color: !isPrimaryView ? '#f43f5e' : '#374151',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: !isPrimaryView ? 600 : 400,
              color: !isPrimaryView ? '#f43f5e' : '#374151',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            Plus
          </span>
        </motion.button>
      </div>
    </div>
  );
};
