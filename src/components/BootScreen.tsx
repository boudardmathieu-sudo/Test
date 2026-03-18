import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeafLogoFalling } from './ui/LeafLogo';

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'logo' | 'bar' | 'done'>('logo');
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('bar'), 1000));

    const progressStart = 1100;
    const progressDuration = 1400;
    const steps = 60;
    for (let s = 0; s <= steps; s++) {
      timers.push(
        setTimeout(
          () => setProgress(Math.round((s / steps) * 100)),
          progressStart + (progressDuration / steps) * s
        )
      );
    }

    timers.push(
      setTimeout(() => {
        setPhase('done');
        setExiting(true);
        setTimeout(onComplete, 700);
      }, 2700)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06060a]"
        >
          {/* Background glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.15, scale: 1.6 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-600 blur-[140px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 0.1, scale: 1.3 }}
              transition={{ duration: 3, delay: 0.4, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-700 blur-[120px]"
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  y: ['-5%', '110%'],
                  x: [`${10 + i * 11}%`, `${8 + i * 11 + (i % 2 === 0 ? 4 : -4)}%`],
                  rotate: [0, i % 2 === 0 ? 180 : -180],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  delay: 0.6 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                <svg width="10" height="12" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4 C24 4 38 14 38 26 C38 34.84 31.73 42 24 44 C16.27 42 10 34.84 10 26 C10 14 24 4 24 4Z"
                    fill={i % 2 === 0 ? '#f43f5e' : '#a855f7'}
                    opacity="0.7"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Leaf logo falling */}
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-6 rounded-full bg-rose-500/15 blur-2xl"
              />
              <LeafLogoFalling size={88} />
            </div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white tracking-tight">
                Lumina<span className="text-rose-400 font-light">OS</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-[11px] font-mono text-gray-600 tracking-[0.3em] uppercase mt-1.5"
              >
                Personal Dashboard
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <AnimatePresence>
              {phase === 'bar' || phase === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-48"
                >
                  <div className="h-[2px] w-full bg-white/[0.07] overflow-hidden rounded-full">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #be123c, #f43f5e, #a855f7)',
                        boxShadow: '0 0 12px rgba(244,63,94,0.7)',
                        transition: 'width 0.04s linear',
                      }}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-end mt-1.5"
                  >
                    <span className="text-[10px] font-mono text-rose-400/70">{progress}%</span>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
