import React from 'react';
import { motion } from 'motion/react';

interface LeafLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const LeafLogo = ({ size = 32, className = '', glow = false }: LeafLogoProps) => {
  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`lg-${size}`} x1="6" y1="2" x2="34" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          {glow && (
            <filter id={`gf-${size}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        {/* Glow layer */}
        {glow && (
          <ellipse cx="20" cy="26" rx="13" ry="16" fill="#f43f5e" opacity="0.2" filter={`url(#gf-${size})`} />
        )}

        {/* Main leaf body */}
        <path
          d="M20 2 C20 2 34 11 34 23 C34 31.8 27.7 39 20 41 C12.3 39 6 31.8 6 23 C6 11 20 2 20 2Z"
          fill={`url(#lg-${size})`}
        />

        {/* Specular highlight */}
        <path
          d="M20 7 C20 7 29 14 29 23 C29 29.5 25.5 35 20 37.5 C14.5 35 11 29.5 11 23 C11 14 20 7 20 7Z"
          fill="white"
          opacity="0.09"
        />

        {/* Center vein */}
        <path d="M20 40 L20 11" stroke="white" strokeOpacity="0.28" strokeWidth="1.1" strokeLinecap="round" />

        {/* Left veins */}
        <path d="M20 19 C17 17.5 13.5 18 11.5 20" stroke="white" strokeOpacity="0.2" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 26 C17 24.5 13 25 10.5 27" stroke="white" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M20 33 C17.5 31.5 14.5 32 12.5 33.5" stroke="white" strokeOpacity="0.12" strokeWidth="0.7" strokeLinecap="round" />

        {/* Right veins */}
        <path d="M20 19 C23 17.5 26.5 18 28.5 20" stroke="white" strokeOpacity="0.2" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M20 26 C23 24.5 27 25 29.5 27" stroke="white" strokeOpacity="0.16" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M20 33 C22.5 31.5 25.5 32 27.5 33.5" stroke="white" strokeOpacity="0.12" strokeWidth="0.7" strokeLinecap="round" />

        {/* Stem */}
        <path d="M20 41 C20 41 18.5 43.5 17 45" stroke="#f43f5e" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

export const LeafLogoFalling = ({ size = 80 }: { size?: number }) => {
  return (
    <motion.div
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ y: -50, opacity: 0, rotate: -20, scale: 0.7 }}
      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <svg width={size} height={size} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lgf-main" x1="6" y1="2" x2="34" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>

          <ellipse cx="20" cy="26" rx="14" ry="17" fill="#f43f5e" opacity="0.15" style={{ filter: 'blur(6px)' }} />

          <path
            d="M20 2 C20 2 34 11 34 23 C34 31.8 27.7 39 20 41 C12.3 39 6 31.8 6 23 C6 11 20 2 20 2Z"
            fill="url(#lgf-main)"
          />

          <path
            d="M20 7 C20 7 29 14 29 23 C29 29.5 25.5 35 20 37.5 C14.5 35 11 29.5 11 23 C11 14 20 7 20 7Z"
            fill="white" opacity="0.1"
          />

          <path d="M20 40 L20 11" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M20 19 C17 17.5 13.5 18 11.5 20" stroke="white" strokeOpacity="0.22" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M20 26 C17 24.5 13 25 10.5 27" stroke="white" strokeOpacity="0.17" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M20 33 C17.5 31.5 14.5 32 12.5 33.5" stroke="white" strokeOpacity="0.13" strokeWidth="0.7" strokeLinecap="round" />
          <path d="M20 19 C23 17.5 26.5 18 28.5 20" stroke="white" strokeOpacity="0.22" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M20 26 C23 24.5 27 25 29.5 27" stroke="white" strokeOpacity="0.17" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M20 33 C22.5 31.5 25.5 32 27.5 33.5" stroke="white" strokeOpacity="0.13" strokeWidth="0.7" strokeLinecap="round" />
          <path d="M20 41 C20 41 18.5 43.5 17 45" stroke="#f43f5e" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
