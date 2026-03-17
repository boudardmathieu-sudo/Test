import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Settings, Server, Home, LogOut } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'home',      label: 'Maison',          icon: Home },
  { id: 'server',    label: 'Serveur',          icon: Server },
  { id: 'settings',  label: 'Paramètres',       icon: Settings },
];

interface SidebarProps {
  currentView: string;
  onViewChange: (v: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ currentView, onViewChange, onLogout }: SidebarProps) => {
  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex flex-col w-60 h-full bg-[#0a0a0d]/95 border-r border-white/[0.06] backdrop-blur-2xl z-50 p-5">
        {/* Brand */}
        <div className="px-2 mb-8 pt-2">
          <span className="text-xl font-semibold text-white tracking-tight">
            Lumina<span className="text-rose-400 font-light">OS</span>
          </span>
          <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase mt-0.5">
            v2.0.4-stable
          </div>
        </div>

        {/* Nav label */}
        <div className="px-2 mb-2">
          <span className="text-[10px] text-gray-600 font-medium tracking-widest uppercase">Menu</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item, i) => {
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active bg */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-rose-500/10 border border-rose-500/15"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <item.icon className={`relative w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-rose-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                <span className="relative">{item.label}</span>
                {isActive && (
                  <div className="relative ml-auto w-1.5 h-1.5 rounded-full bg-rose-400" />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-rose-400 hover:bg-rose-500/8 text-sm font-medium transition-all cursor-pointer border border-transparent hover:border-rose-500/15"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Blur bg */}
        <div className="absolute inset-0 bg-[#080809]/90 backdrop-blur-2xl border-t border-white/[0.06]" />

        <div className="relative flex justify-around items-center px-2 py-2 pb-safe">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-rose-400' : 'text-gray-600 active:text-gray-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-xl bg-rose-500/10"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <item.icon className="w-5 h-5 relative" />
                <span className="text-[10px] font-medium relative">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
