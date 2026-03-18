import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Sparkles, Home, Server,
  Timer, Calculator, CheckSquare, Wrench, Settings, Menu
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(8, 8, 14, 0.92)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {PRIMARY_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              whileTap={{ scale: 0.88 }}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl cursor-pointer transition-all"
              style={{
                background: isActive ? item.color + '15' : 'transparent',
                minWidth: 56,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-2xl"
                  style={{ border: `1px solid ${item.color}25` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className="relative w-5 h-5"
                style={{ color: isActive ? item.color : '#4b5563' }}
              />
              <span
                className="relative text-[10px] font-medium leading-none"
                style={{ color: isActive ? item.color : '#4b5563' }}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-dot"
                  className="absolute -top-0.5 w-1 h-1 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Menu button — shows current non-primary view or "+" */}
        <motion.button
          onClick={onMenuOpen}
          whileTap={{ scale: 0.88 }}
          className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-2xl cursor-pointer transition-all"
          style={{
            background: !isPrimaryView ? 'rgba(244,63,94,0.12)' : 'transparent',
            minWidth: 56,
            border: !isPrimaryView ? '1px solid rgba(244,63,94,0.2)' : '1px solid transparent',
          }}
        >
          <Menu className="w-5 h-5" style={{ color: !isPrimaryView ? '#f43f5e' : '#4b5563' }} />
          <span
            className="text-[10px] font-medium leading-none"
            style={{ color: !isPrimaryView ? '#f43f5e' : '#4b5563' }}
          >
            Plus
          </span>
        </motion.button>
      </div>
    </div>
  );
};
