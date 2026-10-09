import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Zap, 
  Play, 
  Sparkles, 
  Filter, 
  CheckCircle,
  Activity,
  Image as ImageIcon,
  ChevronRight,
  Trophy,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockWorkouts } from '../../data/mockWorkouts';
import { mockExercisesDatabase, findExerciseData } from '../../data/mockExercises';
import { WorkoutDetailModal } from './WorkoutDetailModal';
import { ExerciseDemoModal } from './ExerciseDemoModal';

export const WorkoutsView = () => {
  const { profile, updateProfile, startWorkout } = useFitness();
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [exerciseLevelFilter, setExerciseLevelFilter] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExerciseForDemo, setSelectedExerciseForDemo] = useState(null);

  const userLevel = profile.fitnessLevel || 'intermediate';
  const userLevelName = profile.fitnessLevelName || (
    userLevel === 'beginner' ? 'Начинающий' : userLevel === 'advanced' ? 'Продвинутый' : 'Средний'
  );

  const levelCategories = [
    { id: 'recommended', label: `Рекомендовано для вас (${userLevelName}) ✨` },
    { id: 'beginner', label: 'Начинающий 🟢' },
    { id: 'intermediate', label: 'Средний 🟡' },
    { id: 'advanced', label: 'Продвинутый 🔴' },
    { id: 'all', label: 'Все программы' },
  ];

  const filteredWorkouts = mockWorkouts.filter((w) => {
    if (activeCategory === 'recommended') {
      // Prioritize workouts matching user level or user goal
      return w.levelKey === userLevel || (profile.goal === 'lose_weight' ? w.goalTag === 'lose_weight' : w.goalTag === 'gain_muscle');
    }
    if (activeCategory === 'beginner') {
      return w.levelKey === 'beginner';
    }
    if (activeCategory === 'intermediate') {
      return w.levelKey === 'intermediate';
    }
    if (activeCategory === 'advanced') {
      return w.levelKey === 'advanced';
    }
    return true;
  });

  const filteredExercises = mockExercisesDatabase.filter((ex) => {
    if (exerciseLevelFilter === 'all') return true;
    return ex.levelKey === exerciseLevelFilter;
  });

  const toggleGoal = () => {
    let nextGoal = 'gain_muscle';
    if (profile.goal === 'gain_muscle') nextGoal = 'lose_weight';
    else if (profile.goal === 'lose_weight') nextGoal = 'calisthenics_strength';
    else nextGoal = 'gain_muscle';
    updateProfile({ goal: nextGoal });
  };

  const goalTitle = {
    gain_muscle: 'Набор массы & Гипертрофия',
    calisthenics_strength: 'Силовые элементы & Калистеника',
    lose_weight: 'Похудение & Жиросжигание (HIIT)'
  }[profile.goal] || 'Адаптивный фитнес';

  const getLevelColor = (lvlKey) => {
    if (lvlKey === 'beginner') return { text: '#38BDF8', bg: '#38BDF820', border: '#38BDF840' };
    if (lvlKey === 'advanced') return { text: '#FF5E00', bg: '#FF5E0020', border: '#FF5E0040' };
    return { text: '#00FF85', bg: '#00FF8520', border: '#00FF8540' };
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Goal & Fitness Level Adaptation Banner */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                Умная персонализация
              </span>
              <span 
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                style={{
                  color: getLevelColor(userLevel).text,
                  backgroundColor: getLevelColor(userLevel).bg,
                  borderColor: getLevelColor(userLevel).border
                }}
              >
                Ваш уровень: {userLevelName}
              </span>
              <span className="text-xs text-neutral-400">
                • {profile.age} лет
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {goalTitle}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              {userLevel === 'beginner'
                ? 'Программа сфокусирована на базовой биомеханике (отжимания, приседания, планка), укреплении суставов и плавной адаптации.'
                : userLevel === 'advanced'
                ? 'Элитная калистеника: выходы силой (Muscle-Up), прогрессии горизонта Tuck Planche, L-Sit и максимальная мощность.'
                : 'Сбалансированная база: брусья, подтягивания, прогрессии уголка L-Sit и интенсивные интервалы.'}
            </p>
          </div>

          <button
            onClick={toggleGoal}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold transition-all shrink-0 flex items-center gap-2 self-start md:self-center"
          >
            <Sparkles className="w-4 h-4 text-[#00FF85]" />
            <span>Сменить цель</span>
          </button>
        </div>
      </div>

      {/* Level & Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {levelCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#00FF85] text-black shadow-neon-green font-black'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWorkouts.map((workout) => {
          const isUserLevelMatch = workout.levelKey === userLevel;
          const lvlColor = getLevelColor(workout.levelKey);

          return (
            <motion.div
              key={workout.id}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-3xl overflow-hidden border transition-all flex flex-col group ${
                isUserLevelMatch ? 'border-[#00FF85]/30 shadow-[0_0_20px_-8px_rgba(0,255,133,0.2)]' : 'border-white/5 hover:border-white/20'
              }`}
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/50 to-transparent" />

                {/* Category & Matches pills */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md"
                    style={{
                      backgroundColor: `${workout.accentColor || '#00FF85'}25`,
                      color: workout.accentColor || '#00FF85',
                      border: `1px solid ${workout.accentColor || '#00FF85'}40`
                    }}
                  >
                    {workout.category}
                  </span>

                  {isUserLevelMatch && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00FF85] text-black shadow-neon-green">
                      🎯 Твой уровень
                    </span>
                  )}
                </div>

                {/* Level indicator */}
                <div className="absolute top-3 right-3">
                  <span 
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border"
                    style={{
                      backgroundColor: lvlColor.bg,
                      color: lvlColor.text,
                      borderColor: lvlColor.border
                    }}
                  >
                    {workout.level}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base sm:text-lg font-black text-white line-clamp-1">
                    {workout.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                    {workout.subtitle}
                  </p>
                </div>
              </div>

              {/* Workout Details & Stats */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-neutral-400 py-2 border-b border-white/5">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {workout.durationMin} мин
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#FF5E00]">
                    <Flame className="w-3.5 h-3.5" />
                    ~{workout.caloriesBurned} ккал
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#00FF85]">
                    <Zap className="w-3.5 h-3.5" />
                    +{workout.xpReward} XP
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3">
                  <button
                    onClick={() => setSelectedWorkout(workout)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all text-center"
                  >
                    Упражнения ({workout.exercises.length})
                  </button>

                  <button
                    onClick={() => startWorkout(workout)}
                    className="py-2.5 px-4 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-green transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Старт</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* EXERCISE TECHNIQUE DATABASE SPOTLIGHT (3-PHASE PHOTO INSTRUCTIONS) */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                База упражнений & Поэтапные фото-инструкции
              </h3>
              <p className="text-xs text-neutral-400">
                Визуальная пошаговая демонстрация: 3 ключевые фазы (Старт → Движение → Пик) без сбоев видео
              </p>
            </div>
          </div>

          {/* Sub-filter for exercises level */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 self-start sm:self-auto">
            {[
              { id: 'all', label: 'Все' },
              { id: 'beginner', label: 'Новички' },
              { id: 'intermediate', label: 'Средний' },
              { id: 'advanced', label: 'Профи' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setExerciseLevelFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  exerciseLevelFilter === f.id
                    ? 'bg-[#00FF85] text-black font-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredExercises.map((item) => {
            const lvlColor = getLevelColor(item.levelKey);

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedExerciseForDemo(item)}
                className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00FF85]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${item.accentColor}15`,
                          color: item.accentColor
                        }}
                      >
                        {item.isStatic ? 'Изометрия' : 'Динамика'}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: lvlColor.bg,
                          color: lvlColor.text,
                          borderColor: lvlColor.border
                        }}
                      >
                        {item.level}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-neutral-400">
                      {item.isStatic ? `⏱️ ${item.targetValue} сек` : `🎯 ${item.targetValue} раз`}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-[#00FF85] transition-colors">
                    {item.name}
                  </h4>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.muscleTags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] text-neutral-400 bg-white/5 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#00FF85]">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>3 фазы выполнения</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-[#00FF85] transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Workout Detail Modal */}
      <WorkoutDetailModal
        workout={selectedWorkout}
        isOpen={Boolean(selectedWorkout)}
        onClose={() => setSelectedWorkout(null)}
        onSelectExercise={(ex) => {
          setSelectedWorkout(null);
          setSelectedExerciseForDemo(findExerciseData(ex.name));
        }}
        onStart={(w) => {
          setSelectedWorkout(null);
          startWorkout(w);
        }}
      />

      {/* Exercise Demo Modal */}
      <ExerciseDemoModal
        exercise={selectedExerciseForDemo}
        isOpen={Boolean(selectedExerciseForDemo)}
        onClose={() => setSelectedExerciseForDemo(null)}
      />
    </div>
  );
};
