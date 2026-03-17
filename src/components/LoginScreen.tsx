import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, User, ArrowRight } from "lucide-react";
import { User as UserType } from "../App";

export const LoginScreen = ({ onLogin }: { onLogin: (u: UserType) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/users');
      const storedUsers = await res.json();
      const user = storedUsers.find((u: any) => u.username === username && u.password === password);

      if (user) {
        onLogin({ username: user.username, role: user.role });
      } else {
        setError("Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="z-10 w-full max-w-md px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Lumina<span className="text-rose-500 font-light">OS</span></h1>
          <p className="text-gray-400 text-sm">Connectez-vous pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
              placeholder="Nom d'utilisateur"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all"
              placeholder="Mot de passe"
            />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 text-sm text-center">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium py-3.5 rounded-2xl shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            Se connecter
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
