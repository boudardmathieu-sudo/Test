import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";
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
import { LumiWidget } from "./widgets/LumiWidget";
import { FullScreenMenu } from "./FullScreenMenu";
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
  lumi:       { title: "LUMI",             subtitle: "Votre IA personnelle — LuminaOS" },
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
      case "pomodoro":   return <div className="flex justify-center"><PomodoroWidget /></div>;
      case "calculator": return <div className="flex justify-center"><CalculatorWidget /></div>;
      case "habits":     return <div className="flex justify-center"><HabitWidget /></div>;
      case "tools":      return <div className="flex justify-center"><ToolsWidget /></div>;
      case "lumi":       return <LumiWidget userName={currentUser.username} />;
      default:           return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Full screen menu */}
      <FullScreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userName={currentUser.username}
      />

      {/* Top header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex-shrink-0 px-6 md:px-10 pt-6 pb-4 border-b border-white/[0.04] flex items-center gap-4"
      >
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white tracking-tight truncate">
                {currentView === "dashboard"
                  ? `${getGreeting()}, ${currentUser.username}`
                  : currentView === "lumi"
                  ? <><span className="text-amber-400">LUMI</span></>
                  : meta.title}
              </h2>
              <p className="text-gray-600 text-sm mt-0.5">
                {currentView === "dashboard"
                  ? new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                  : meta.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LUMI quick-access badge */}
        {currentView !== 'lumi' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setCurrentView('lumi')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/15 transition-all cursor-pointer flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            LUMI
          </motion.button>
        )}
      </motion.header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating LOS button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={() => setMenuOpen(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex items-center justify-center cursor-pointer"
        >
          {/* Pulsing glow ring */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-14 h-14 rounded-full bg-rose-500/30"
          />
          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center border-2 border-white/15 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <span className="text-sm font-bold text-white tracking-tight">
              L<span className="font-light opacity-75">OS</span>
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
