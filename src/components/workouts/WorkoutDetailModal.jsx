import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Flame, Zap, Dumbbell, Play, Shield, Check } from 'lucide-react';
import { findExerciseData } from '../../data/mockExercises';

export const WorkoutDetailModal = ({ workout, isOpen, onClose, onStart, onSelectExercise }) => {
  if (!isOpen || !workout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Image Cover */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on cover */}
          <div className="absolute bottom-4 left-4 right-4">
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${workout.accentColor || '#00FF85'}20`,
                color: workout.accentColor || '#00FF85',
                border: `1px solid ${workout.accentColor || '#00FF85'}40`
              }}
            >
              {workout.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {workout.title}
            </h3>
            <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
              {workout.subtitle}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="p-4 sm:p-6 pb-2 border-b border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold block">Время</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">{workout.durationMin} мин</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-[#FF5E00]" />
            <div>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold block">Калории</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">{workout.caloriesBurned} ккал</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-[#00FF85]" />
            <div>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold block">Опыт</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">+{workout.xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Exercises List (Scrollable) */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            План тренировки ({workout.exercises?.length || 0} упражнений)
          </h4>

          {workout.exercises?.map((ex, idx) => {
            const exData = findExerciseData(ex.name);
            const thumbUrl = exData?.image || exData?.phases?.[0]?.image;

            return (
              <div
                key={ex.id || idx}
                onClick={() => onSelectExercise && onSelectExercise(ex)}
                className="p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/60 dark:hover:bg-gray-900/90 border border-gray-200 dark:border-gray-700 hover:border-[#00FF85]/40 transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={ex.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200 dark:border-white/10 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 group-hover:bg-[#00FF85]/20 text-gray-500 dark:text-neutral-400 group-hover:text-[#00FF85] font-bold text-xs flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#00FF85] transition-colors truncate">
                      {ex.name}
                    </h5>
                    <span className="text-xs font-bold text-[#00FF85] shrink-0 ml-2">
                      {ex.sets} × {ex.reps}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>Фокус: <strong className="text-gray-900 dark:text-neutral-200">{ex.muscle}</strong></span>
                    <span className="text-[11px] text-[#00FF85] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Техника ➔
                    </span>
                  </div>
                  {ex.tip && (
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400 italic mt-1.5 border-t border-gray-200 dark:border-white/5 pt-1">
                      💡 {ex.tip}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-6 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-3 bg-gray-50 dark:bg-gray-800">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Уровень: <strong className="text-gray-900 dark:text-white">{workout.level}</strong>
          </div>
          <button
            onClick={() => {
              onClose();
              onStart(workout);
            }}
            className="px-6 py-3 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black text-sm flex items-center gap-2 shadow-neon-green transition-all"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Начать тренировку</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
