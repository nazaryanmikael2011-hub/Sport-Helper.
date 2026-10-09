import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Trophy, TrendingUp, HeartHandshake } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { motivationalQuotes } from '../../data/mockBadges';

export const MotivationBanner = () => {
  const { profile, streak, todayNutrients, dailyTargets, completedWorkouts } = useFitness();

  // Dynamic encouraging message based on current progress and goal
  const motivationalMessage = useMemo(() => {
    const workoutsToday = completedWorkouts.filter(w => w.date.includes('Сегодня')).length;
    const caloriePct = Math.round((todayNutrients.calories / (dailyTargets.calories || 1)) * 100);

    if (workoutsToday > 0) {
      return {
        badge: 'Тренировка выполнена!',
        title: 'Отличная работа! Ты на шаг ближе к своей идеальной форме, не сдавайся! 🔥',
        subtitle: 'Тело благодарит тебя за нагрузку. Не забудь восполнить белок и восстановиться.',
        accent: '#00FF85'
      };
    }

    if (profile.goal === 'gain_muscle') {
      if (caloriePct > 70) {
        return {
          badge: 'Анаболический режим',
          title: 'Топливо для роста загружено! Готов покорять турники и веса? 🦾',
          subtitle: 'Сила строится на дисциплине. Сделай сегодня качественный подход к своей цели.',
          accent: '#00FF85'
        };
      }
      return {
        badge: 'Фокус: Сила & Масса',
        title: 'Твое тело способно на большее, чем думает твой разум! ⚡',
        subtitle: 'Освой прогрессию L-sit или Tuck Planche сегодня. Становись мощнее с каждой тренировкой!',
        accent: '#00FF85'
      };
    } else {
      // Weight loss
      if (caloriePct > 85) {
        return {
          badge: 'Контроль дефицита',
          title: 'Отличная дисциплина по калориям! Жиросжигание идет полным ходом! 🏃‍♂️',
          subtitle: 'Каждый день в дефиците приближает желанный рельеф и легкость.',
          accent: '#FF5E00'
        };
      }
      return {
        badge: 'Фокус: Рельеф & Тонус',
        title: 'Запусти метаболизм на максимум! Кардио и интервалы ждут тебя! 💥',
        subtitle: 'Похудение — это не ограничение, а выбор стать более легким, быстрым и выносливым.',
        accent: '#FF5E00'
      };
    }
  }, [profile.goal, completedWorkouts, todayNutrients.calories, dailyTargets.calories]);

  // Random daily quote
  const dailyQuote = motivationalQuotes[(streak || 1) % motivationalQuotes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-5 sm:p-7 glass-card border border-white/10"
    >
      {/* Background glow orb */}
      <div
        className="absolute -right-12 -top-12 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ backgroundColor: motivationalMessage.accent }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${motivationalMessage.accent}20`,
                color: motivationalMessage.accent,
                border: `1px solid ${motivationalMessage.accent}40`
              }}
            >
              {motivationalMessage.badge}
            </span>

            <div className="flex items-center gap-1 text-xs font-bold text-neutral-400">
              <Flame className="w-3.5 h-3.5 text-[#FF5E00]" />
              <span>{streak} дней подряд</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
            {motivationalMessage.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
            {motivationalMessage.subtitle}
          </p>

          <div className="mt-3 text-xs italic text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF85] shrink-0" />
            <span>{dailyQuote}</span>
          </div>
        </div>

        {/* Quick status pill */}
        <div className="hidden sm:flex flex-col items-end shrink-0 p-3 rounded-2xl bg-white/5 border border-white/5">
          <span className="text-[11px] text-neutral-400 font-semibold uppercase">
            Целевой показатель
          </span>
          <span className="text-xl font-black text-white mt-0.5">
            {profile.weight} <span className="text-xs text-neutral-400">→</span>{' '}
            <span style={{ color: motivationalMessage.accent }}>{profile.targetWeight} кг</span>
          </span>
          <span className="text-[11px] text-neutral-400 mt-1">
            {profile.goal === 'gain_muscle' ? 'Набор мышечной массы' : 'Снижение жировой массы'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
