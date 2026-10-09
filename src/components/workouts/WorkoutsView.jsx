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
  Video,
  ChevronRight
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockWorkouts } from '../../data/mockWorkouts';
import { mockExercisesDatabase, findExerciseData } from '../../data/mockExercises';
import { WorkoutDetailModal } from './WorkoutDetailModal';
import { ExerciseDemoModal } from './ExerciseDemoModal';

export const WorkoutsView = () => {
  const { profile, updateProfile, startWorkout } = useFitness();
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExerciseForDemo, setSelectedExerciseForDemo] = useState(null);

  const categories = [
    { id: 'recommended', label: 'Для твоей цели ✨' },
    { id: 'gain_muscle', label: 'Калистеника & Сила 🦾' },
    { id: 'lose_weight', label: 'HIIT & Жиросжигание 🔥' },
    { id: 'all', label: 'Все программы' },
  ];

  const filteredWorkouts = mockWorkouts.filter((w) => {
    if (activeCategory === 'recommended') {
      if (profile.goal === 'calisthenics_strength' || profile.goal === 'gain_muscle') {
        return w.goalTag === 'gain_muscle';
      }
      return w.goalTag === 'lose_weight';
    }
    if (activeCategory === 'gain_muscle') {
      return w.goalTag === 'gain_muscle';
    }
    if (activeCategory === 'lose_weight') {
      return w.goalTag === 'lose_weight';
    }
    return true;
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

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Goal Adaptation Banner */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                Адаптивная система
              </span>
              <span className="text-xs text-neutral-400">Программа меняется под твою цель</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {goalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              {profile.goal === 'lose_weight'
                ? 'Акцент на интервальное кардио, взрывные HIIT-сессии, ускорение метаболизма и поддержание плотности мышц.'
                : 'Акцент на прогрессии элементов со своим весом (L-sit, горизонт Tuck Planche), работу на брусьях и тяжелую базу.'}
            </p>
          </div>

          <button
            onClick={toggleGoal}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#00FF85]" />
            <span>Сменить цель</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
        {filteredWorkouts.map((workout) => (
          <motion.div
            key={workout.id}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col group"
          >
            {/* Image Banner */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/50 to-transparent" />

              {/* Category pill */}
              <div className="absolute top-3 left-3">
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
              </div>

              {/* Level indicator */}
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
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
        ))}
      </div>

      {/* EXERCISE TECHNIQUE DATABASE SPOTLIGHT */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                База упражнений & Видео-демонстрация
              </h3>
              <p className="text-xs text-neutral-400">
                Нажми на любое упражнение для просмотра пошаговой техники, видео-лупа и счетчика подходов
              </p>
            </div>
          </div>
          <span className="hidden sm:inline text-xs font-bold text-[#00FF85]">
            {mockExercisesDatabase.length} упражнений
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {mockExercisesDatabase.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedExerciseForDemo(item)}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00FF85]/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${item.accentColor}15`,
                      color: item.accentColor
                    }}
                  >
                    {item.isStatic ? 'Изометрия' : 'Динамика'}
                  </span>
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

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#00FF85]">
                <span className="flex items-center gap-1">
                  <Play className="w-3 h-3 fill-[#00FF85]" />
                  Смотреть технику
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-[#00FF85] transition-all" />
              </div>
            </motion.div>
          ))}
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
