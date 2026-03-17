import React, { useState } from "react";
import { PetalBg } from "./components/ui/PetalBg";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { BootScreen } from "./components/BootScreen";

export interface User {
  username: string;
  role: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#060608',
      overflow: 'hidden',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
    }}>
      <PetalBg />

      {!currentUser ? (
        <div style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <LoginScreen onLogin={(user) => setCurrentUser(user)} />
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 10, height: '100%' }}>
          <Dashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
        </div>
      )}
    </div>
  );
}
