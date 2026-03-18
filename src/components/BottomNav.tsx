import React from 'react';
import { motion } from 'motion/react';
import { Grid2X2 } from 'lucide-react';
import { LeafLogo } from './ui/LeafLogo';

interface BottomNavProps {
  currentView: string;
  onViewChange: (v: string) => void;
  onMenuOpen: () => void;
}

export const BottomNav = ({ onMenuOpen }: BottomNavProps) => {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      zIndex: 50,
    }}>
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.04 }}
        onClick={onMenuOpen}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 22px 12px 16px',
          borderRadius: 999,
          background: 'rgba(13, 13, 18, 0.95)',
          border: '1px solid rgba(244,63,94,0.25)',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 24px rgba(244,63,94,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <LeafLogo size={24} />
        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
          Menu
        </span>
        <Grid2X2 style={{ width: 16, height: 16, color: '#6b7280' }} />
      </motion.button>
    </div>
  );
};
