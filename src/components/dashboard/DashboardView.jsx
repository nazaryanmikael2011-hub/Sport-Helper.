import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Dumbbell, 
  Utensils, 
  ShoppingBag, 
  Zap, 
  Award, 
  Activity, 
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MotivationBanner } from './MotivationBanner';
import { WeightTracker } from './WeightTracker';
import { StatCard } from '../common/StatCard';
import { ProgressRing } from '../common/ProgressRing';
import { calculateBMI } from '../../utils/calculations';
import { mockBadges } from '../../data/mockBadges';
import { AvatarUploader } from '../profile/AvatarUploader';

export const DashboardView = ({ setActiveTab }) => {
  const { 
    user, 
    profile, 
    levelInfo, 
    todayNutrients, 
    dailyTargets, 
    streak, 
    completedWorkouts,
    unlockedBadgeIds 
  } = useFitness();

  const caloriePct = Math.round((todayNutrients.calories / (dailyTargets.calories || 1)) * 100);
  const bmiInfo = calculateBMI(profile.weight, profile.height);
  const totalBurnedCalories = completedWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  const unlockedBadgesList = mockBadges.filter(b => unlockedBadgeIds.includes(b.id));

  const weekDays = [
    { key: 'mon', label: 'Пн' },
    { key: 'tue', label: 'Вт' },
    { key: 'wed', label: 'Ср' },
    { key: 'thu', label: 'Чт' },
    { key: 'fri', label: 'Пт' },
    { key: 'sat', label: 'Сб' },
    { key: 'sun', label: 'Вс' },
  ];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // 0 for Mon ... 6 for Sun

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Top Welcome & Motivational Banner */}
      <MotivationBanner />

      {/* User Athlete Profile & Avatar Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <AvatarUploader size="md" />

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {user.name}
              </h2>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                PRO Атлет
              </span>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                {profile.fitnessLevelName || (profile.fitnessLevel === 'advanced' ? 'Продвинутый' : profile.fitnessLevel === 'beginner' ? 'Начинающий' : 'Средний')}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              {user.email} • {profile.age} лет
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1 text-[#FF5E00]">
                <Flame className="w-3.5 h-3.5 fill-[#FF5E00]" />
                {streak} дней стрик
              </span>
              <span>•</span>
              <span className="text-[#00FF85]">
                {levelInfo.title} (Ур. {levelInfo.level})
              </span>
            </div>
          </div>
        </div>

        {/* Right side target summary & Edit Profile button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center sm:text-right min-w-[140px]">
            <span className="text-[10px] text-neutral-400 uppercase font-bold block">
              Текущая цель
            </span>
            <span className="text-sm font-black text-white mt-0.5 block">
              {profile.goal === 'gain_muscle' ? 'Набор массы' : profile.goal === 'calisthenics_strength' ? 'Калистеника & Сила' : 'Похудение & Рельеф'}
            </span>
            <span className="text-[11px] text-[#00FF85] font-semibold">
              Целевой вес: {profile.targetWeight} кг
            </span>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            title="Перейти к редактированию всех параметров профиля"
          >
            <span>Редактировать</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Gamification Level & XP Progress Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-[#00FF85]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00FF85] to-[#10B981] p-0.5 shadow-neon-green flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0D0E12] rounded-[14px] flex items-center justify-center font-black text-lg text-[#00FF85]">
                {levelInfo.level}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Ранг атлета
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                  Уровень {levelInfo.level}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {levelInfo.title}
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-neutral-400">
              Опыт: <strong className="text-white">{levelInfo.xpCurrentInLevel}</strong> / {levelInfo.xpNeeded} XP
            </span>
            <div className="text-[11px] text-[#00FF85] font-semibold mt-0.5">
              +{levelInfo.xpNeeded - levelInfo.xpCurrentInLevel} XP до ур. {levelInfo.level + 1}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden border border-white/5 relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#10B981] via-[#00FF85] to-[#22c55e] shadow-neon-green relative"
            initial={{ width: 0 }}
            animate={{ width: `${levelInfo.progressPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-[1px] rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card with Progress Ring */}
        <div className="glass-card rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-1">
              <Utensils className="w-3.5 h-3.5 text-[#00FF85]" />
              <span>Калории за сегодня</span>
            </div>
            <div className="text-2xl font-black text-white">
              {todayNutrients.calories}{' '}
              <span className="text-xs text-neutral-400 font-normal">/ {dailyTargets.calories}</span>
            </div>
            <span className="text-[11px] text-neutral-400 mt-1 block">
              {dailyTargets.calories - todayNutrients.calories > 0
                ? `Осталось ${dailyTargets.calories - todayNutrients.calories} ккал`
                : 'Норма выполнена!'}
            </span>
          </div>

          <ProgressRing
            radius={34}
            strokeWidth={6}
            progress={caloriePct}
            color={caloriePct > 105 ? '#FF5E00' : '#00FF85'}
          >
            <span className="text-[11px] font-black text-white">{caloriePct}%</span>
          </ProgressRing>
        </div>

        {/* Discipline / Streak 7-day Widget */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 border border-white/5 hover:border-[#FF5E00]/30 flex flex-col justify-between"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'linear-gradient(90deg, transparent, #FF5E00, transparent)'
            }}
          />

          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FF5E00]/15 text-[#FF5E00]">
                  <Flame className="w-4 h-4 fill-[#FF5E00]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  Дисциплина (Стрик)
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#FF5E00]/15 text-[#FF5E00] border border-[#FF5E00]/30">
                {streak === 1 ? 'День 1' : 'Огонь'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-1.5 mt-1">
              {streak} <span className="text-xs font-normal text-neutral-400">{streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} активности</span>
            </div>
          </div>

          {/* 7 Days of the Week Indicator: only today is burning/active */}
          <div className="mt-3 pt-2.5 border-t border-white/5">
            <div className="flex items-center justify-between gap-1">
              {weekDays.map((d, index) => {
                const isToday = index === currentDayIndex;
                const isActive = isToday;
                return (
                  <div
                    key={d.key}
                    title={isToday ? `${d.label} (Сегодня - закрыт день!)` : `${d.label} (Неактивно)`}
                    className={`flex-1 py-1.5 px-0.5 rounded-lg flex flex-col items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-[#FF5E00] to-[#E04F00] text-white shadow-[0_0_12px_rgba(255,94,0,0.35)] scale-105 font-black'
                        : 'bg-white/[0.03] border border-white/5 text-neutral-500 font-semibold'
                    }`}
                  >
                    <span className="text-[10px]">{d.label}</span>
                    {isActive ? (
                      <Flame className="w-3 h-3 fill-white text-white mt-0.5" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-2">
              <span>Недельный цикл</span>
              <span className="text-[#FF5E00] font-bold">1 из 7 дней закрыт</span>
            </div>
          </div>
        </motion.div>

        {/* Workouts Burned */}
        <StatCard
          icon={Activity}
          title="Спорт & Энергия"
          value={`${totalBurnedCalories}`}
          subvalue="сожжено ккал"
          badge={`${completedWorkouts.length} сессий`}
          accentColor="#38BDF8"
        />

        {/* BMI & Health Index */}
        <StatCard
          icon={ShieldCheck}
          title="Индекс массы тела"
          value={bmiInfo.bmi}
          subvalue="кг/м²"
          badge={bmiInfo.label}
          accentColor={bmiInfo.color}
        />
      </div>

      {/* Weight Tracker Graph & History */}
      <WeightTracker />

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Workouts CTA */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('workouts')}
          className="glass-card p-5 rounded-2xl border border-white/5 hover:border-[#00FF85]/30 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
              <Dumbbell className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#00FF85] group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-white text-base">
            {profile.goal === 'gain_muscle' ? 'Калистеника & Сила' : 'HIIT & Жиросжигание'}
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            {profile.goal === 'gain_muscle'
              ? 'Прогрессии L-sit, горизонта и подтягиваний'
              : 'Интервальное кардио и круговые комплексы'}
          </p>
        </motion.div>

        {/* Nutrition CTA */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('nutrition')}
          className="glass-card p-5 rounded-2xl border border-white/5 hover:border-sky-400/30 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-sky-500/15 text-sky-400">
              <Utensils className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-white text-base">
            Счетчик калорий & БЖУ
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            Внеси обед или ужин, проверь баланс белков и жиров
          </p>
        </motion.div>

        {/* Store CTA */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setActiveTab('shop')}
          className="glass-card p-5 rounded-2xl border border-white/5 hover:border-[#FF5E00]/30 cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-[#FF5E00]/15 text-[#FF5E00]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#FF5E00] group-hover:translate-x-1 transition-all" />
          </div>
          <h4 className="font-bold text-white text-base">
            Умный спорт-магазин
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            Экипировка, подобранная специально под твою цель
          </p>
        </motion.div>
      </div>

      {/* Unlocked Badges Preview */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF5E00]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Твои достижения ({unlockedBadgesList.length} из {mockBadges.length})
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs text-[#00FF85] hover:underline font-semibold"
          >
            Все награды
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {unlockedBadgesList.slice(0, 4).map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-white truncate">
                  {badge.title}
                </h5>
                <span className="text-[10px] text-[#00FF85] font-semibold">
                  +{badge.xpReward} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
