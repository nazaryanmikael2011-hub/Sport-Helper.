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
      className={`glass-card rounded-3xl overflow-hidden border transition-all flex flex-col justify-between ${
        isRecommended
          ? 'border-[#00FF85]/30 hover:border-[#00FF85]/60 shadow-[0_0_20px_-8px_rgba(0,255,133,0.2)]'
          : 'border-white/5 hover:border-white/15'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-900 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />

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
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold ml-1 text-white">{product.rating}</span>
            </div>
            <span>•</span>
            <span className="text-[11px] text-neutral-500">
              {product.reviewsCount} отзывов
            </span>
          </div>

          <h4 className="font-black text-white text-sm sm:text-base leading-snug line-clamp-2">
            {product.name}
          </h4>

          <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Features pills */}
          {product.features && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-[10px] text-neutral-300 px-2 py-0.5 rounded-lg bg-white/5 border border-white/5"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Buy Button */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg sm:text-xl font-black text-white">
              {formatCurrency(product.price)}
            </div>
            {product.oldPrice && (
              <span className="text-xs text-neutral-500 line-through">
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
