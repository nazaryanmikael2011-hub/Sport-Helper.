import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { formatCurrency } from '../../utils/formatters';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, checkout } = useFitness();

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 5000;
  const freeShippingDiff = Math.max(0, freeShippingThreshold - totalAmount);

  const handleCheckout = () => {
    checkout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="w-screen max-w-md bg-[#121217] border-l border-white/10 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Корзина экипировки
                </h3>
                <span className="text-xs text-neutral-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'товар' : 'товаров'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white bg-white/5 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-neutral-300">
                {freeShippingDiff === 0
                  ? '🎉 Доставка бесплатно!'
                  : `До бесплатной доставки: ${formatCurrency(freeShippingDiff)}`}
              </span>
              <span className="text-neutral-400">
                {Math.min(100, Math.round((totalAmount / freeShippingThreshold) * 100))}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00FF85] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalAmount / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-4 text-3xl">
                  🛒
                </div>
                <h4 className="text-base font-bold text-white mb-1">Корзина пуста</h4>
                <p className="text-xs text-neutral-400 max-w-xs">
                  Выбери спортивный инвентарь или питание из каталога для достижения своих целей.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/5"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.product.name}
                    </h5>
                    <div className="text-xs font-black text-[#00FF85] mt-0.5">
                      {formatCurrency(item.product.price)}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#121217] space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Стоимость товаров:</span>
                  <span className="text-white font-medium">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка курьером:</span>
                  <span className={freeShippingDiff === 0 ? 'text-[#00FF85] font-semibold' : 'text-white'}>
                    {freeShippingDiff === 0 ? 'Бесплатно' : '390 ₽'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/5">
                  <span>Итого к оплате:</span>
                  <span className="text-[#00FF85]">
                    {formatCurrency(totalAmount + (freeShippingDiff === 0 ? 0 : 390))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#00FF85]" />
                <span>Гарантия качества & Быстрая доставка по РФ</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
