import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Timer, 
  Plus, 
  Minus, 
  Sparkles, 
  Info, 
  ShieldAlert, 
  ChevronLeft,
  ChevronRight,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFitness } from '../../context/FitnessContext';

export const ExerciseDemoModal = ({ exercise, isOpen, onClose }) => {
  const { awardXp, addToast } = useFitness();

  // Active step/phase index (0, 1, 2)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState({});

  // Set & Reps / Timer state
  const isStatic = exercise?.isStatic ?? false;
  const targetVal = exercise?.targetValue || (isStatic ? 15 : 12);

  // Dynamic counter
  const [currentReps, setCurrentReps] = useState(targetVal);

  // Static timer
  const [staticSeconds, setStaticSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sets progress
  const [currentSet, setCurrentSet] = useState(1);
  const totalSets = 4;

  // Fallback phases if exercise does not declare custom phases
  const defaultPhases = [
    {
      phaseNumber: 1,
      badge: 'Фаза 1: Старт',
      title: 'Исходное положение (Стартовая позиция)',
      description: 'Займите устойчивое исходное положение. Мышцы кора и лопатки зафиксированы, дыхание ровное.',
      image: exercise?.poster || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
    {
      phaseNumber: 2,
      badge: 'Фаза 2: Движение',
      title: 'Фаза активного движения (Эксцентрика / Концентрика)',
      description: 'Подконтрольно выполняйте движение без рывков, сохраняя постоянное натяжение в рабочих мышцах.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      phaseNumber: 3,
      badge: 'Фаза 3: Пик',
      title: 'Пиковое сокращение мышц (Фиксация)',
      description: 'Максимально прожмите целевую мышечную группу в конечной точке траектории с фиксацией на 1 секунду.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const phases = exercise?.phases && exercise.phases.length > 0 ? exercise.phases : defaultPhases;
  const currentPhase = phases[activePhaseIndex] || phases[0];

  // Static countdown / countup timer
  useEffect(() => {
    let timerInterval = null;
    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setStaticSeconds((prev) => {
          if (prev >= targetVal) {
            setIsTimerRunning(false);
            try {
              confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.6 }
              });
            } catch (_) {}
            addToast('Время удержания выполнено! ⏱️', `Цель в ${targetVal} сек достигнута!`, 'success');
            return targetVal;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, targetVal, addToast]);

  // Reset when exercise changes
  useEffect(() => {
    if (exercise) {
      setCurrentReps(exercise.targetValue || 12);
      setStaticSeconds(0);
      setIsTimerRunning(false);
      setCurrentSet(1);
      setActivePhaseIndex(0);
      setImgErrorMap({});
    }
  }, [exercise]);

  if (!isOpen || !exercise) return null;

  const handleNextPhase = () => {
    setActivePhaseIndex((prev) => (prev + 1) % phases.length);
  };

  const handlePrevPhase = () => {
    setActivePhaseIndex((prev) => (prev - 1 + phases.length) % phases.length);
  };

  const handleFinishSet = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00FF85', '#FF5E00', '#38BDF8']
      });
    } catch (_) {}

    awardXp(25, `За выполнение подхода (${exercise.name})`);

    addToast(
      `Подход ${currentSet} завершен! 🦾`,
      isStatic
        ? `Удержание: ${staticSeconds || targetVal} сек. Отличная стабилизация!`
        : `Выполнено: ${currentReps} повторений. Мышцы заряжены!`,
      'success',
      4000
    );

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      setStaticSeconds(0);
      setIsTimerRunning(false);
    } else {
      addToast(
        'Все 4 подхода выполнены! 🏆',
        `Упражнение "${exercise.name}" полностью закрыто!`,
        'badge',
        5000
      );
    }
  };

  const progressPercent = isStatic
    ? Math.min(100, Math.round((staticSeconds / targetVal) * 100))
    : Math.min(100, Math.round((currentReps / targetVal) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="relative w-full max-w-2xl bg-[#121217] border border-white/10 rounded-3xl shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between gap-3 shrink-0 bg-[#121217]/90 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${exercise.accentColor || '#00FF85'}20`,
                  color: exercise.accentColor || '#00FF85',
                  border: `1px solid ${exercise.accentColor || '#00FF85'}40`
                }}
              >
                {exercise.category || (isStatic ? 'Статический элемент' : 'Динамика')}
              </span>
              <span className="text-xs text-neutral-400">
                Уровень: <strong className="text-white">{exercise.level || 'Средний'}</strong>
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white mt-1 leading-tight">
              {exercise.name}
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

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {/* STEP-BY-STEP PHOTO INSTRUCTION (HERO GALLERY) */}
          <div className="space-y-3">
            {/* Phase Selector Tabs */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {phases.map((ph, idx) => {
                  const isSelected = activePhaseIndex === idx;
                  return (
                    <button
                      key={ph.phaseNumber || idx}
                      onClick={() => setActivePhaseIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#00FF85] text-black shadow-neon-green font-black'
                          : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>Фаза {idx + 1}</span>
                      <span className="hidden sm:inline opacity-80">• {idx === 0 ? 'Старт' : idx === 1 ? 'Движение' : 'Пик'}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handlePrevPhase}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                  title="Предыдущая фаза"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhase}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                  title="Следующая фаза"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Active Photo Container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl group w-full aspect-video">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhaseIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full relative"
                >
                  {!imgErrorMap[activePhaseIndex] ? (
                    <img
                      src={currentPhase.image}
                      alt={currentPhase.title}
                      onError={() => {
                        setImgErrorMap((prev) => ({ ...prev, [activePhaseIndex]: true }));
                      }}
                      className="w-full h-full object-cover rounded-3xl bg-neutral-900"
                    />
                  ) : (
                    // Sleek graceful fallback card if image is blocked
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 flex flex-col justify-between border border-white/10">
                      <div className="flex items-center gap-2 text-[#00FF85]">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          Схематическая визуализация • Фаза {activePhaseIndex + 1}
                        </span>
                      </div>
                      <div className="my-auto text-center space-y-2">
                        <h4 className="text-lg font-black text-white">
                          {currentPhase.title}
                        </h4>
                        <p className="text-xs text-neutral-400 max-w-md mx-auto">
                          {currentPhase.description}
                        </p>
                      </div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-widest text-center">
                        SPORT-HELPER ATHELIC GUIDE
                      </div>
                    </div>
                  )}

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Phase Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/80 text-[#00FF85] border border-[#00FF85]/40 backdrop-blur-md">
                      {currentPhase.badge || `Фаза ${activePhaseIndex + 1} из ${phases.length}`}
                    </span>
                  </div>

                  {/* Bottom title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <h4 className="text-sm sm:text-base font-black drop-shadow-md">
                      {currentPhase.title}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Active Phase Detailed Bio-mechanical Guide */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#1A1A24] border border-white/5 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#00FF85]/15 text-[#00FF85] shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Инструкция к текущей фазе:
                </span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  {currentPhase.description}
                </p>
              </div>
            </div>

            {/* 3 Thumbnails Quick Previews */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {phases.map((ph, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    activePhaseIndex === idx
                      ? 'bg-white/[0.08] border-[#00FF85] shadow-neon-green'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-black uppercase text-neutral-400">
                      Этап {idx + 1}
                    </span>
                    {activePhaseIndex === idx && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-white line-clamp-1">
                    {idx === 0 ? 'Старт' : idx === 1 ? 'Движение' : 'Пик'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MUSCLE TAGS */}
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
              Задействованные мышечные группы
            </span>
            <div className="flex flex-wrap gap-2">
              {exercise.muscleTags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-[#1A1A24] text-neutral-200 border border-white/10 hover:border-[#00FF85]/40 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF85]" />
                  [{tag}]
                </span>
              ))}
            </div>
          </div>

          {/* STEP-BY-STEP TECHNIQUE INSTRUCTION */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1A1A24]/70 border border-white/5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00FF85]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Пошаговая техника упражнения
              </h4>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              {exercise.techniqueSteps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-lg bg-white/5 text-[#00FF85] font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed text-neutral-200">{step}</p>
                </div>
              ))}
            </div>

            {/* Breathing & Advice */}
            {exercise.breathingTip && (
              <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2 text-xs text-neutral-400">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Дыхание:</strong> {exercise.breathingTip}
                </span>
              </div>
            )}
          </div>

          {/* EXECUTION INTERFACE: Dynamic reps counter OR Static hold timer */}
          <div className="p-5 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Интерфейс выполнения
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Подход {currentSet} из {totalSets}
                </h4>
              </div>

              <span className="text-xs font-bold text-[#00FF85] px-2.5 py-1 rounded-full bg-[#00FF85]/10 border border-[#00FF85]/30">
                {isStatic ? `Цель: ${targetVal} сек` : `Цель: ${targetVal} повторений`}
              </span>
            </div>

            {/* If STATIC (like Tuck Planche, L-sit, Plank Lean): Big interactive stopwatch */}
            {isStatic ? (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative flex items-center justify-center mb-3">
                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-white">
                    {staticSeconds} <span className="text-xl font-normal text-neutral-400">/ {targetVal}с</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xs h-2 bg-neutral-800 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00FF85] to-[#10B981]"
                    style={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                      isTimerRunning
                        ? 'bg-[#FF5E00] text-white shadow-neon-orange'
                        : 'bg-[#00FF85] text-black shadow-neon-green'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
                    <span>{isTimerRunning ? 'Стоп' : 'Старт удержания'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setStaticSeconds(0);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Сбросить"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* If DYNAMIC (like Push-ups, Squats, Dips, Muscle-ups): Reps counter with +/- */
              <div className="flex flex-col items-center justify-center py-2">
                <div className="flex items-center gap-4 sm:gap-6 my-2">
                  <button
                    onClick={() => setCurrentReps((prev) => Math.max(0, prev - 1))}
                    className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/10"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <div className="text-center">
                    <span className="text-5xl sm:text-6xl font-black text-white font-mono">
                      {currentReps}
                    </span>
                    <span className="text-xs text-neutral-400 block font-bold uppercase mt-1">
                      повторений сделано
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentReps((prev) => prev + 1)}
                    className="w-12 h-12 rounded-2xl bg-[#00FF85]/15 hover:bg-[#00FF85]/25 text-[#00FF85] flex items-center justify-center transition-colors border border-[#00FF85]/30"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Quick Add pills */}
                <div className="flex items-center gap-2 mt-2">
                  {[5, 10, 15].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setCurrentReps((prev) => prev + amt)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5 transition-colors"
                    >
                      +{amt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION: Big Complete Set Button */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#121217] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400">
            Награда за подход: <strong className="text-[#00FF85]">+25 XP</strong>
          </div>

          <button
            onClick={handleFinishSet}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all"
          >
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>ЗАВЕРШИТЬ ПОДХОД</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
