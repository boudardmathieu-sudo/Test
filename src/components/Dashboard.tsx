import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const VIEW_LABELS: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Tableau de bord",    subtitle: "Aperçu de votre système" },
  server:    { title: "Serveur & Réseau",   subtitle: "Performances de l'infrastructure" },
  home:      { title: "Maison Connectée",   subtitle: "Contrôle des appareils intelligents" },
  settings:  { title: "Paramètres",         subtitle: "Préférences et utilisateurs" },
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bonjour";
  if (h >= 12 && h < 18) return "Bon après-midi";
  return "Bonsoir";
};

export const Dashboard = ({ currentUser, onLogout }: { currentUser: User; onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState("dashboard");

  const label = VIEW_LABELS[currentView] ?? VIEW_LABELS.dashboard;

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 gap-4 max-w-4xl">
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
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4 flex-shrink-0 border-b border-white/[0.04]"
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentView + "-title"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-xl font-semibold text-white tracking-tight"
              >
                {currentView === "dashboard"
                  ? `${getGreeting()}, ${currentUser.username}`
                  : label.title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentView + "-sub"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="text-gray-600 text-sm mt-0.5"
              >
                {currentView === "dashboard"
                  ? `${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}`
                  : label.subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Mobile logout */}
          <button
            onClick={onLogout}
            className="md:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-gray-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/8 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </motion.header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-5 pb-24 md:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
