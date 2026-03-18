import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NeonLeafFalling } from './ui/NeonLeaf';

const TITLE = 'Vibe Panel';

const RING_R = 72;
const RING_STROKE = 2.5;
const RING_CIRC = 2 * Math.PI * RING_R;

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  // phase 0 = ring drawing
  // phase 1 = leaf + title appear
  // phase 2 = progress ring fills
  // phase 3 = exit
  const [typedCount, setTypedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 0→1: ring finishes drawing, leaf appears
    timers.push(setTimeout(() => setPhase(1), 800));

    // Typewriter
    TITLE.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setTypedCount(i + 1), 900 + i * 80));
    });

    // Phase 1→2: start filling progress
    timers.push(setTimeout(() => setPhase(2), 1000));

    // Progress fill
    const pStart = 1100;
    const pDur = 1400;
    const steps = 60;
    for (let s = 0; s <= steps; s++) {
      timers.push(
        setTimeout(
          () => setProgress(Math.round((s / steps) * 100)),
          pStart + (pDur / steps) * s
        )
      );
    }

    // Phase 2→3: exit
    timers.push(setTimeout(() => {
      setPhase(3);
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 2700));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Ring dashoffset calculation
  const ringDrawOffset = phase >= 1 ? 0 : RING_CIRC;
  const progressOffset = RING_CIRC - (RING_CIRC * progress) / 100;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06060a] overflow-hidden"
        >
          {/* Ambient glows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.8, opacity: 0.12 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rose-600 blur-[160px]"
            />
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.08 }}
              transition={{ duration: 3.5, delay: 0.3, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-700 blur-[130px]"
            />
          </motion.div>

          {/* Falling mini leaves in background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: '12%',  d: 0.5,  sz: 8,  dur: 4.5 },
              { x: '25%',  d: 0.9,  sz: 6,  dur: 5.2 },
              { x: '40%',  d: 1.3,  sz: 10, dur: 4.0 },
              { x: '58%',  d: 0.6,  sz: 7,  dur: 5.8 },
              { x: '72%',  d: 1.0,  sz: 9,  dur: 4.3 },
              { x: '85%',  d: 0.4,  sz: 6,  dur: 5.5 },
              { x: '7%',   d: 1.5,  sz: 8,  dur: 6.0 },
              { x: '92%',  d: 0.8,  sz: 7,  dur: 4.7 },
            ].map((leaf, i) => (
              <motion.div
                key={i}
                initial={{ y: '-8%', opacity: 0, rotate: -20 }}
                animate={{
                  y: '115%',
                  opacity: [0, 0.35, 0.35, 0],
                  rotate: i % 2 === 0 ? 140 : -140,
                  x: [0, i % 2 === 0 ? 18 : -18, 0],
                }}
                transition={{
                  duration: leaf.dur,
                  delay: leaf.d,
                  repeat: Infinity,
                  ease: 'easeIn',
                }}
                style={{ position: 'absolute', top: 0, left: leaf.x }}
              >
                <svg width={leaf.sz} height={leaf.sz * 1.2} viewBox="0 0 48 58" fill="none">
                  <path
                    d="M24 4 C24 4 38 14 38 26 C38 34.84 31.73 42 24 44 C16.27 42 10 34.84 10 26 C10 14 24 4 24 4Z"
                    fill={i % 3 === 0 ? '#f43f5e' : i % 3 === 1 ? '#a855f7' : '#c026d3'}
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Main circle + logo */}
          <div className="relative z-10 flex flex-col items-center gap-7">

            {/* SVG ring + leaf */}
            <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
              >
                {/* Track ring */}
                <circle
                  cx="90" cy="90" r={RING_R}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={RING_STROKE}
                />

                {/* Drawing ring (appears first) */}
                <motion.circle
                  cx="90" cy="90" r={RING_R}
                  fill="none"
                  stroke="rgba(244,63,94,0.25)"
                  strokeWidth={RING_STROKE}
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRC}
                  initial={{ strokeDashoffset: RING_CIRC }}
                  animate={{ strokeDashoffset: ringDrawOffset }}
                  transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Progress ring */}
                {phase >= 2 && (
                  <motion.circle
                    cx="90" cy="90" r={RING_R}
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth={RING_STROKE + 1}
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRC}
                    initial={{ strokeDashoffset: RING_CIRC }}
                    animate={{ strokeDashoffset: progressOffset }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.8))' }}
                  />
                )}

                {/* Gradient definition */}
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#be123c" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Neon Leaf inside ring */}
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -15 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10"
                  >
                    <NeonLeafFalling size={72} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress % in center */}
              <AnimatePresence>
                {phase >= 2 && progress < 100 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-6 left-0 right-0 flex justify-center"
                  >
                    <span className="text-[10px] font-mono text-rose-400/60">{progress}%</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Title typewriter */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white tracking-tight h-8 flex items-center justify-center">
                    {TITLE.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: i < typedCount ? 1 : 0, y: i < typedCount ? 0 : 6 }}
                        transition={{ duration: 0.15 }}
                        style={{ color: i >= 6 ? '#fb7185' : 'white', fontWeight: i >= 6 ? 300 : 700 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: typedCount < TITLE.length ? [1, 0, 1] : 0 }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="ml-0.5 text-rose-400 font-thin"
                    >
                      |
                    </motion.span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="text-[10px] font-mono text-gray-600 tracking-[0.3em] uppercase mt-1.5"
                  >
                    Personal Dashboard
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
