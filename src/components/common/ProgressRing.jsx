import React from 'react';
import { motion } from 'framer-motion';

export const ProgressRing = ({
  radius = 60,
  strokeWidth = 10,
  progress = 0, // 0 to 100
  color = '#00FF85',
  bgColor = '#1F1F28',
  children,
  className = '',
  glow = true
}) => {
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 overflow-visible"
      >
        <defs>
          <filter id={`glow-${color.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={color} floodOpacity="0.45" />
          </filter>
        </defs>
        {/* Background track */}
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated Progress Track */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          filter={glow ? `url(#glow-${color.replace('#', '')})` : undefined}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        {children}
      </div>
    </div>
  );
};
