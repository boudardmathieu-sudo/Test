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
import { BottomNav } from "./BottomNav";
import { User } from "../App";

const VIEW_META: Record<string, { title: string; subtitle: string }> = {
  dashboard:  { title: "Dashboard",        subtitle: "Aperçu de votre système" },
  server:     { title: "Serveur & Réseau",  subtitle: "Infrastructure" },
  home:       { title: "Maison Connectée", subtitle: "Appareils connectés" },
  settings:   { title: "Paramètres",       subtitle: "Préférences" },
  pomodoro:   { title: "Pomodoro",         subtitle: "Focus & concentration" },
  calculator: { title: "Calculette",       subtitle: "Calculs rapides" },
  habits:     { title: "Habitudes",        subtitle: "Suivi journalier" },
  tools:      { title: "Outils",           subtitle: "Utilitaires" },
  lumy:       { title: "Lumy",             subtitle: "IA locale · Sans cloud" },
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
          <div className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
            <SystemStatsWidget currentUser={currentUser} />
            <NetworkMonitorWidget />
          </div>
        );
      case "home":
        return <SmartHomeWidget currentUser={currentUser} />;
      case "settings":
        return (
          <div className="flex flex-col gap-4">
            <SettingsWidget currentUser={currentUser} />
            {currentUser.role === "admin" && <DiscordBotWidget />}
          </div>
        );
      case "pomodoro":   return <PomodoroWidget />;
      case "calculator": return <CalculatorWidget />;
      case "habits":     return <HabitWidget />;
      case "tools":      return <ToolsWidget />;
      case "lumy":
        return (
          <div style={{ height: '100%' }}>
            <FridayWidget userName={currentUser.username} onNavigate={setCurrentView} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', width: '100%', overflow: 'hidden', background: '#060608' }}>

      {/* Full screen navigation menu */}
      <FullScreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userName={currentUser.username}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        style={{
          flexShrink: 0,
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0, letterSpacing: '-0.3px' }}>
              {currentView === "dashboard"
                ? `${getGreeting()}, ${currentUser.username}`
                : currentView === "lumy"
                ? <><span style={{ color: '#fbbf24' }}>Lumy</span></>
                : meta.title}
            </h2>
            <p style={{ fontSize: 12, color: '#4b5563', margin: '3px 0 0', lineHeight: 1 }}>
              {currentView === "dashboard"
                ? new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
                : meta.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {currentView !== 'lumy' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setCurrentView('lumy')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              borderRadius: 12,
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.2)',
              color: '#fbbf24',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            Lumy
          </motion.button>
        )}
      </motion.header>

      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 96px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <BottomNav
        currentView={currentView}
        onViewChange={setCurrentView}
        onMenuOpen={() => setMenuOpen(true)}
      />
    </div>
  );
};
