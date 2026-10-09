import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Flame, 
  Zap, 
  Timer, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Info,
  Video
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { findExerciseData } from '../../data/mockExercises';
import { ExerciseDemoModal } from './ExerciseDemoModal';

export const ActiveWorkoutPlayer = ({ workout, onClose }) => {
  const { finishWorkout } = useFitness();
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Rest timer
  const [restSecondsLeft, setRestSecondsLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const exercises = workout?.exercises || [];
  const currentExercise = exercises[currentExIndex];

  // Workout duration timer
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Rest timer countdown
  useEffect(() => {
    let restInterval = null;
    if (isResting && restSecondsLeft > 0) {
      restInterval = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isResting, restSecondsLeft]);

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startRest = (sec = 60) => {
    setRestSecondsLeft(sec);
    setIsResting(true);
  };

  const handleFinish = () => {
    finishWorkout({
      id: workout.id,
      title: workout.title,
      durationMin: Math.max(1, Math.round(secondsElapsed / 60)),
      caloriesBurned: workout.caloriesBurned || 300,
      xpReward: workout.xpReward || 150
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl bg-[#121217] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-24 right-0 w-80 h-80 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00FF85] px-2 py-0.5 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30">
              {workout.category || 'Тренировка'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1 truncate">
              {workout.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
            title="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workout Timer Display */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 flex flex-col items-center justify-center relative">
          <div className="text-5xl sm:text-6xl font-black text-white tracking-widest font-mono">
            {formatTime(secondsElapsed)}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400 font-semibold">
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-[#FF5E00]" />
              ~{Math.round(((secondsElapsed / 60) * (workout.caloriesBurned / (workout.durationMin || 30))))} ккал
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-[#00FF85]" />
              +{workout.xpReward} XP
            </span>
          </div>

          {/* Pause / Resume Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-[#00FF85] text-black shadow-neon-green font-bold'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-black" />}
            </button>
            <button
              onClick={() => setSecondsElapsed(0)}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
              title="Сбросить время"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Rest Timer Box (If active) */}
        {isResting && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-2xl bg-[#FF5E00]/15 border border-[#FF5E00]/40 flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Timer className="w-5 h-5 text-[#FF5E00] animate-spin" style={{ animationDuration: '4s' }} />
              <div>
                <span className="text-xs font-bold text-[#FF5E00] uppercase">Отдых между подходами</span>
                <p className="text-xs text-neutral-300">Восстанови дыхание и пульс</p>
              </div>
            </div>
            <div className="text-2xl font-mono font-black text-white">
              {restSecondsLeft}с
            </div>
          </motion.div>
        )}

        {/* Current Exercise Card */}
        {currentExercise && (
          <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl bg-[#1A1A24] border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-400">
                Упражнение {currentExIndex + 1} из {exercises.length}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {currentExercise.muscle}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="text-lg sm:text-xl font-black text-white">
                {currentExercise.name}
              </h4>
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-2.5 py-1 rounded-xl bg-[#00FF85]/15 hover:bg-[#00FF85]/25 text-[#00FF85] border border-[#00FF85]/30 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Техника</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2.5 rounded-xl bg-white/5 text-center">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Подходы</span>
                <span className="text-base font-black text-[#00FF85]">{currentExercise.sets}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 text-center">
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Повторы / Время</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">{currentExercise.reps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 text-center cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => startRest(currentExercise.restSeconds || 60)}
              >
                <span className="text-[10px] text-neutral-400 uppercase font-bold block">Отдых</span>
                <span className="text-xs sm:text-sm font-bold text-[#FF5E00]">{currentExercise.restSeconds || 60}с (старт)</span>
              </div>
            </div>

            {currentExercise.tip && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-neutral-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#00FF85] shrink-0 mt-0.5" />
                <span><strong>Совет по технике:</strong> {currentExercise.tip}</span>
              </div>
            )}
          </div>
        )}

        {/* Bottom controls: Previous, Next, and FINISH WORKOUT */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCurrentExIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentExIndex === 0}
              className="flex-1 sm:flex-none p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-neutral-300 font-bold text-xs flex items-center justify-center gap-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
            <button
              onClick={() => setCurrentExIndex((prev) => Math.min(exercises.length - 1, prev + 1))}
              disabled={currentExIndex === exercises.length - 1}
              className="flex-1 sm:flex-none p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-neutral-300 font-bold text-xs flex items-center justify-center gap-1 transition-all"
            >
              <span>Вперед</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Big Finish Button */}
          <button
            onClick={handleFinish}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all"
          >
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>ЗАВЕРШИТЬ ТРЕНИРОВКУ</span>
          </button>
        </div>
      </motion.div>

      {/* Exercise Technique Demo Modal */}
      {currentExercise && (
        <ExerciseDemoModal
          exercise={findExerciseData(currentExercise.name)}
          isOpen={showDemoModal}
          onClose={() => setShowDemoModal(false)}
        />
      )}
    </div>
  );
};
