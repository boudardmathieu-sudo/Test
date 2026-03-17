import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_MESSAGES = [
  "Initialisation du noyau LuminaOS...",
  "Chargement des modules système...",
  "Montage des systèmes de fichiers virtuels...",
  "Démarrage du gestionnaire de fenêtres...",
  "Connexion aux services cloud...",
  "Vérification de l'intégrité des données...",
  "Chargement de l'interface utilisateur...",
  "Préparation de l'environnement de bureau...",
  "Système prêt."
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds total boot time
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      
      setProgress(newProgress);
      
      // Update message based on progress
      const newMessageIndex = Math.min(
        Math.floor((newProgress / 100) * BOOT_MESSAGES.length),
        BOOT_MESSAGES.length - 1
      );
      setMessageIndex(newMessageIndex);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800); // Wait for fade out
        }, 400);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background ambient glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2] }}
            transition={{ duration: 2 }}
            className="absolute w-[40rem] h-[40rem] bg-rose-600/10 rounded-full blur-[100px]"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center z-10"
          >
            {/* Logo */}
            <div className="relative mb-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-rose-500 border-opacity-50 absolute -inset-4"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border-b-2 border-l-2 border-purple-500 border-opacity-50 absolute -inset-2"
              />
              <div className="text-5xl font-bold text-white tracking-tight flex items-center justify-center w-16 h-16">
                L<span className="text-rose-500 font-light">OS</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-white tracking-tight mb-12">
              Lumina<span className="text-rose-500 font-light">OS</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-80 h-1.5 bg-white/5 rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Glow effect on the progress bar */}
              <motion.div 
                className="absolute top-0 bottom-0 bg-white/50 blur-[2px]"
                style={{ left: `calc(${Math.min(progress, 100)}% - 10px)`, width: '20px' }}
              />
            </div>

            {/* Terminal-like text */}
            <div className="h-6 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-500 text-xs font-mono tracking-wider"
                >
                  {BOOT_MESSAGES[messageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-2 text-rose-500/50 text-[10px] font-mono">
              v2.0.4-stable
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
