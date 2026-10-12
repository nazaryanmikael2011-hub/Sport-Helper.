import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, Utensils, Check, Flame } from 'lucide-react';
import { mockFoods, getCalorieLoadInfo } from '../../data/mockFoods';
import { useFitness } from '../../context/FitnessContext';

export const AddFoodModal = ({ isOpen, onClose, defaultMealType = 'breakfast' }) => {
  const { addMealItem } = useFitness();
  const [selectedMeal, setSelectedMeal] = useState(defaultMealType);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(mockFoods[0]);
  const [grams, setGrams] = useState(mockFoods[0]?.defaultPortionGrams || 150);

  if (!isOpen) return null;

  const mealSlots = [
    { id: 'breakfast', label: 'Завтрак', icon: '🍳' },
    { id: 'lunch', label: 'Обед', icon: '🍗' },
    { id: 'dinner', label: 'Ужин', icon: '🥗' },
    { id: 'snack', label: 'Перекус', icon: '🍎' },
  ];

  const categories = [
    { id: 'all', label: 'Все блюда' },
    { id: 'Завтрак', label: 'Завтрак 🍳' },
    { id: 'Обед', label: 'Обед 🍗' },
    { id: 'Ужин', label: 'Ужин 🥗' },
    { id: 'Перекус', label: 'Перекус 🍎' },
    { id: 'Фастфуд', label: 'Фастфуд 🍔' },
  ];

  const filteredFoods = mockFoods.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const ratio = (grams || 100) / 100;
  const previewCalories = Math.round((selectedFood?.caloriesPer100g || 0) * ratio);
  const previewProtein = +((selectedFood?.proteinPer100g || 0) * ratio).toFixed(1);
  const previewFats = +((selectedFood?.fatsPer100g || 0) * ratio).toFixed(1);
  const previewCarbs = +((selectedFood?.carbsPer100g || 0) * ratio).toFixed(1);

  // Traffic light calorie load indicator for currently calculated portion
  const loadInfo = getCalorieLoadInfo(previewCalories);

  const handleAdd = () => {
    if (!selectedFood) return;
    addMealItem(selectedMeal, selectedFood, grams);
    onClose();
  };

  const quickGrams = [50, 100, 150, 200, 250, 300];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Glow ambient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#00FF85]/15 text-emerald-600 dark:text-[#00FF85]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">Добавить в дневник</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                  {mockFoods.length} блюд
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Поиск с цветовой индикацией калорийности (Светофор)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meal Slot Selector (Завтрак / Обед / Ужин / Перекус) */}
        <div className="grid grid-cols-4 gap-1.5 pt-3 shrink-0">
          {mealSlots.map((mt) => (
            <button
              key={mt.id}
              onClick={() => setSelectedMeal(mt.id)}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                selectedMeal === mt.id
                  ? 'bg-[#00FF85] text-black shadow-neon-green font-black'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <span>{mt.icon}</span>
              <span className="truncate">{mt.label}</span>
            </button>
          ))}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2 shrink-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white dark:bg-white/15 dark:text-white border border-gray-700 dark:border-white/30 shadow-sm'
                    : 'bg-gray-100 dark:bg-white/[0.03] text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative mb-2 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск блюд (курица, рис, творог, бургер, пицца...)"
            className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
          />
        </div>

        {/* Food Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 my-1 max-h-56">
          {filteredFoods.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400 dark:text-neutral-500 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
              Ничего не найдено по запросу «{searchQuery}».
            </div>
          ) : (
            filteredFoods.map((food) => {
              const isSelected = selectedFood?.id === food.id;
              const foodLoad = getCalorieLoadInfo(
                Math.round(food.caloriesPer100g * ((food.defaultPortionGrams || 150) / 100))
              );

              return (
                <div
                  key={food.id}
                  onClick={() => {
                    setSelectedFood(food);
                    setGrams(food.defaultPortionGrams || 150);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl cursor-pointer border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#00FF85]/10 dark:bg-white/[0.08] border-[#00FF85] shadow-[0_0_15px_rgba(0,255,133,0.15)]'
                      : 'bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Realistic Food Photo Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-neutral-900">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0 right-0 text-xs px-0.5 bg-black/60 rounded text-white">
                        {food.icon}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                          {food.name}
                        </h5>
                        {/* Traffic light badge on food card */}
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md border flex items-center gap-1 shrink-0 ${foodLoad.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${foodLoad.dotClass}`} />
                          <span>{foodLoad.label}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                        <span className="font-semibold text-gray-900 dark:text-neutral-200">
                          {food.caloriesPer100g} ккал / 100г
                        </span>
                        <span>•</span>
                        <span>Б: {food.proteinPer100g}г</span>
                        <span>Ж: {food.fatsPer100g}г</span>
                        <span>У: {food.carbsPer100g}г</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 hidden sm:inline">
                      порция ~{food.defaultPortionGrams}г
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#00FF85] border-[#00FF85] text-black shadow-neon-green'
                          : 'border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Item Portion & Dynamic Calorie Load Bar */}
        {selectedFood && (
          <div className="mt-2 pt-3 border-t border-gray-200 dark:border-white/10 shrink-0 space-y-3">
            {/* Traffic Light Status Banner for the currently selected portion */}
            <div
              className="p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs"
              style={{
                backgroundColor: loadInfo.bg,
                borderColor: loadInfo.border,
              }}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${loadInfo.dotClass} animate-pulse`} />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">
                    {loadInfo.label}: {previewCalories} ккал на порцию {grams}г
                  </span>
                  <span className="text-[10px] text-gray-600 dark:text-gray-400">
                    {loadInfo.sublabel} ({selectedFood.name})
                  </span>
                </div>
              </div>

              {/* Macro breakdown pills */}
              <div className="flex items-center gap-2 text-xs font-bold shrink-0">
                <span className="text-sky-500 dark:text-sky-400">Б: {previewProtein}г</span>
                <span className="text-[#FF5E00]">Ж: {previewFats}г</span>
                <span className="text-[#00FF85]">У: {previewCarbs}г</span>
              </div>
            </div>

            {/* Portion Adjuster */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 dark:text-neutral-300">Порция (граммы):</span>
                <input
                  type="number"
                  min="10"
                  max="1200"
                  step="10"
                  value={grams}
                  onChange={(e) => setGrams(Math.max(1, parseInt(e.target.value, 10) || 0))}
                  className="w-20 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-2.5 py-1 text-xs font-black text-gray-900 dark:text-white text-center focus:outline-none focus:border-[#00FF85]"
                />
              </div>

              {/* Quick Gram Pills */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {quickGrams.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrams(g)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      grams === g
                        ? 'bg-[#00FF85] text-black font-black'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {g}г
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Diary Button */}
            <button
              onClick={handleAdd}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 active:scale-95 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Добавить «{selectedFood.name}» ({previewCalories} ккал)</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
