import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
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
import { PomodoroWidget } from "./widgets/PomodoroWidget";
import { CalculatorWidget } from "./widgets/CalculatorWidget";
import { HabitWidget } from "./widgets/HabitWidget";
import { ToolsWidget } from "./widgets/ToolsWidget";
import { FridayWidget } from "./widgets/FridayWidget";
import { FullScreenMenu } from "./FullScreenMenu";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { User } from "../App";

const VIEW_META: Record<string, { title: string; subtitle: string }> = {
  dashboard:  { title: "Dashboard",        subtitle: "Aperçu de votre système" },
  server:     { title: "Serveur & Réseau",  subtitle: "Performances de l'infrastructure" },
  home:       { title: "Maison Connectée", subtitle: "Contrôle des appareils" },
  settings:   { title: "Paramètres",       subtitle: "Préférences et utilisateurs" },
  pomodoro:   { title: "Pomodoro",         subtitle: "Technique de concentration" },
  calculator: { title: "Calculette",       subtitle: "Calculs rapides" },
  habits:     { title: "Habitudes",        subtitle: "Suivi journalier" },
  tools:      { title: "Boîte à outils",   subtitle: "Utilitaires pratiques" },
  lumy:       { title: "Lumy",             subtitle: "Intelligence personnelle — 100% locale" },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
};

export const Dashboard = ({ currentUser, onLogout }: { currentUser: User; onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const meta = VIEW_META[currentView] ?? VIEW_META.dashboard;

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
      case "server":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SystemStatsWidget currentUser={currentUser} />
            <NetworkMonitorWidget />
          </div>
        );
      case "home":
        return (
          <div className="max-w-2xl mx-auto w-full">
            <SmartHomeWidget currentUser={currentUser} />
          </div>
        );
      case "settings":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingsWidget currentUser={currentUser} />
            {currentUser.role === "admin" && <DiscordBotWidget />}
          </div>
        );
      case "pomodoro":
        return (
          <div className="flex justify-center">
            <PomodoroWidget />
          </div>
        );
      case "calculator":
        return (
          <div className="flex justify-center">
            <CalculatorWidget />
          </div>
        );
      case "habits":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <HabitWidget />
          </div>
        );
      case "tools":
        return (
          <div className="w-full">
            <ToolsWidget />
          </div>
        );
      case "lumy":
        return (
          <div className="h-full">
            <FridayWidget userName={currentUser.username} onNavigate={(view) => setCurrentView(view)} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100dvh', width: '100%', overflow: 'hidden', background: '#060608' }}>

      {/* Full screen menu overlay */}
      <FullScreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userName={currentUser.username}
      />

      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          onLogout={onLogout}
        />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex-shrink-0 px-4 md:px-6 pt-4 md:pt-5 pb-3 md:pb-4 border-b border-white/[0.04] flex items-center gap-3"
        >
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg md:text-xl font-semibold text-white tracking-tight truncate">
                  {currentView === "dashboard"
                    ? `${getGreeting()}, ${currentUser.username}`
                    : currentView === "lumy"
                    ? <><span className="text-amber-400">Lumy</span><span className="text-gray-700 font-light text-sm md:text-base ml-2">— IA Personnelle</span></>
                    : meta.title}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm mt-0.5 truncate">
                  {currentView === "dashboard"
                    ? new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                    : currentView === "lumy"
                    ? "Mémoire locale · Sans API · Sans cloud"
                    : meta.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lumy badge */}
          {currentView !== 'lumy' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setCurrentView('lumy')}
              className="flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/15 transition-all cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lumy</span>
            </motion.button>
          )}
        </motion.header>

        {/* Scrollable content */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: '80px' }}
          className="md:p-6 md:pb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav
        currentView={currentView}
        onViewChange={setCurrentView}
        onMenuOpen={() => setMenuOpen(true)}
      />
    </div>
  );
};
