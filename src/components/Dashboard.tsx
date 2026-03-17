import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { ArcMenu } from "./ArcMenu";
import { User } from "../App";

const VIEW_META: Record<string, { title: string; subtitle: string }> = {
  dashboard:  { title: "Dashboard",        subtitle: "Aperçu de votre système" },
  server:     { title: "Serveur & Réseau",  subtitle: "Performances de l'infrastructure" },
  home:       { title: "Maison Connectée", subtitle: "Contrôle des appareils intelligents" },
  settings:   { title: "Paramètres",       subtitle: "Préférences et utilisateurs" },
  pomodoro:   { title: "Pomodoro",         subtitle: "Technique de concentration" },
  calculator: { title: "Calculette",       subtitle: "Calculs rapides" },
  habits:     { title: "Habitudes",        subtitle: "Suivi journalier" },
  tools:      { title: "Boîte à outils",   subtitle: "Utilitaires pratiques" },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
};

export const Dashboard = ({ currentUser, onLogout }: { currentUser: User; onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState("dashboard");

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
          <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full">
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
          <div className="flex justify-center">
            <HabitWidget />
          </div>
        );
      case "tools":
        return (
          <div className="flex justify-center">
            <ToolsWidget />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Top header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="flex-shrink-0 px-6 md:px-10 pt-6 pb-4 border-b border-white/[0.04]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {currentView === "dashboard"
                ? `${getGreeting()}, ${currentUser.username}`
                : meta.title}
            </h2>
            <p className="text-gray-600 text-sm mt-0.5">
              {currentView === "dashboard"
                ? new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                : meta.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-32">
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

      {/* Arc menu */}
      <ArcMenu
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
      />
    </div>
  );
};
