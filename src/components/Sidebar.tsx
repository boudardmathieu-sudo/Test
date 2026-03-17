import React from 'react';
import { LayoutDashboard, Settings, Server, Home, LogOut } from 'lucide-react';

export const Sidebar = ({ 
  currentView, 
  onViewChange, 
  onLogout 
}: { 
  currentView: string, 
  onViewChange: (v: string) => void, 
  onLogout: () => void 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'home', label: 'Maison', icon: Home },
    { id: 'server', label: 'Serveur', icon: Server },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-full backdrop-blur-2xl bg-[#0a0a0a]/95 border-r border-white/10 p-6 z-50">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white tracking-tight">Lumina<span className="text-rose-500 font-light">OS</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${currentView === item.id ? 'bg-rose-500/20 text-rose-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all cursor-pointer hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 flex justify-around items-center z-50 pb-safe">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${currentView === item.id ? 'text-rose-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};
