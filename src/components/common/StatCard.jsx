import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subvalue,
  badge,
  accentColor = '#00FF85',
  progress,
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 border border-white/5 hover:border-white/15 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle top glow highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
        }}
      />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div
              className="p-2.5 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
          <span className="text-xs sm:text-sm font-medium text-neutral-400">
            {title}
          </span>
        </div>

        {badge && (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              border: `1px solid ${accentColor}30`
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2">
        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5">
          {value}
          {subvalue && (
            <span className="text-xs sm:text-sm font-normal text-neutral-400">
              {subvalue}
            </span>
          )}
        </div>

        {typeof progress === 'number' && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: accentColor }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-neutral-500 mt-1">
              <span>Прогресс</span>
              <span className="text-neutral-300 font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
