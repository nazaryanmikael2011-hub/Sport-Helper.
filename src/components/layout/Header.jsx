import React from 'react';
import { Flame, Zap, ShoppingBag, Clock, Crown, Sun, Moon } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Header = ({ activeTab, setActiveTab, onOpenCart, onOpenAuth }) => {
  const { user, streak, levelInfo, cart, isPremium, trialDaysLeft, theme, toggleTheme } = useFitness();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-200 dark:border-gray-800 px-3.5 sm:px-6 py-2.5 sm:py-3 transition-all">
      <div className="max-w-7xl mx-auto">
        {/* ================= DESKTOP LAYOUT (>= 768px) ================= */}
        <div className="hidden md:flex items-center justify-between gap-4">
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
                <span className="font-black text-xl tracking-wider text-gray-900 dark:text-white">
                  SPORT<span className="text-[#00FF85]">HELPER</span>
                </span>
                <span className="text-[10px] bg-[#00FF85]/20 text-emerald-600 dark:text-[#00FF85] font-bold px-1.5 py-0.2 rounded border border-[#00FF85]/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-neutral-400 font-medium tracking-widest uppercase">
                Элитный фитнес & воркаут
              </p>
            </div>
          </div>

          {/* Status Indicators & Fast Actions */}
          <div className="flex items-center gap-2.5">
            {/* Global Trial / Premium Counter */}
            {isPremium ? (
              <button
                onClick={() => setActiveTab('profile')}
                title="Премиум статус активен"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-xs font-black shadow-[0_0_15px_-3px_rgba(251,191,36,0.25)] hover:border-amber-400/70 transition-all cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30" />
                <span>Премиум активирован</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('profile')}
                title="Бесплатный период 90 дней. Нажмите для перехода к поддержке и премиуму."
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-all cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                <span>Бесплатный период: {trialDaysLeft || 90} дней</span>
              </button>
            )}

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
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-[#00FF85]/40 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#00FF85]/20 text-emerald-600 dark:text-[#00FF85] flex items-center justify-center text-[10px] font-black border border-[#00FF85]/40">
                {levelInfo.level}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 dark:text-neutral-200">
                  Ур. {levelInfo.level}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-neutral-400">
                  {levelInfo.title}
                </span>
              </div>
            </div>

            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
              aria-label="Смена темы оформления"
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-[#00FF85]/40 text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-all group cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-500 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              aria-label="Корзина покупок"
              className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-[#00FF85]/40 text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-all group cursor-pointer"
            >
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#00FF85] text-black font-black text-xs rounded-full flex items-center justify-center px-1 shadow-neon-green">
                  {totalCartCount}
                </span>
              )}
              <ShoppingBag className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-[#00FF85] transition-colors" />
            </button>

            {/* User Profile / Auth Toggle */}
            {user.isLoggedIn ? (
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pl-1.5 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#00FF85]/50"
                />
                <span className="text-xs font-semibold text-gray-800 dark:text-neutral-200 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold text-xs shadow-neon-green transition-all cursor-pointer"
              >
                Войти
              </button>
            )}
          </div>
        </div>

        {/* ================= MOBILE 2-ROW RESPONSIVE LAYOUT (< 768px) ================= */}
        <div className="flex md:hidden flex-col">
          {/* Строка 1 (Верхняя): Логотип слева и кнопка таймера (90 дн. триал) справа */}
          <div className="w-full flex justify-between items-center">
            {/* Логотип слева */}
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FF85] to-[#10B981] p-0.5 shadow-neon-green flex items-center justify-center">
                <div className="w-full h-full bg-[#0A0A0C] rounded-[6px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#00FF85] fill-[#00FF85]" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-black text-base tracking-wider text-gray-900 dark:text-white">
                  SPORT<span className="text-[#00FF85]">HELPER</span>
                </span>
                <span className="text-[9px] bg-[#00FF85]/20 text-emerald-600 dark:text-[#00FF85] font-black px-1 py-0.2 rounded border border-[#00FF85]/30">
                  PRO
                </span>
              </div>
            </div>

            {/* Кнопка таймера (90 дн. триал) справа (+ кнопка смены темы) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
                aria-label="Смена темы"
                className="p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-500" />
                )}
              </button>

              {isPremium ? (
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-xs font-black cursor-pointer shadow-sm"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30" />
                  <span>Премиум 👑</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-bold cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
                  <span>{trialDaysLeft || 90} дн. триал</span>
                </button>
              )}
            </div>
          </div>

          {/* Строка 2 (Нижняя, под логотипом): Бейджи опыта (XP), стрик дней и уровень */}
          <div className="mt-3 flex justify-start gap-4 overflow-x-auto no-scrollbar py-0.5 w-full">
            {/* XP Badge */}
            <div
              onClick={() => setActiveTab('profile')}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-[#00FF85] text-xs font-bold cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{levelInfo.xpCurrentInLevel} / {levelInfo.xpNeeded} XP</span>
            </div>

            {/* Streak Pill */}
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5E00]/10 border border-[#FF5E00]/25 text-[#FF5E00] text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-[#FF5E00]" />
              <span>{streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}</span>
            </div>

            {/* Level & Title Pill */}
            <div
              onClick={() => setActiveTab('profile')}
              className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-neutral-200 text-xs font-bold cursor-pointer hover:border-[#00FF85]/30"
            >
              <div className="w-4 h-4 rounded-full bg-[#00FF85]/20 text-emerald-600 dark:text-[#00FF85] flex items-center justify-center text-[10px] font-black border border-[#00FF85]/40">
                {levelInfo.level}
              </div>
              <span className="truncate max-w-[140px]">
                Ур. {levelInfo.level} • {levelInfo.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
