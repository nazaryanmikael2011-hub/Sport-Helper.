import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const MealSection = ({ mealKey, title, icon, items = [], onOpenAdd }) => {
  const { removeMealItem } = useFitness();

  const totalCalories = items.reduce((sum, item) => sum + (item.calories || 0), 0);
  const totalProtein = +items.reduce((sum, item) => sum + (item.protein || 0), 0).toFixed(1);
  const totalFats = +items.reduce((sum, item) => sum + (item.fats || 0), 0).toFixed(1);
  const totalCarbs = +items.reduce((sum, item) => sum + (item.carbs || 0), 0).toFixed(1);

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-xl shrink-0 border border-white/5">
            {icon}
          </div>
          <div>
            <h4 className="font-bold text-white text-base sm:text-lg">
              {title}
            </h4>
            <span className="text-xs text-neutral-400">
              Б: <strong className="text-sky-400">{totalProtein}г</strong> • Ж:{' '}
              <strong className="text-[#FF5E00]">{totalFats}г</strong> • У:{' '}
              <strong className="text-[#00FF85]">{totalCarbs}г</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-base sm:text-lg font-black text-white">
              {totalCalories}
            </span>
            <span className="text-xs text-neutral-400 ml-1">ккал</span>
          </div>

          <button
            onClick={() => onOpenAdd(mealKey)}
            className="p-2 rounded-xl bg-[#00FF85]/15 hover:bg-[#00FF85]/25 text-[#00FF85] border border-[#00FF85]/30 transition-all group"
            title="Добавить блюдо"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Items list */}
      <div className="mt-3 space-y-2">
        <AnimatePresence>
          {items.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-500 border border-dashed border-white/5 rounded-2xl">
              Пока ничего не добавлено. Нажми «+» чтобы записать прием пищи.
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg">{item.icon || '🥗'}</span>
                  <div className="min-w-0">
                    <h5 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {item.name}
                    </h5>
                    <span className="text-[11px] text-neutral-400">
                      {item.portionGrams}г • Б: {item.protein}г • Ж: {item.fats}г • У: {item.carbs}г
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs font-bold text-neutral-200">
                    {item.calories} ккал
                  </span>
                  <button
                    onClick={() => removeMealItem(mealKey, item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Удалить"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
