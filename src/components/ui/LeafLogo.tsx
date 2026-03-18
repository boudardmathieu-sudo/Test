import React from 'react';
import { motion } from 'motion/react';

interface LeafLogoProps {
  size?: number;
  className?: string;
}

export const LeafLogo = ({ size = 48, className = '' }: LeafLogoProps) => {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      animate={{
        y: [0, 6, 0],
        rotate: [-4, 4, -4],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leafGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="55%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="leafGrad2" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
          <filter id="leafGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glow behind */}
        <ellipse cx="24" cy="26" rx="13" ry="16" fill="url(#leafGrad2)" filter="url(#leafGlow)" opacity="0.5" />

        {/* Main leaf shape */}
        <path
          d="M24 4 C24 4 38 14 38 26 C38 34.84 31.73 42 24 44 C16.27 42 10 34.84 10 26 C10 14 24 4 24 4Z"
          fill="url(#leafGrad)"
        />

        {/* Inner highlight */}
        <path
          d="M24 10 C24 10 33 18 33 26 C33 32 29.5 37.5 24 40 C18.5 37.5 15 32 15 26 C15 18 24 10 24 10Z"
          fill="white"
          opacity="0.08"
        />

        {/* Center vein */}
        <path
          d="M24 42 L24 14"
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Side veins */}
        <path
          d="M24 22 C20 20 16 21 14 23"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M24 22 C28 20 32 21 34 23"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M24 30 C20 28 16 29 13 31"
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path
          d="M24 30 C28 28 32 29 35 31"
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Stem */}
        <path
          d="M24 44 C24 44 22 46 20 47"
          stroke="url(#leafGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
};

export const LeafLogoFalling = ({ size = 96 }: { size?: number }) => {
  return (
    <motion.div
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ y: -40, opacity: 0, rotate: -15 }}
      animate={{
        y: [null, 0],
        opacity: [null, 1],
        rotate: [-15, 8, -5, 3, 0],
      }}
      transition={{
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1],
        rotate: { duration: 1.4, ease: 'easeOut' },
      }}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.4,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="leafGradFall" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="55%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="leafGrad2Fall" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <ellipse cx="24" cy="26" rx="14" ry="17" fill="url(#leafGrad2Fall)" opacity="0.4" style={{ filter: 'blur(4px)' }} />

          <path
            d="M24 4 C24 4 38 14 38 26 C38 34.84 31.73 42 24 44 C16.27 42 10 34.84 10 26 C10 14 24 4 24 4Z"
            fill="url(#leafGradFall)"
          />

          <path
            d="M24 10 C24 10 33 18 33 26 C33 32 29.5 37.5 24 40 C18.5 37.5 15 32 15 26 C15 18 24 10 24 10Z"
            fill="white"
            opacity="0.1"
          />

          <path d="M24 42 L24 14" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M24 22 C20 20 16 21 14 23" stroke="white" strokeOpacity="0.2" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M24 22 C28 20 32 21 34 23" stroke="white" strokeOpacity="0.2" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M24 30 C20 28 16 29 13 31" stroke="white" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M24 30 C28 28 32 29 35 31" stroke="white" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M24 44 C24 44 22 46 20 47" stroke="url(#leafGradFall)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
