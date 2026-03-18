import React from "react";
import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: "rose" | "violet" | "amber" | "sky" | "none";
  noPad?: boolean;
}

export const GlassCard = ({ children, className = "", delay = 0, accent = "none", noPad = false }: GlassCardProps) => {
  const accentMap = {
    rose:   { border: 'rgba(244,63,94,0.18)',   top: 'rgba(244,63,94,0.3)' },
    violet: { border: 'rgba(139,92,246,0.18)',  top: 'rgba(139,92,246,0.3)' },
    amber:  { border: 'rgba(251,191,36,0.18)',  top: 'rgba(251,191,36,0.3)' },
    sky:    { border: 'rgba(56,189,248,0.18)',  top: 'rgba(56,189,248,0.3)' },
    none:   { border: 'rgba(255,255,255,0.07)', top: 'rgba(255,255,255,0.12)' },
  };

  const a = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        borderRadius: 20,
        border: `1px solid ${a.border}`,
        background: '#0d0d12',
        overflow: 'hidden',
        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
      }}
      className={className}
    >
      {/* Top shine */}
      <div style={{
        position: 'absolute', top: 0, left: 16, right: 16, height: 1,
        background: `linear-gradient(90deg, transparent, ${a.top}, transparent)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: noPad ? 0 : '20px 18px' }}>
        {children}
      </div>
    </motion.div>
  );
};
