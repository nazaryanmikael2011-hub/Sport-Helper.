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
    <aside className="hidden lg:flex flex-col w-64 glass-panel border-r border-white/5 min-h-[calc(100vh-65px)] p-4 shrink-0">
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
          {profile.goal === 'gain_muscle' ? 'Набор массы & Сила' : 'Снижение веса'}
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-white/10 px-2 py-1.5 pb-safe backdrop-blur-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#00FF85]' : 'text-neutral-400'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveGlow"
                    className="absolute -inset-1 rounded-full bg-[#00FF85]/20 blur-sm -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400'
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
