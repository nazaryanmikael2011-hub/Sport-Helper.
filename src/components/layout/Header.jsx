import React from 'react';
import { Flame, Zap, ShoppingBag, User } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Header = ({ activeTab, setActiveTab, onOpenCart, onOpenAuth }) => {
  const { user, streak, levelInfo, cart } = useFitness();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF85] to-[#10B981] p-0.5 shadow-neon-green flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0A0A0C] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00FF85] fill-[#00FF85]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-wider text-white">
                SPORT<span className="text-[#00FF85]">HELPER</span>
              </span>
              <span className="text-[10px] bg-[#00FF85]/20 text-[#00FF85] font-bold px-1.5 py-0.2 rounded border border-[#00FF85]/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase hidden sm:block">
              Элитный фитнес & воркаут
            </p>
          </div>
        </div>

        {/* Status Indicators & Fast Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak indicator */}
          <div
            title="Дней подряд активности"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5E00]/10 border border-[#FF5E00]/25 text-[#FF5E00] text-xs font-bold"
          >
            <Flame className="w-4 h-4 fill-[#FF5E00] animate-bounce" style={{ animationDuration: '2s' }} />
            <span>{streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}</span>
          </div>

          {/* Level & XP Capsule */}
          <div
            onClick={() => setActiveTab('profile')}
            title="Текущий уровень и прогресс"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00FF85]/40 transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-[#00FF85]/20 text-[#00FF85] flex items-center justify-center text-[10px] font-black border border-[#00FF85]/40">
              {levelInfo.level}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-neutral-200">
                Ур. {levelInfo.level}
              </span>
              <span className="text-[10px] text-neutral-400">
                {levelInfo.title}
              </span>
            </div>
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="Корзина покупок"
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF85]/40 text-neutral-300 hover:text-white transition-all group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-[#00FF85] transition-colors" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#00FF85] text-black font-black text-xs rounded-full flex items-center justify-center px-1 shadow-neon-green">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Toggle */}
          {user.isLoggedIn ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 pl-1.5 sm:pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#00FF85]/50"
              />
              <span className="text-xs font-semibold text-neutral-200 hidden md:inline max-w-[100px] truncate">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold text-xs shadow-neon-green transition-all"
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
