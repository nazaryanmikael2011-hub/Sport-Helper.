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
  Volume2, 
  VolumeX,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFitness } from '../../context/FitnessContext';

export const ExerciseDemoModal = ({ exercise, isOpen, onClose }) => {
  const { awardXp, addToast } = useFitness();

  // Video player simulation state
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoLoopTime, setVideoLoopTime] = useState(0);

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

  // Video looping tick simulation
  useEffect(() => {
    let interval = null;
    if (isOpen && isPlayingVideo) {
      interval = setInterval(() => {
        setVideoLoopTime((prev) => (prev >= 6 ? 0 : +(prev + 0.5).toFixed(1)));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlayingVideo]);

  // Static countdown / countup timer
  useEffect(() => {
    let timerInterval = null;
    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setStaticSeconds((prev) => {
          if (prev >= targetVal) {
            // Reached goal!
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
      setIsPlayingVideo(true);
    }
  }, [exercise]);

  if (!isOpen || !exercise) return null;

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
      // Reset for next set
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
        className="relative w-full max-w-2xl bg-[#121217] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]"
      >
        {/* Glow ambient */}
        <div
          className="absolute -top-24 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: exercise.accentColor || '#00FF85' }}
        />

        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between gap-3 shrink-0 bg-[#121217]/80 backdrop-blur-md z-10">
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
                Сложность: <strong className="text-white">{exercise.difficulty || 'Средний'}</strong>
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
          {/* REAL RESPONSIVE HTML5 VIDEO PLAYER */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl group w-full aspect-video">
            <video
              key={exercise.videoUrl || exercise.id}
              src={exercise.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
              poster={exercise.poster}
              controls
              playsInline
              preload="metadata"
              loop={isStatic}
              muted={isStatic}
              autoPlay={isStatic}
              className="w-full h-full object-cover rounded-3xl bg-neutral-950"
            >
              <source src={exercise.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} type="video/mp4" />
              Ваш браузер не поддерживает HTML5 видео.
            </video>

            {/* Ambient Badges Overlay on Video */}
            <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-black/75 text-[#00FF85] border border-[#00FF85]/30 backdrop-blur-md">
                Видео-демонстрация
              </span>
              {isStatic && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-black/75 text-neutral-300 backdrop-blur-md border border-white/10">
                  Зацикленный повтор (Loop)
                </span>
              )}
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
                Техника выполнения
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

            {/* If STATIC (like Tuck Planche, L-sit, Plank): Big interactive stopwatch */}
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
              /* If DYNAMIC (like Push-ups, Dips, Burpees): Reps counter with +/- */
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
