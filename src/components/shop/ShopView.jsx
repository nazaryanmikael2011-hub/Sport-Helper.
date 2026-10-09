import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, ShoppingBag, Flame, Dumbbell } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockShopProducts } from '../../data/mockShop';
import { ProductCard } from './ProductCard';

export const ShopView = ({ onOpenCart }) => {
  const { profile, cart } = useFitness();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { id: 'all', label: 'Все товары' },
    { id: 'Оборудование', label: 'Оборудование' },
    { id: 'Аксессуары', label: 'Аксессуары' },
    { id: 'Питание', label: 'Спортпит' },
    { id: 'Одежда', label: 'Одежда' },
  ];

  // Smart Recommendations tailored to user goal:
  // If gain_muscle: pull-up bar (турник), bands (резинки), protein, dumbbells, parallettes, creatine
  // If lose_weight / boxing: speed rope (скакалка), fat burner (L-карнитин), yoga mat, rashguard
  const recommendedProducts = mockShopProducts.filter((product) => {
    if (product.recommendedGoals && Array.isArray(product.recommendedGoals)) {
      if (product.recommendedGoals.includes(profile.goal) || product.recommendedGoals.includes('all')) {
        return true;
      }
    }
    return product.recommendedGoal === profile.goal || product.recommendedGoal === 'all';
  });

  // Filtered catalog
  const filteredProducts = mockShopProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Smart Recommendations Section */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-card border border-[#00FF85]/30 overflow-hidden shadow-[0_0_30px_-10px_rgba(0,255,133,0.15)]">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00FF85] text-black shadow-neon-green">
                Умная рекомендация
              </span>
              <span className="text-xs text-neutral-400 font-semibold">
                Под цель: {profile.goal === 'gain_muscle' ? 'Набор массы & Воркаут' : profile.goal === 'boxing' ? 'Бокс & Выносливость' : 'Похудение & Рельеф'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {profile.goal === 'gain_muscle'
                ? 'Рекомендуем для калистеники, турников и набора массы'
                : 'Рекомендуем для жиросжигания, бокса и взрывного кардио'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
              {profile.goal === 'gain_muscle'
                ? 'Прогрессируй в подтягиваниях, L-sit и Tuck Planche с надежным турником, петлями сопротивления и качественным протеином.'
                : 'Увеличивай выносливость и расход калорий со скоростной скакалкой Pro, матом для растяжки и термогенным L-карнитином.'}
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-bold transition-all shrink-0 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#00FF85]" />
            <span>Корзина ({totalCartCount})</span>
          </button>
        </div>

        {/* Recommended items carousel / grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedProducts.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} product={prod} isRecommended />
          ))}
        </div>
      </div>

      {/* Catalog Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по магазину..."
            className="w-full bg-[#1A1A24] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
          />
        </div>
      </div>

      {/* Full Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
