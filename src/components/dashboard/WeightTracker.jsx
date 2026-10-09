import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, TrendingDown, TrendingUp, Plus, Target, Check } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const WeightTracker = () => {
  const { profile, weightHistory, addWeightEntry } = useFitness();
  const [newWeight, setNewWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentWeight = profile.weight || 78;
  const targetWeight = profile.targetWeight || 75;
  const startWeight = weightHistory?.[0]?.weight || currentWeight;
  const totalDiff = +(currentWeight - startWeight).toFixed(1);
  const remainingToGoal = Math.abs(+(currentWeight - targetWeight).toFixed(1));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;
    setIsSubmitting(true);
    addWeightEntry(newWeight);
    setNewWeight('');
    setTimeout(() => setIsSubmitting(false), 500);
  };

  // SVG Chart points calculation
  const history = weightHistory && weightHistory.length > 0 ? weightHistory : [
    { date: 'Старт', weight: currentWeight }
  ];

  const weights = history.map(h => h.weight);
  const minW = Math.min(...weights, targetWeight) - 1.5;
  const maxW = Math.max(...weights, targetWeight) + 1.5;
  const range = maxW - minW || 1;

  const chartWidth = 500;
  const chartHeight = 160;
  const paddingX = 30;
  const paddingY = 25;

  const points = history.map((item, index) => {
    const x = paddingX + (index / Math.max(1, history.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((item.weight - minW) / range) * (chartHeight - paddingY * 2);
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`;

  // Target line Y
  const targetY = chartHeight - paddingY - ((targetWeight - minW) / range) * (chartHeight - paddingY * 2);

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-6 border border-white/5 relative overflow-hidden h-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 flex-wrap h-auto">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-[#00FF85]" />
            <span>Трекер веса и динамика</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl font-black text-white">
              {currentWeight} <span className="text-sm font-bold text-neutral-400">кг</span>
            </span>
            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              totalDiff <= 0 ? 'bg-emerald-500/10 text-[#00FF85]' : 'bg-orange-500/10 text-[#FF5E00]'
            }`}>
              {totalDiff <= 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
              <span>{totalDiff > 0 ? `+${totalDiff}` : totalDiff} кг от старта</span>
            </div>
          </div>
        </div>

        {/* Quick Log Form */}
        <form onSubmit={handleAdd} className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <input
              type="number"
              step="0.1"
              placeholder="78.0"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-28 sm:w-32 bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
              кг
            </span>
          </div>
          <button
            type="submit"
            disabled={!newWeight || isSubmitting}
            className="px-3.5 py-2 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 disabled:opacity-40 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-neon-green transition-all"
          >
            {isSubmitting ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span className="hidden sm:inline">Внести</span>
          </button>
        </form>
      </div>

      {/* Target summary bar with responsive wrap and gap */}
      <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-3 md:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-4 text-xs h-auto w-full">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#FF5E00] shrink-0" />
            <span className="text-neutral-300 font-medium">
              Цель веса: <strong className="text-white font-bold">{targetWeight} кг</strong>
            </span>
          </div>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Scale className="w-3.5 h-3.5 text-[#00FF85] shrink-0" />
            <span>Текущий вес: <strong className="text-white font-bold">{currentWeight} кг</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 pt-1 md:pt-0 border-t md:border-t-0 border-white/5 w-full md:w-auto justify-between md:justify-end">
          <span>Осталось до цели:</span>
          <span className="text-[#00FF85] font-black px-2 py-0.5 rounded-md bg-[#00FF85]/10 border border-[#00FF85]/20">
            {remainingToGoal} кг
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-44 overflow-visible"
        >
          <defs>
            <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Target dotted line */}
          <line
            x1={paddingX}
            y1={targetY}
            x2={chartWidth - paddingX}
            y2={targetY}
            stroke="#FF5E00"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <text
            x={chartWidth - paddingX + 5}
            y={targetY + 4}
            fill="#FF5E00"
            fontSize="10"
            fontWeight="bold"
          >
            {targetWeight}
          </text>

          {/* Area gradient under line */}
          <path d={areaD} fill="url(#weightAreaGrad)" />

          {/* Smooth line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#00FF85"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#0A0A0C"
                stroke="#00FF85"
                strokeWidth="2.5"
                className="transition-transform group-hover:scale-150"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="9"
                fill="#00FF85"
                opacity="0.15"
                className="group-hover:opacity-40 transition-opacity"
              />
              {/* Tooltip on hover */}
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
                className="opacity-90 group-hover:opacity-100 drop-shadow"
              >
                {p.weight}
              </text>
              {/* Date label at bottom */}
              <text
                x={p.x}
                y={chartHeight - 2}
                textAnchor="middle"
                fill="#8E8EA0"
                fontSize="10"
              >
                {p.date}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
