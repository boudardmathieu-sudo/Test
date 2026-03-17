import React from "react";
import { motion } from "motion/react";

export const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    {children}
  </motion.div>
);
