import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SYSTEM_LOGS = [
  { text: 'LUMINA KERNEL 2.0.4 — Boot sequence initiated', status: 'info' },
  { text: 'Loading cryptographic modules', status: 'ok' },
  { text: 'Mounting encrypted filesystem', status: 'ok' },
  { text: 'Initializing FRIDAY Intelligence Core', status: 'info' },
  { text: 'Loading user memory database', status: 'ok' },
  { text: 'Analyzing behavioral patterns', status: 'ok' },
  { text: 'Starting network services', status: 'ok' },
  { text: 'FRIDAY v1.0 — Online', status: 'ready' },
];

function GlitchText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    let frame = 0;
    const total = text.length * 3;

    const t = setTimeout(() => {
      const iv = setInterval(() => {
        frame++;
        const progress = Math.min(frame / total, 1);
        const resolvedChars = Math.floor(progress * text.length);
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < resolvedChars) result += text[i];
          else if (i < resolvedChars + 3) result += chars[Math.floor(Math.random() * chars.length)];
          else result += ' ';
        }
        setDisplayed(result);
        if (frame >= total) {
          clearInterval(iv);
          setDisplayed(text);
          setGlitching(false);
        }
      }, 30);
    }, delay);

    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <span className="font-mono" style={{ letterSpacing: '0.05em' }}>
      {displayed || '\u00A0'}
    </span>
  );
}

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [logsShown, setLogsShown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [scanY, setScanY] = useState(-100);
  const [flashWhite, setFlashWhite] = useState(false);

  useEffect(() => {
    const seq = [
      [100,  () => setPhase(1)],   // scan line starts
      [400,  () => setPhase(2)],   // brackets appear
      [800,  () => setPhase(3)],   // logo reveals
      [1200, () => setPhase(4)],   // logs start
      [2800, () => setPhase(5)],   // progress bar
      [4000, () => setFlashWhite(true)],
      [4300, () => { setExiting(true); setTimeout(onComplete, 700); }],
    ] as [number, () => void][];

    const timers = seq.map(([ms, fn]) => setTimeout(fn, ms));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Scan line animation
  useEffect(() => {
    if (phase < 1) return;
    let y = -5;
    const iv = setInterval(() => {
      y += 3;
      setScanY(y);
      if (y > 110) clearInterval(iv);
    }, 10);
    return () => clearInterval(iv);
  }, [phase]);

  // Stagger logs
  useEffect(() => {
    if (phase < 4) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLogsShown(i);
      if (i >= SYSTEM_LOGS.length) clearInterval(iv);
    }, 180);
    return () => clearInterval(iv);
  }, [phase]);

  // Progress
  useEffect(() => {
    if (phase < 5) return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 1.4;
      });
    }, 16);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 bg-[#020204] overflow-hidden flex"
        >
          {/* Scanline sweep */}
          {phase >= 1 && (
            <motion.div
              className="absolute left-0 right-0 h-[2px] pointer-events-none z-30"
              style={{ top: `${scanY}%`, background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.8) 30%, rgba(244,63,94,1) 50%, rgba(244,63,94,0.8) 70%, transparent)' }}
            />
          )}

          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 4px)' }}
          />

          {/* White flash */}
          <AnimatePresence>
            {flashWhite && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white z-40 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Corner brackets */}
          {phase >= 2 && ['tl', 'tr', 'bl', 'br'].map((pos, i) => {
            const t = pos[0] === 't' ? 'top-5' : 'bottom-5';
            const l = pos[1] === 'l' ? 'left-5' : 'right-5';
            const bt = pos[0] === 't' ? 'border-t-2 border-l-2' : 'border-b-2 border-l-2';
            const lr = pos[1] === 'l' ? 'border-l-2' : 'border-r-2';
            const borders = pos[0] === 't' && pos[1] === 'l' ? 'border-t-2 border-l-2'
              : pos[0] === 't' && pos[1] === 'r' ? 'border-t-2 border-r-2'
              : pos[0] === 'b' && pos[1] === 'l' ? 'border-b-2 border-l-2'
              : 'border-b-2 border-r-2';
            return (
              <motion.div key={pos}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute ${t} ${l} w-7 h-7 ${borders} border-rose-500/70 z-20`}
              />
            );
          })}

          {/* Top bar */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="absolute top-5 left-16 right-16 flex items-center justify-between z-20"
            >
              <span className="text-[10px] font-mono text-rose-500/60 tracking-[0.2em] uppercase">LuminaOS Boot Manager</span>
              <span className="text-[10px] font-mono text-gray-700">{new Date().toISOString()}</span>
            </motion.div>
          )}

          {/* Left panel - Logo */}
          <div className="flex-1 flex flex-col items-center justify-center relative border-r border-white/[0.04]">
            {/* Radar background */}
            {phase >= 3 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0.2, 2], opacity: [0.15, 0] }}
                    transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute w-64 h-64 rounded-full border border-rose-500/30"
                  />
                ))}
              </div>
            )}

            {/* Logo */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Hexagonal logo mark */}
                <div className="relative mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-8"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 75%, rgba(244,63,94,0.9) 88%, transparent 100%)',
                      borderRadius: '50%',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-5"
                    style={{
                      background: 'conic-gradient(from 90deg, transparent 75%, rgba(139,92,246,0.7) 88%, transparent 100%)',
                      borderRadius: '50%',
                    }}
                  />
                  <motion.div
                    animate={{ boxShadow: ['0 0 20px rgba(244,63,94,0.3)', '0 0 60px rgba(244,63,94,0.6)', '0 0 20px rgba(244,63,94,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center bg-[#0a0a0f] border border-rose-500/30"
                  >
                    <span className="-rotate-45 text-2xl font-bold text-white tracking-tight">
                      L<span className="text-rose-400 font-light">OS</span>
                    </span>
                  </motion.div>
                </div>

                {/* Brand name glitch */}
                <div className="text-4xl font-bold text-white mb-1">
                  <GlitchText text="LUMINA" delay={100} />
                  <span className="text-rose-400 font-light ml-2">
                    <GlitchText text="OS" delay={500} />
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-600 tracking-[0.3em] uppercase mb-10">
                  Personal Dashboard System
                </div>

                {/* Progress */}
                {phase >= 5 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-72">
                    <div className="flex justify-between text-[10px] font-mono mb-2">
                      <span className="text-gray-600 tracking-widest">INITIALISATION</span>
                      <span className="text-rose-400">{Math.round(Math.min(progress, 100))}%</span>
                    </div>
                    <div className="h-[2px] bg-white/5 relative overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ width: `${Math.min(progress, 100)}%`, background: 'linear-gradient(90deg, #be123c, #f43f5e, #a855f7)', boxShadow: '0 0 10px rgba(244,63,94,0.7)' }}
                      />
                      {/* Shimmer */}
                      <motion.div
                        animate={{ x: ['-100%', '400%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </div>

                    {/* FRIDAY status */}
                    {progress >= 95 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.7, 1] }}
                        transition={{ duration: 0.4, times: [0, 0.3, 0.6, 1] }}
                        className="mt-5 text-center"
                      >
                        <span className="text-xs font-mono tracking-widest" style={{ color: '#fbbf24', textShadow: '0 0 15px rgba(251,191,36,0.5)' }}>
                          ◆ FRIDAY ONLINE ◆
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right panel - Terminal */}
          <div className="w-[380px] hidden md:flex flex-col justify-center p-10 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? 1 : 0 }}
              className="space-y-1"
            >
              <div className="text-[9px] font-mono text-gray-700 tracking-[0.25em] uppercase border-b border-white/[0.04] pb-3 mb-4 flex items-center justify-between">
                <span>FRIDAY — System Log</span>
                <span className="text-rose-500/40">SECURE CHANNEL</span>
              </div>

              {SYSTEM_LOGS.slice(0, logsShown).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 py-0.5"
                >
                  <span className={`text-[10px] font-mono flex-shrink-0 mt-0.5 ${
                    log.status === 'ok' ? 'text-emerald-400' :
                    log.status === 'ready' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {log.status === 'ok' ? '[OK]' : log.status === 'ready' ? '[◆]' : '[→]'}
                  </span>
                  <span className={`text-[11px] font-mono leading-relaxed ${
                    log.status === 'ready' ? 'text-amber-300' : 'text-gray-500'
                  }`}>
                    {log.text}
                  </span>
                </motion.div>
              ))}

              {logsShown < SYSTEM_LOGS.length && phase >= 4 && (
                <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-3 bg-rose-500 ml-10 mt-1"
                />
              )}
            </motion.div>

            {/* Bottom serial */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 0.3 : 0 }}
              className="absolute bottom-8 left-10 right-10"
            >
              <div className="text-[9px] font-mono text-gray-700 tracking-widest">
                SN: LUMINA-OS-{Math.random().toString(36).slice(2,10).toUpperCase()}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="absolute bottom-5 left-16 right-16 flex items-center justify-between z-20"
            >
              <span className="text-[10px] font-mono text-gray-700">v2.0.4-stable</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-gray-700">ALL SYSTEMS NOMINAL</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
