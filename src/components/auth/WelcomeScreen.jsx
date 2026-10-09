import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Flame, ArrowRight, Sparkles, Dumbbell, Utensils, Award } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const WelcomeScreen = ({ onStartOnboarding, onOpenLogin }) => {
  const { login } = useFitness();

  const handleQuickDemo = () => {
    login('alex.athlete@sporthelper.io', 'Алексей Смирнов');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden selection:bg-[#00FF85] selection:text-black">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00FF85]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FF5E00]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center"
      >
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-neon-green/20">
          <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
          <span className="text-xs font-bold text-neutral-300 tracking-wider uppercase">
            Sport Helper • Pro Fitness Platform
          </span>
        </div>

        {/* Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#00FF85] to-[#10B981] p-0.5 shadow-neon-green flex items-center justify-center mb-6">
          <div className="w-full h-full bg-[#0A0A0C] rounded-[22px] flex items-center justify-center">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#00FF85] fill-[#00FF85]" />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Твой персональный путь к <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF85] via-emerald-400 to-[#14F195]">идеальной форме</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 mt-4 max-w-lg leading-relaxed">
          Научный расчет калорий и БЖУ, адаптивные тренировки со своим весом (L-sit, Tuck Planche), HIIT-жиросжигание и умные рекомендации спортивной экипировки.
        </p>

        {/* Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full my-8">
          <div className="p-4 rounded-2xl glass-card border border-white/5 text-left flex sm:flex-col items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#00FF85]/15 text-[#00FF85]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Адаптивные тренировки</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Воркаут, калистеника, HIIT и силовая база</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5 text-left flex sm:flex-col items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Точный расчет БЖУ</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Формула Миффлина-Сан Жеора под твою цель</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/5 text-left flex sm:flex-col items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF5E00]/15 text-[#FF5E00]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">Геймификация & Стрики</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">Ранги атлета, бейджи и поддержка мотивации</p>
            </div>
          </div>
        </div>

        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            onClick={onStartOnboarding}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-neon-green transition-all"
          >
            <span>Начать регистрацию</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={handleQuickDemo}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-xs sm:text-sm border border-white/10 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#00FF85]" />
            <span>Войти с демо-профилем</span>
          </button>
        </div>

        {/* Already have account */}
        <button
          onClick={onOpenLogin}
          className="mt-6 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          Уже есть аккаунт? <span className="text-[#00FF85] font-semibold underline underline-offset-2">Войти</span>
        </button>
      </motion.div>
    </div>
  );
};
