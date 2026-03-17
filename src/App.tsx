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
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#060608' }}>
        <BootScreen onComplete={() => setIsBooting(false)} />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#060608' }}>
      <PetalBg />

      {!currentUser ? (
        <div style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}>
          <LoginScreen onLogin={(user) => setCurrentUser(user)} />
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 10, flex: 1, overflow: 'hidden' }}>
          <Dashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
        </div>
      )}
    </div>
  );
}
