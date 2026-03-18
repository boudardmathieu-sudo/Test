import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TITLE_1 = 'Lumina';
const TITLE_2 = 'OS';
const SUBTITLE = 'Powered by Lumi · Personal Intelligence';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

function useGlitch(target: string, active: boolean, duration = 600) {
  const [display, setDisplay] = useState(target);
  const frame = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) { setDisplay(target); return; }
    let iteration = 0;
    const maxIter = Math.ceil(duration / 40);
    const run = () => {
      setDisplay(
        target.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration / maxIter * target.length) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('')
      );
      iteration++;
      if (iteration <= maxIter) frame.current = setTimeout(run, 40);
      else setDisplay(target);
    };
    run();
    return () => { if (frame.current) clearTimeout(frame.current); };
  }, [active, target, duration]);

  return display;
}

const SCAN_LINES = Array.from({ length: 12 });
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  angle: (i / 24) * Math.PI * 2,
  dist: 90 + Math.random() * 80,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 0.3,
  dur: 0.6 + Math.random() * 0.4,
}));

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanFlash, setScanFlash] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const title1Display = useGlitch(TITLE_1, glitchActive, 700);
  const title2Display = useGlitch(TITLE_2, glitchActive, 400);

  const BOOT_SEQUENCE = [
    '> Initializing LuminaOS kernel...',
    '> Loading neural interface... OK',
    '> Connecting Lumi AI engine... OK',
    '> Mounting personal workspace... OK',
    '> All systems nominal.',
  ];

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];

    t.push(setTimeout(() => { setPhase(1); setGlitchActive(true); setScanFlash(true); }, 300));
    t.push(setTimeout(() => { setGlitchActive(false); setScanFlash(false); }, 1100));

    t.push(setTimeout(() => setPhase(2), 1200));

    BOOT_SEQUENCE.forEach((line, i) => {
      t.push(setTimeout(() => setBootLines(prev => [...prev, line]), 1300 + i * 260));
    });

    const pStart = 1400;
    const pDur = 1600;
    const steps = 80;
    for (let s = 0; s <= steps; s++) {
      t.push(setTimeout(() => setProgress(Math.round((s / steps) * 100)), pStart + (pDur / steps) * s));
    }

    t.push(setTimeout(() => { setGlitchActive(true); }, 2900));
    t.push(setTimeout(() => { setGlitchActive(false); }, 3300));

    t.push(setTimeout(() => { setPhase(3); setExiting(true); setTimeout(onComplete, 700); }, 3500));

    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(24px)' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#06060a', overflow: 'hidden',
          }}
        >
          {/* CRT scan line overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          }} />

          {/* Flash on glitch */}
          <AnimatePresence>
            {scanFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.18, 0, 0.12, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f43f5e44, #a855f744)', zIndex: 4, pointerEvents: 'none' }}
              />
            )}
          </AnimatePresence>

          {/* Animated background grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.07 : 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `linear-gradient(rgba(244,63,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Big ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: phase >= 1 ? 0.18 : 0, scale: phase >= 1 ? 2 : 0.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute', width: 600, height: 600,
              borderRadius: '50%', background: 'radial-gradient(circle, #f43f5e 0%, #a855f7 50%, transparent 70%)',
              filter: 'blur(80px)', pointerEvents: 'none',
            }}
          />

          {/* Second glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.13, 0.06] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: 400, height: 400,
              borderRadius: '50%', background: 'radial-gradient(circle, #a855f7, transparent 70%)',
              filter: 'blur(60px)', pointerEvents: 'none',
            }}
          />

          {/* Scan lines shooting through */}
          {phase >= 1 && SCAN_LINES.map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: '-110%', opacity: 0 }}
              animate={{ x: '110%', opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.6 + Math.random() * 0.4, delay: 0.3 + i * 0.06, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: `${5 + i * 8}%`,
                left: 0, right: 0,
                height: 1,
                background: i % 3 === 0 ? 'rgba(244,63,94,0.7)' : i % 3 === 1 ? 'rgba(168,85,247,0.6)' : 'rgba(255,255,255,0.3)',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Burst particles */}
          {phase >= 1 && PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(p.angle) * p.dist,
                y: Math.sin(p.angle) * p.dist,
                opacity: [0, 1, 0],
                scale: [0, 1.4, 0],
              }}
              transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: p.size, height: p.size,
                borderRadius: '50%',
                background: i % 3 === 0 ? '#f43f5e' : i % 3 === 1 ? '#a855f7' : '#fb923c',
                boxShadow: `0 0 6px 2px ${i % 3 === 0 ? '#f43f5e' : i % 3 === 1 ? '#a855f7' : '#fb923c'}`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Central logo area */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

            {/* Logo hex ring */}
            <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <defs>
                    <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="70" r="62" fill="none" stroke="url(#outerGrad)"
                    strokeWidth="1.5" strokeDasharray="12 8" strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 6px #f43f5e)' }} />
                </svg>
              </motion.div>

              {/* Counter-rotating inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 12 }}
              >
                <svg width="116" height="116" viewBox="0 0 116 116">
                  <circle cx="58" cy="58" r="50" fill="none" stroke="rgba(168,85,247,0.4)"
                    strokeWidth="1" strokeDasharray="4 12" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Progress arc */}
              {phase >= 2 && (
                <svg width="140" height="140" viewBox="0 0 140 140"
                  style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                  <defs>
                    <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#be123c" />
                      <stop offset="50%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <motion.circle
                    cx="70" cy="70" r="62"
                    fill="none" stroke="url(#progGrad)" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 62}
                    initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 62 * (1 - progress / 100) }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(244,63,94,0.9))' }}
                  />
                </svg>
              )}

              {/* Center "L" mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.4 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'linear-gradient(135deg, #f43f5e22, #a855f722)',
                  border: '1px solid rgba(244,63,94,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(244,63,94,0.3), inset 0 0 16px rgba(168,85,247,0.1)',
                }}>
                  <motion.span
                    animate={glitchActive ? {
                      x: [0, -3, 3, -2, 0],
                      filter: ['none', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'none'],
                    } : { x: 0 }}
                    transition={{ duration: 0.15, repeat: glitchActive ? Infinity : 0 }}
                    style={{
                      fontSize: 28, fontWeight: 900, fontFamily: 'monospace',
                      background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      letterSpacing: '-2px',
                    }}
                  >
                    L
                  </motion.span>
                </div>
              </motion.div>
            </div>

            {/* Title */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'center' }}>
                    <motion.span
                      animate={glitchActive ? { x: [0, -2, 2, -1, 0], opacity: [1, 0.7, 1] } : { x: 0 }}
                      transition={{ duration: 0.1, repeat: glitchActive ? Infinity : 0 }}
                      style={{
                        fontSize: 36, fontWeight: 900, letterSpacing: '-1px',
                        background: 'linear-gradient(135deg, #fff 0%, #f1f5f9 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                        fontFamily: 'system-ui, sans-serif',
                      }}
                    >
                      {title1Display}
                    </motion.span>
                    <motion.span
                      animate={glitchActive ? { x: [0, 2, -2, 1, 0], opacity: [1, 0.6, 1] } : { x: 0 }}
                      transition={{ duration: 0.1, repeat: glitchActive ? Infinity : 0, delay: 0.05 }}
                      style={{
                        fontSize: 36, fontWeight: 300, letterSpacing: '2px',
                        background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        fontFamily: 'system-ui, sans-serif',
                      }}
                    >
                      {title2Display}
                    </motion.span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    style={{
                      height: 1, margin: '6px auto 8px',
                      background: 'linear-gradient(90deg, transparent, #f43f5e, #a855f7, transparent)',
                      width: 180,
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    style={{
                      fontSize: 10, fontFamily: 'monospace',
                      color: 'rgba(168,85,247,0.6)',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                    }}
                  >
                    {SUBTITLE}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Boot log terminal */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 300, fontFamily: 'monospace', fontSize: 10,
                    color: 'rgba(255,255,255,0.35)',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(244,63,94,0.12)',
                    borderRadius: 8, padding: '10px 14px',
                    display: 'flex', flexDirection: 'column', gap: 3,
                  }}
                >
                  {bootLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        color: line.includes('OK') ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}
                  {bootLines.length < BOOT_SEQUENCE.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ color: '#f43f5e' }}
                    >
                      ▋
                    </motion.span>
                  )}

                  {/* Progress bar */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: 'rgba(255,255,255,0.25)' }}>
                      <span>BOOT</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05 }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #f43f5e, #a855f7)',
                          borderRadius: 2,
                          boxShadow: '0 0 8px rgba(244,63,94,0.8)',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
