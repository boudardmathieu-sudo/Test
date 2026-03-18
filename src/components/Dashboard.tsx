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

const getGreeting = () => {
  const h = new Date().getHours();
  if (h >= 5 && h < 12)  return 'Bonjour';
  if (h >= 12 && h < 18) return 'Bon après-midi';
  return 'Bonsoir';
};

const SectionLabel = ({ label }: { label: string }) => (
  <div style={{ fontSize: 11, fontWeight: 500, color: '#4b5563', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8, marginBottom: 10 }}>
    {label}
  </div>
);

export const Dashboard = ({ currentUser, onLogout }: { currentUser: User; onLogout: () => void }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <HomeView currentUser={currentUser} />;
      case 'server':    return <ServerView currentUser={currentUser} />;
      case 'home':      return <SmartHomeWidget currentUser={currentUser} />;
      case 'settings':  return <SettingsView currentUser={currentUser} />;
      case 'pomodoro':  return <PomodoroWidget />;
      case 'calculator':return <CalculatorWidget />;
      case 'habits':    return <HabitWidget />;
      case 'tools':     return <ToolsWidget />;
      case 'lumy':      return <FridayWidget userName={currentUser.username} onNavigate={setCurrentView} />;
      default: return null;
    }
  };

  const VIEW_TITLE: Record<string, string> = {
    dashboard: `${getGreeting()}, ${currentUser.username}`,
    server:    'Serveur',
    home:      'Maison',
    settings:  'Paramètres',
    pomodoro:  'Pomodoro',
    calculator:'Calculette',
    habits:    'Habitudes',
    tools:     'Outils',
    lumy:      'Lumy',
  };

  const isLumy = currentView === 'lumy';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', width: '100%', overflow: 'hidden', background: '#060608' }}>

      <FullScreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        userName={currentUser.username}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
          >
            <div style={{ fontSize: isLumy ? 20 : 18, fontWeight: 700, color: isLumy ? '#fbbf24' : 'white', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
              {VIEW_TITLE[currentView] ?? currentView}
            </div>
            <div style={{ fontSize: 12, color: '#374151', marginTop: 3, lineHeight: 1 }}>
              {currentView === 'dashboard'
                ? new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                : currentView === 'lumy'
                ? 'Mémoire locale · Sans API'
                : ''}
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {currentView !== 'lumy' && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setCurrentView('lumy')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 12,
                background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)',
                color: '#fbbf24', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <Sparkles style={{ width: 13, height: 13 }} />
              Lumy
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        padding: isLumy ? 0 : '16px 16px 90px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            style={{ height: isLumy ? '100%' : undefined }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav currentView={currentView} onViewChange={setCurrentView} onMenuOpen={() => setMenuOpen(true)} />
    </div>
  );
};

/* ─── Sub-views ─── */

const HomeView = ({ currentUser }: { currentUser: User }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <ClockWidget />
    <WeatherWidget />
    <GoogleSearchWidget />
    <SpotifyWidget currentUser={currentUser} />
    <SectionLabel label="Tâches & Notes" />
    <TodoWidget />
    <NotepadWidget />
    <SectionLabel label="Liens & Actualités" />
    <QuickLinksWidget currentUser={currentUser} />
    <NewsWidget />
  </div>
);

const ServerView = ({ currentUser }: { currentUser: User }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <SystemStatsWidget currentUser={currentUser} />
    <NetworkMonitorWidget />
  </div>
);

const SettingsView = ({ currentUser }: { currentUser: User }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <SettingsWidget currentUser={currentUser} />
    {currentUser.role === 'admin' && <DiscordBotWidget />}
  </div>
);
