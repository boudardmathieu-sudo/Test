import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const Petal = ({ delay, duration, left, size }: { delay: number, duration: number, left: string, size: number }) => (
  <motion.div
    initial={{ y: -100, opacity: 0, rotate: 0, scale: size }}
    animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: 360 }}
    transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
    style={{ left }}
    className="absolute w-6 h-6 bg-gradient-to-br from-rose-400 to-red-600 rounded-tl-full rounded-br-full opacity-40 shadow-[0_0_15px_rgba(225,29,72,0.8)] pointer-events-none"
  />
);

export const PetalBg = () => {
  const [petals, setPetals] = useState<Array<{id: number, delay: number, duration: number, left: string, size: number}>>([]);
  
  useEffect(() => {
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 10,
      left: `${Math.random() * 100}%`,
      size: 0.3 + Math.random() * 0.6
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-rose-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[120px]" />
      {petals.map(p => <Petal key={p.id} {...p} />)}
    </div>
  );
};
