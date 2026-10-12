import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { formatCurrency } from '../../utils/formatters';

export const ProductCard = ({ product, isRecommended = false }) => {
  const { cart, addToCart } = useFitness();

  const inCart = cart.find((item) => item.product.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border transition-all flex flex-col justify-between shadow-sm ${
        isRecommended
          ? 'border-[#00FF85]/30 hover:border-[#00FF85]/60 shadow-[0_0_20px_-8px_rgba(0,255,133,0.2)]'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-white/15'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-900 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-[#121217] via-transparent to-transparent" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00FF85] text-black shadow-neon-green">
              {product.badge}
            </span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-neutral-300 backdrop-blur-md border border-white/10">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold ml-1 text-gray-900 dark:text-white">{product.rating}</span>
            </div>
            <span>•</span>
            <span className="text-[11px] text-gray-500 dark:text-neutral-500">
              {product.reviewsCount} отзывов
            </span>
          </div>

          <h4 className="font-black text-gray-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-2">
            {product.name}
          </h4>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Features pills */}
          {product.features && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-[10px] text-gray-700 dark:text-neutral-300 px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Smart Target Recommendation Badge */}
          {product.smartTargetBadge && (
            <div className="flex items-center gap-1.5 mt-2.5 px-2.5 py-1 rounded-xl bg-[#00FF85]/10 border border-[#00FF85]/30 text-[11px] text-[#00FF85] font-black">
              <span>🎯 Рекомендовано:</span>
              <span className="text-gray-900 dark:text-white font-bold">{product.smartTargetBadge}</span>
            </div>
          )}
        </div>

        {/* Price & Buy Button */}
        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </div>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 dark:text-neutral-500 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              inCart
                ? 'bg-[#00FF85]/20 text-[#00FF85] border border-[#00FF85]/40'
                : 'bg-[#00FF85] hover:bg-[#00FF85]/90 text-black shadow-neon-green font-extrabold'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>В корзине ({inCart.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Купить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
