import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Plus, Sparkles, Flame, Info, CheckCircle2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { ProgressRing } from '../common/ProgressRing';
import { MealSection } from './MealSection';
import { AddFoodModal } from './AddFoodModal';

export const NutritionView = () => {
  const { profile, meals, todayNutrients, dailyTargets } = useFitness();
  const [modalState, setModalState] = useState({ isOpen: false, mealType: 'breakfast' });

  const openAddModal = (mealType) => {
    setModalState({ isOpen: true, mealType });
  };

  const closeAddModal = () => {
    setModalState({ isOpen: false, mealType: 'breakfast' });
  };

  const calPct = Math.round((todayNutrients.calories / (dailyTargets.calories || 1)) * 100);
  const proteinPct = Math.round((todayNutrients.protein / (dailyTargets.protein || 1)) * 100);
  const fatsPct = Math.round((todayNutrients.fats / (dailyTargets.fats || 1)) * 100);
  const carbsPct = Math.round((todayNutrients.carbs / (dailyTargets.carbs || 1)) * 100);

  const calRemaining = dailyTargets.calories - todayNutrients.calories;

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Dynamic Goal Rationale Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                {profile.goal === 'gain_muscle' ? 'Профицит: Набор силы' : 'Дефицит: Сжигание жира'}
              </span>
              <span className="text-xs text-neutral-400">Формула Миффлина-Сан Жеора</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {profile.goal === 'gain_muscle'
                ? 'Анаболическая норма: +15% энергии для роста'
                : 'Дефицит калорий: -20% для сжигания жира'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {profile.goal === 'gain_muscle'
                ? `Дневная норма рассчитана на вес ${profile.weight} кг с повышенной долей белка (2.2 г/кг) для восстановления мышечных волокон.`
                : `Безопасный дефицит сохраняет мышечную массу благодаря высокому уровню белка (2.2 г/кг) и стабильно уменьшает жировую прослойку.`}
            </p>
          </div>

          <button
            onClick={() => openAddModal('lunch')}
            className="px-4 py-2.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-extrabold text-xs flex items-center gap-2 shadow-neon-green transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Записать прием пищи</span>
          </button>
        </div>
      </div>

      {/* Visual Calorie & Macro Progress Rings Overview */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Calorie Ring (Center on mobile/tablet) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <ProgressRing
                radius={90}
                strokeWidth={14}
                progress={calPct}
                color={calPct > 105 ? '#FF5E00' : '#00FF85'}
              >
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Калории
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
                  {todayNutrients.calories}
                </span>
                <span className="text-xs text-neutral-400">
                  из {dailyTargets.calories} ккал
                </span>
              </ProgressRing>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
              <span className={calRemaining >= 0 ? 'text-[#00FF85]' : 'text-[#FF5E00]'}>
                {calRemaining >= 0
                  ? `Осталось съесть: ${calRemaining} ккал`
                  : `Превышение нормы на: ${Math.abs(calRemaining)} ккал`}
              </span>
            </div>
          </div>

          {/* Three Macro Rings / Bars (Белки, Жиры, Углеводы) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
              Баланс макронутриентов (БЖУ)
            </h4>

            {/* Protein */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  <span className="text-sm font-bold text-white">Белки</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300">
                  <span className="text-sky-400 font-bold">{todayNutrients.protein}г</span> / {dailyTargets.protein}г ({proteinPct}%)
                </div>
              </div>
              <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-sky-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, proteinPct)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Fats */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5E00] shadow-[0_0_8px_rgba(255,94,0,0.5)]" />
                  <span className="text-sm font-bold text-white">Жиры</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300">
                  <span className="text-[#FF5E00] font-bold">{todayNutrients.fats}г</span> / {dailyTargets.fats}г ({fatsPct}%)
                </div>
              </div>
              <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#FF5E00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, fatsPct)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00FF85] shadow-[0_0_8px_rgba(0,255,133,0.5)]" />
                  <span className="text-sm font-bold text-white">Углеводы</span>
                </div>
                <div className="text-xs font-semibold text-neutral-300">
                  <span className="text-[#00FF85] font-bold">{todayNutrients.carbs}г</span> / {dailyTargets.carbs}г ({carbsPct}%)
                </div>
              </div>
              <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#00FF85]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, carbsPct)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meals Sections: Breakfast, Lunch, Dinner, Snack */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white tracking-tight">
          Приемы пищи за сегодня
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MealSection
            mealKey="breakfast"
            title="Завтрак"
            icon="🍳"
            items={meals.breakfast || []}
            onOpenAdd={openAddModal}
          />

          <MealSection
            mealKey="lunch"
            title="Обед"
            icon="🍗"
            items={meals.lunch || []}
            onOpenAdd={openAddModal}
          />

          <MealSection
            mealKey="dinner"
            title="Ужин"
            icon="🥗"
            items={meals.dinner || []}
            onOpenAdd={openAddModal}
          />

          <MealSection
            mealKey="snack"
            title="Перекусы"
            icon="🍎"
            items={meals.snack || []}
            onOpenAdd={openAddModal}
          />
        </div>
      </div>

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={modalState.isOpen}
        defaultMealType={modalState.mealType}
        onClose={closeAddModal}
      />
    </div>
  );
};
