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
  ArrowRight,
  Home,
  Trees,
  SlidersHorizontal,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockWorkouts } from '../../data/mockWorkouts';
import { mockExercisesDatabase, findExerciseData } from '../../data/mockExercises';
import { WorkoutDetailModal } from './WorkoutDetailModal';
import { ExerciseDemoModal } from './ExerciseDemoModal';

const EQUIPMENT_LABELS = {
  pullup_bar: 'Турник 🚪',
  dumbbells: 'Гантели 🏋️',
  resistance_bands: 'Резинки 🎗️',
  jump_rope: 'Скакалка 🪢',
  none: 'Свой вес 🤸',
  gym_machines: 'Оборудование зала 🏋️',
};

export const WorkoutsView = () => {
  const { profile, updateProfile, startWorkout } = useFitness();
  const [activeLocation, setActiveLocation] = useState('home'); // 'home' | 'street' | 'gym'
  const [filterByEquipment, setFilterByEquipment] = useState(true);
  const [activeSubFilter, setActiveSubFilter] = useState('all');
  const [exerciseLevelFilter, setExerciseLevelFilter] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExerciseForDemo, setSelectedExerciseForDemo] = useState(null);

  const userLevel = profile.fitnessLevel || 'intermediate';
  const userLevelName = profile.fitnessLevelName || (
    userLevel === 'beginner' ? 'Начинающий' : userLevel === 'advanced' ? 'Продвинутый' : 'Средний'
  );
  const userEquipment = profile.equipment || ['none'];

  const locationTabs = [
    { id: 'home', label: 'Дома', icon: Home, emoji: '🏠', count: mockWorkouts.filter((w) => w.location === 'home').length },
    { id: 'street', label: 'На улице (Воркаут)', icon: Trees, emoji: '🌳', count: mockWorkouts.filter((w) => w.location === 'street').length },
    { id: 'gym', label: 'В тренажерном зале', icon: Dumbbell, emoji: '🏋️', count: mockWorkouts.filter((w) => w.location === 'gym').length },
  ];

  const subFilters = [
    { id: 'all', label: 'Все программы' },
    { id: 'recommended', label: `Рекомендовано (${userLevelName}) ✨` },
    { id: 'beginner', label: 'Начинающий 🟢' },
    { id: 'intermediate', label: 'Средний 🟡' },
    { id: 'advanced', label: 'Продвинутый 🔴' },
    { id: 'calisthenics', label: 'Калистеника ⚡' },
    { id: 'martial', label: 'Йога & Единоборства 🥋' },
  ];

  // Helper to check if user has necessary equipment for a workout
  const hasRequiredEquipment = (workout) => {
    if (!workout.requiredEquipment || workout.requiredEquipment.length === 0) return true;
    if (workout.location === 'gym') return true; // Gym provides all machines
    return workout.requiredEquipment.every((eq) => userEquipment.includes(eq));
  };

  const filteredWorkouts = mockWorkouts.filter((w) => {
    // 1. Primary Location filter
    if (w.location !== activeLocation) return false;

    // 2. Equipment intelligent filter
    if (filterByEquipment && !hasRequiredEquipment(w)) return false;

    // 3. Sub-category & level filter
    if (activeSubFilter === 'recommended') {
      return w.levelKey === userLevel || (profile.goal === 'lose_weight' ? w.goalTag === 'lose_weight' : w.goalTag === 'gain_muscle');
    }
    if (activeSubFilter === 'beginner') return w.levelKey === 'beginner';
    if (activeSubFilter === 'intermediate') return w.levelKey === 'intermediate';
    if (activeSubFilter === 'advanced') return w.levelKey === 'advanced';
    if (activeSubFilter === 'calisthenics') {
      return w.category.toLowerCase().includes('воркаут') || w.category.toLowerCase().includes('калистеника') || w.id.includes('calisthenics') || w.id.includes('planche') || w.id.includes('lsit') || w.id.includes('muscleup');
    }
    if (activeSubFilter === 'martial') {
      return w.category === 'Йога' || w.category === 'Бокс' || w.category === 'Карате';
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
                Умная адаптация
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
              {activeLocation === 'home'
                ? 'Домашние тренировки: комплексы со своим весом, гантелями, фитнес-резинками и кардио для комфортных занятий в квартире.'
                : activeLocation === 'street'
                ? 'Уличная калистеника: турники, параллельные брусья, скоростной бег и мощные статические элементы на свежем воздухе.'
                : 'Тренажерный зал: классический силовой сплит, штанги, гантельные ряды и блочные кроссоверы для максимальной гипертрофии.'}
            </p>
          </div>

          <button
            onClick={toggleGoal}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold transition-all shrink-0 flex items-center gap-2 self-start md:self-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#00FF85]" />
            <span>Сменить цель</span>
          </button>
        </div>
      </div>

      {/* 3 PRIMARY LOCATION TABS (Дома, На улице, В зале) */}
      <div className="glass-panel p-2 rounded-3xl border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {locationTabs.map((tab) => {
            const isActive = activeLocation === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveLocation(tab.id);
                  setActiveSubFilter('all');
                }}
                className={`py-3.5 px-4 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00FF85] to-[#10B981] text-black shadow-neon-green font-black'
                    : 'bg-white/[0.02] hover:bg-white/[0.06] text-neutral-300 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{tab.emoji}</span>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-black block">
                      {tab.label}
                    </span>
                    <span className={`text-[10px] block ${isActive ? 'text-black/80 font-bold' : 'text-neutral-400'}`}>
                      {tab.count} {tab.count === 1 ? 'программа' : tab.count < 5 ? 'программы' : 'программ'}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-black text-[#00FF85]' : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {tab.count}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* INTELLIGENT EQUIPMENT FILTER TOGGLE & STATUS BAR */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-neutral-400 font-semibold">Ваш инвентарь:</span>
          {userEquipment.map((eq) => (
            <span
              key={eq}
              className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 text-[11px] font-bold"
            >
              {EQUIPMENT_LABELS[eq] || eq}
            </span>
          ))}
        </div>

        <button
          onClick={() => setFilterByEquipment(!filterByEquipment)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            filterByEquipment
              ? 'bg-[#00FF85]/15 border-[#00FF85]/40 text-[#00FF85]'
              : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>
            {filterByEquipment ? 'Фильтр инвентаря: ВКЛ' : 'Показать все (без учета инвентаря)'}
          </span>
        </button>
      </div>

      {/* Sub-category & Level Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {subFilters.map((cat) => {
          const isActive = activeSubFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveSubFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
      {filteredWorkouts.length === 0 ? (
        <div className="p-8 rounded-3xl glass-card border border-white/5 text-center space-y-3">
          <p className="text-neutral-300 font-bold text-sm">
            В данной категории нет программ, подходящих под текущий фильтр инвентаря.
          </p>
          <button
            onClick={() => setFilterByEquipment(false)}
            className="px-4 py-2 rounded-xl bg-[#00FF85] text-black font-bold text-xs"
          >
            Показать все программы локации
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWorkouts.map((workout) => {
            const isUserLevelMatch = workout.levelKey === userLevel;
            const lvlColor = getLevelColor(workout.levelKey);
            const userHasEq = hasRequiredEquipment(workout);

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

                    {!userHasEq && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-black flex items-center gap-1 shadow-md">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Нужен инвентарь</span>
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

                  {/* Equipment Tag */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400">Требуемый инвентарь:</span>
                    <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {workout.requiredEquipment && workout.requiredEquipment.length > 0
                        ? workout.requiredEquipment.map((eq) => EQUIPMENT_LABELS[eq] || eq).join(', ')
                        : 'Свой вес тела (без инвентаря) 🤸'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {workout.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3">
                    <button
                      onClick={() => setSelectedWorkout(workout)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all text-center cursor-pointer"
                    >
                      Упражнения ({workout.exercises.length})
                    </button>

                    <button
                      onClick={() => startWorkout(workout)}
                      className="py-2.5 px-4 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-neon-green transition-all cursor-pointer"
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
      )}

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
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
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
