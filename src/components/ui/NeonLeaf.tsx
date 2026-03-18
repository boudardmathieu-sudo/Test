import React from 'react';
import { motion } from 'motion/react';

interface NeonLeafProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Logo SVG Feuille Néon
 * - Intérieur transparent (fill="none")
 * - Contours verts brillants avec effet néon
 * - Utilise des filtres SVG drop-shadow pour l'effet néon
 */
export const NeonLeaf = ({ size = 80, className = '', animated = true }: NeonLeafProps) => {
  const leafPath = "M40 10 C40 10 70 25 70 50 C70 65 58 80 40 85 C22 80 10 65 10 50 C10 25 40 10 40 10Z";
  const stemPath = "M40 85 L40 95";
  const veinCenter = "M40 85 L40 30";
  const veinLeft1 = "M40 40 C32 37 24 38 18 42";
  const veinLeft2 = "M40 52 C32 49 22 50 15 55";
  const veinLeft3 = "M40 65 C33 62 26 63 21 66";
  const veinRight1 = "M40 40 C48 37 56 38 62 42";
  const veinRight2 = "M40 52 C48 49 58 50 65 55";
  const veinRight3 = "M40 65 C47 62 54 63 59 66";

  const leafContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Filtre néon vert brillant - Glow externe */}
        <filter id={`neon-glow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur3" />
          <feMerge>
            <feMergeNode in="blur3" />
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient vert néon */}
        <linearGradient id={`neon-gradient-${size}`} x1="10" y1="10" x2="70" y2="85">
          <stop offset="0%" stopColor="#00ff88" />
          <stop offset="50%" stopColor="#00ff66" />
          <stop offset="100%" stopColor="#00cc55" />
        </linearGradient>
      </defs>

      {/* Glow d'ambiance (halo large) */}
      <ellipse
        cx="40"
        cy="50"
        rx="25"
        ry="30"
        fill="#00ff88"
        opacity="0.15"
        style={{ filter: 'blur(12px)' }}
      />

      {/* Contour principal de la feuille - TRANSPARENT à l'intérieur */}
      <path
        d={leafPath}
        fill="none"
        stroke={`url(#neon-gradient-${size})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#neon-glow-${size})`}
      />

      {/* Nervure centrale */}
      <path
        d={veinCenter}
        fill="none"
        stroke="#00ff88"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
        filter={`url(#neon-glow-${size})`}
      />

      {/* Nervures gauches */}
      <path
        d={veinLeft1}
        fill="none"
        stroke="#00ff88"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.6"
        filter={`url(#neon-glow-${size})`}
      />
      <path
        d={veinLeft2}
        fill="none"
        stroke="#00ff88"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.5"
        filter={`url(#neon-glow-${size})`}
      />
      <path
        d={veinLeft3}
        fill="none"
        stroke="#00ff88"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.4"
        filter={`url(#neon-glow-${size})`}
      />

      {/* Nervures droites */}
      <path
        d={veinRight1}
        fill="none"
        stroke="#00ff88"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.6"
        filter={`url(#neon-glow-${size})`}
      />
      <path
        d={veinRight2}
        fill="none"
        stroke="#00ff88"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.5"
        filter={`url(#neon-glow-${size})`}
      />
      <path
        d={veinRight3}
        fill="none"
        stroke="#00ff88"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.4"
        filter={`url(#neon-glow-${size})`}
      />

      {/* Tige */}
      <path
        d={stemPath}
        fill="none"
        stroke="#00ff88"
        strokeWidth="2"
        strokeLinecap="round"
        filter={`url(#neon-glow-${size})`}
      />
    </svg>
  );

  if (!animated) {
    return <div style={{ width: size, height: size }}>{leafContent}</div>;
  }

  return (
    <motion.div
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      animate={{
        y: [0, -5, 0],
        rotate: [-3, 3, -3]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {leafContent}
    </motion.div>
  );
};

/**
 * Logo Néon avec animation de chute
 * Utilisé pour l'écran de boot
 */
export const NeonLeafFalling = ({ size = 100 }: { size?: number }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      initial={{
        y: -200,
        opacity: 0,
        rotate: -45,
        scale: 0.5
      }}
      animate={{
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1
      }}
      transition={{
        duration: 1.5,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [-4, 4, -4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      >
        <NeonLeaf size={size} animated={false} />
      </motion.div>
    </motion.div>
  );
};
