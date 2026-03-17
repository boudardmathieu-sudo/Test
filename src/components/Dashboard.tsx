import React, { useState } from "react";
import { motion } from "motion/react";
import { LogOut } from "lucide-react";
import { ClockWidget } from "./widgets/ClockWidget";
import { WeatherWidget } from "./widgets/WeatherWidget";
import { SystemStatsWidget } from "./widgets/SystemStatsWidget";
import { SmartHomeWidget } from "./widgets/SmartHomeWidget";
import { NotepadWidget } from "./widgets/NotepadWidget";
import { SettingsWidget } from "./widgets/SettingsWidget";
import { DiscordBotWidget } from "./widgets/DiscordBotWidget";
import { QuickLinksWidget } from "./widgets/QuickLinksWidget";
import { NewsWidget } from "./widgets/NewsWidget";
import { SpotifyWidget } from "./widgets/SpotifyWidget";
import { GoogleSearchWidget } from "./widgets/GoogleSearchWidget";
import { TodoWidget } from "./widgets/TodoWidget";
import { NetworkMonitorWidget } from "./widgets/NetworkMonitorWidget";
import { Sidebar } from "./Sidebar";
import { User } from "../App";

export const Dashboard = ({ currentUser, onLogout }: { currentUser: User, onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState('dashboard');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) return 'Bonsoir';
    return 'Bonjour';
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ClockWidget />
            <WeatherWidget />
            <GoogleSearchWidget />
            <QuickLinksWidget currentUser={currentUser} />
            <NewsWidget />
            <SpotifyWidget currentUser={currentUser} />
            <TodoWidget />
            <NotepadWidget />
          </div>
        );
      case 'server':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SystemStatsWidget currentUser={currentUser} />
            <NetworkMonitorWidget />
          </div>
        );
      case 'home':
        return (
          <div className="grid grid-cols-1 gap-6 max-w-4xl">
            <SmartHomeWidget currentUser={currentUser} />
          </div>
        );
      case 'settings':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsWidget currentUser={currentUser} />
            {currentUser.role === 'admin' && <DiscordBotWidget />}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout} 
      />
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 z-10 relative flex flex-col pb-24 md:pb-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 mt-2 md:mt-0"
        >
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {currentView === 'dashboard' && `${getGreeting()}, ${currentUser.username} 👋`}
              {currentView === 'server' && 'Serveur & Réseau'}
              {currentView === 'home' && 'Maison Connectée'}
              {currentView === 'settings' && 'Paramètres'}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              {currentView === 'dashboard' && "Voici un aperçu de votre système aujourd'hui."}
              {currentView === 'server' && "Surveillez les performances de votre infrastructure."}
              {currentView === 'home' && "Contrôlez vos appareils intelligents."}
              {currentView === 'settings' && "Gérez vos préférences et utilisateurs."}
            </p>
          </div>
          
          <button 
            onClick={onLogout}
            className="md:hidden flex items-center gap-2 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
