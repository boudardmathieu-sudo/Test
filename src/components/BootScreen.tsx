import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_MESSAGES = [
  "Initialisation du noyau LuminaOS...",
  "Chargement des modules système...",
  "Montage des systèmes de fichiers...",
  "Démarrage du gestionnaire de fenêtres...",
  "Connexion aux services cloud...",
  "Vérification de l'intégrité...",
  "Chargement de l'interface...",
  "Système prêt.",
];

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2800;
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
      setMessageIndex(Math.min(
        Math.floor((newProgress / 100) * BOOT_MESSAGES.length),
        BOOT_MESSAGES.length - 1
      ));

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-[#060608] flex flex-col items-center justify-center"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-600/20 blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 0.9, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/20 blur-[80px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Logo mark */}
            <div className="relative mb-10 flex items-center justify-center">
              {/* Rotating ring outer */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute w-[88px] h-[88px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, rgba(244,63,94,0.6) 80%, transparent 100%)",
                }}
              />
              {/* Rotating ring inner */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute w-[68px] h-[68px] rounded-full"
                style={{
                  background: "conic-gradient(from 180deg, transparent 60%, rgba(139,92,246,0.5) 80%, transparent 100%)",
                }}
              />
              {/* Center logo */}
              <div className="w-14 h-14 rounded-full bg-[#0c0c0f] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                <span className="text-xl font-bold text-white tracking-tight">
                  L<span className="text-rose-500 font-light">OS</span>
                </span>
              </div>
            </div>

            {/* Brand name */}
            <div className="text-4xl font-semibold text-white tracking-tight mb-1">
              Lumina<span className="text-rose-500 font-light">OS</span>
            </div>
            <div className="text-gray-600 text-xs font-mono tracking-widest uppercase mb-14">
              v2.0.4-stable
            </div>

            {/* Progress bar */}
            <div className="w-72 mb-5">
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-400 to-violet-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Status message */}
            <div className="h-5 flex items-center justify-center w-80">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 text-[11px] font-mono tracking-wide text-center"
                >
                  {BOOT_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
