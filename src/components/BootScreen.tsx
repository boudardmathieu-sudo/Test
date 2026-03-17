import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'motion/react';

const LINES = [
  '> LUMINA KERNEL v2.0.4 loading...',
  '> Mounting virtual filesystems [OK]',
  '> Starting LUMI Intelligence Core [OK]',
  '> Securing encrypted channels [OK]',
  '> Loading UI compositor [OK]',
  '> Synchronizing cloud services [OK]',
  '> All systems nominal.',
];

function useTypewriter(text: string, speed = 28, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    const t = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [flash, setFlash] = useState(false);

  const title = useTypewriter('LuminaOS', 60, 900);

  useEffect(() => {
    // Phase sequencer
    const t0 = setTimeout(() => setPhase(1), 200);   // brackets
    const t1 = setTimeout(() => setPhase(2), 700);   // logo
    const t2 = setTimeout(() => setPhase(3), 1000);  // terminal lines start
    const t3 = setTimeout(() => setPhase(4), 2800);  // progress bar
    const t4 = setTimeout(() => setFlash(true), 4000); // flash
    const t5 = setTimeout(() => { setExiting(true); setTimeout(onComplete, 600); }, 4300);
    return () => [t0,t1,t2,t3,t4,t5].forEach(clearTimeout);
  }, [onComplete]);

  // Stagger terminal lines
  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= LINES.length) clearInterval(iv);
    }, 220);
    return () => clearInterval(iv);
  }, [phase]);

  // Progress bar
  useEffect(() => {
    if (phase < 4) return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 2;
      });
    }, 20);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
          className="fixed inset-0 z-50 bg-[#030305] overflow-hidden flex flex-col"
        >
          {/* Flash overlay */}
          <AnimatePresence>
            {flash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 bg-white z-20 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)',
            }}
          />

          {/* Corner brackets */}
          {phase >= 1 && ['top-6 left-6','top-6 right-6','bottom-6 left-6','bottom-6 right-6'].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
              className={`absolute ${pos} w-8 h-8 pointer-events-none`}
            >
              <div className={`absolute w-5 h-5 border-rose-500/60 ${
                i === 0 ? 'top-0 left-0 border-t border-l' :
                i === 1 ? 'top-0 right-0 border-t border-r' :
                i === 2 ? 'bottom-0 left-0 border-b border-l' :
                           'bottom-0 right-0 border-b border-r'
              }`} />
            </motion.div>
          ))}

          {/* Main content - split layout */}
          <div className="flex-1 flex flex-col md:flex-row">

            {/* Left: Logo section */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
              {/* Ambient glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-80 h-80 rounded-full bg-rose-600/20 blur-[80px]"
              />

              {/* Logo mark */}
              {phase >= 2 && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="relative mb-8 z-10"
                >
                  {/* Outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-6 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 70%, rgba(244,63,94,0.7) 85%, transparent 100%)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-3 rounded-full"
                    style={{
                      background: 'conic-gradient(from 180deg, transparent 70%, rgba(139,92,246,0.5) 85%, transparent 100%)',
                    }}
                  />

                  {/* Center hex */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl rotate-45 bg-gradient-to-br from-rose-500/20 to-violet-600/20 border border-rose-500/30"
                      style={{ boxShadow: '0 0 40px rgba(244,63,94,0.3)' }} />
                    <span className="relative text-3xl font-bold text-white tracking-tight z-10">
                      L<span className="text-rose-400 font-light">OS</span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Title */}
              {phase >= 2 && (
                <div className="z-10 text-center">
                  <div className="text-4xl font-semibold text-white tracking-tight h-12 flex items-center justify-center">
                    {title.displayed.slice(0, 6)}
                    <span className="text-rose-400 font-light">{title.displayed.slice(6)}</span>
                    {!title.done && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-0.5 w-0.5 h-9 bg-rose-400 inline-block align-middle"
                      />
                    )}
                  </div>
                  <div className="text-gray-600 text-xs font-mono tracking-widest uppercase mt-2">
                    v2.0.4 — Personal Dashboard
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 w-64 z-10"
                >
                  <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1.5">
                    <span>CHARGEMENT DU SYSTÈME</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #f43f5e, #a855f7)',
                        boxShadow: '0 0 8px rgba(244,63,94,0.6)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Terminal */}
            <div className="w-full md:w-[380px] flex flex-col justify-center p-8 md:border-l border-white/[0.04]">
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs space-y-2"
                >
                  <div className="text-gray-600 mb-4 text-[10px] tracking-widest uppercase border-b border-white/5 pb-3">
                    Lumina System Log
                  </div>
                  {LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-2"
                    >
                      <span className={line.includes('[OK]') ? 'text-emerald-400' : 'text-rose-400'}>
                        {line.includes('[OK]') ? '✓' : '>'}
                      </span>
                      <span className={line.includes('[OK]') ? 'text-gray-400' : 'text-gray-500'}>
                        {line.replace('[OK]', '').replace('> ', '')}
                        {line.includes('[OK]') && <span className="text-emerald-400 ml-1">[OK]</span>}
                      </span>
                    </motion.div>
                  ))}
                  {visibleLines < LINES.length && phase >= 3 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-2 h-3 bg-rose-400 ml-4"
                    />
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
