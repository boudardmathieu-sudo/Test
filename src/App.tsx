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

  return (
    <div className="min-h-screen bg-[#060608] overflow-x-hidden relative font-sans">
      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      {!isBooting && (
        <>
          <PetalBg />
          <div className="relative z-10 min-h-screen flex flex-col">
            {!currentUser ? (
              <div className="flex-1 flex items-center justify-center p-4">
                <LoginScreen onLogin={(user) => setCurrentUser(user)} />
              </div>
            ) : (
              <div className="h-screen overflow-hidden">
                <Dashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
