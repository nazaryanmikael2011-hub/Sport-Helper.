import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Utensils, 
  Dumbbell, 
  ShoppingBag, 
  UserCircle2,
  Sparkles
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const navItems = [
  { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { id: 'nutrition', label: 'Питание', icon: Utensils },
  { id: 'workouts', label: 'Тренировки', icon: Dumbbell },
  { id: 'shop', label: 'Магазин', icon: ShoppingBag },
  { id: 'profile', label: 'Профиль', icon: UserCircle2 },
];

export const DesktopSidebar = ({ activeTab, setActiveTab }) => {
  const { profile } = useFitness();

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 glass-panel border-r border-white/5 min-h-[calc(100vh-65px)] p-4 shrink-0">
      <div className="space-y-1.5 flex-1">
        <div className="text-[11px] font-bold text-neutral-500 uppercase px-3 py-2 tracking-wider">
          Навигация
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-[#00FF85]/15 to-transparent text-white border-l-2 border-[#00FF85]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#00FF85]' : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
              />
              <span className="tracking-wide">{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00FF85] shadow-neon-green"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Target Goal Summary Card in Sidebar */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#00FF85]" />
          <span className="text-xs font-bold text-neutral-300">
            Текущая цель
          </span>
        </div>
        <p className="text-sm font-semibold text-white">
          {profile.goal === 'gain_muscle' ? 'Набор массы & Сила' : profile.goal === 'calisthenics_strength' ? 'Калистеника & Сила' : 'Снижение веса'}
        </p>
        <p className="text-[11px] text-neutral-400 mt-1">
          Целевой вес: <span className="text-[#00FF85] font-semibold">{profile.targetWeight} кг</span>
        </p>
      </div>
    </aside>
  );
};

export const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav
      aria-label="Мобильная навигация"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-[60] bg-[#0A0A0E] border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] backdrop-blur-xl pb-[max(0.6rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around w-full max-w-lg mx-auto px-1 pt-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 px-1 relative transition-all duration-200 active:scale-95 group focus:outline-none"
            >
              {/* Active top line indicator */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTopIndicator"
                  className="absolute -top-1.5 w-8 h-1 rounded-full bg-[#00FF85] shadow-[0_0_10px_#00FF85]"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              {/* Icon Container with glowing aura when active */}
              <div className="relative flex items-center justify-center p-1">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive 
                      ? 'text-[#00FF85] scale-110 drop-shadow-[0_0_8px_rgba(0,255,133,0.6)]' 
                      : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveGlow"
                    className="absolute -inset-1.5 rounded-full bg-[#00FF85]/15 blur-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-colors duration-200 ${
                  isActive ? 'text-[#00FF85] font-black' : 'text-neutral-400 font-medium group-hover:text-neutral-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
