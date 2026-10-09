import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, Utensils, Sparkles, Check } from 'lucide-react';
import { mockFoods } from '../../data/mockFoods';
import { useFitness } from '../../context/FitnessContext';

export const AddFoodModal = ({ isOpen, onClose, defaultMealType = 'breakfast' }) => {
  const { addMealItem } = useFitness();
  const [selectedMeal, setSelectedMeal] = useState(defaultMealType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(mockFoods[0]);
  const [grams, setGrams] = useState(150);

  if (!isOpen) return null;

  const mealTypes = [
    { id: 'breakfast', label: 'Завтрак', icon: '🍳' },
    { id: 'lunch', label: 'Обед', icon: '🍗' },
    { id: 'dinner', label: 'Ужин', icon: '🥗' },
    { id: 'snack', label: 'Перекус', icon: '🍎' },
  ];

  const filteredFoods = mockFoods.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ratio = (grams || 100) / 100;
  const previewCalories = Math.round((selectedFood?.caloriesPer100g || 0) * ratio);
  const previewProtein = +((selectedFood?.proteinPer100g || 0) * ratio).toFixed(1);
  const previewFats = +((selectedFood?.fatsPer100g || 0) * ratio).toFixed(1);
  const previewCarbs = +((selectedFood?.carbsPer100g || 0) * ratio).toFixed(1);

  const handleAdd = () => {
    if (!selectedFood) return;
    addMealItem(selectedMeal, selectedFood, grams);
    onClose();
  };

  const quickGrams = [50, 100, 150, 200, 250];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-[#121217] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Добавить блюдо</h3>
              <p className="text-xs text-neutral-400">Поиск по базе здоровых продуктов</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meal Category Selector */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {mealTypes.map((mt) => (
            <button
              key={mt.id}
              onClick={() => setSelectedMeal(mt.id)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                selectedMeal === mt.id
                  ? 'bg-[#00FF85] text-black shadow-neon-green font-black'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span>{mt.icon}</span>
              <span className="truncate">{mt.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск (курица, рис, творог, овсянка...)"
            className="w-full bg-[#1A1A24] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
          />
        </div>

        {/* Food List (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-48 my-1">
          {filteredFoods.map((food) => {
            const isSelected = selectedFood?.id === food.id;
            return (
              <div
                key={food.id}
                onClick={() => {
                  setSelectedFood(food);
                  setGrams(food.defaultPortionGrams || 150);
                }}
                className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#00FF85]/10 border-[#00FF85] text-white'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/5 text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl">{food.icon}</span>
                  <div className="min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                      {food.name}
                    </h5>
                    <span className="text-[11px] text-neutral-400">
                      {food.caloriesPer100g} ккал / 100г • Б: {food.proteinPer100g}г • Ж: {food.fatsPer100g}г • У: {food.carbsPer100g}г
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#00FF85] text-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Item Portion & Macro preview */}
        {selectedFood && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-300">
                Размер порции:
              </span>
              <div className="flex items-center gap-1.5">
                {quickGrams.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrams(g)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-all ${
                      grams === g
                        ? 'bg-[#00FF85] text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {g}г
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <input
                type="number"
                min="10"
                max="1000"
                step="10"
                value={grams}
                onChange={(e) => setGrams(Math.max(1, parseInt(e.target.value, 10) || 0))}
                className="w-24 bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-sm font-black text-white focus:outline-none focus:border-[#00FF85]"
              />
              <span className="text-xs text-neutral-400 font-semibold">граммов</span>

              {/* Calculated Macros Badge */}
              <div className="ml-auto flex items-center gap-2 text-xs font-bold">
                <span className="text-[#00FF85]">{previewCalories} ккал</span>
                <span className="text-sky-400">Б: {previewProtein}г</span>
                <span className="text-[#FF5E00]">Ж: {previewFats}г</span>
                <span className="text-neutral-300">У: {previewCarbs}г</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-3 px-4 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Добавить в прием пищи</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
