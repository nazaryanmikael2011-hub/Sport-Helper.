import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Dumbbell, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Activity, 
  Zap, 
  Scale, 
  Ruler, 
  Calendar,
  User,
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { calculateDailyTargets, calculateBMI } from '../../utils/calculations';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 240 : -240,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.22 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 240 : -240,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 30 },
      opacity: { duration: 0.18 },
    },
  }),
};

export const OnboardingFlow = ({ isOpen, onClose }) => {
  const { finishOnboarding, register } = useFitness();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form State
  const [accountData, setAccountData] = useState({
    name: 'Алексей Смирнов',
    email: 'alex.athlete@sporthelper.io',
    password: 'password123',
  });

  const [metricsData, setMetricsData] = useState({
    age: 25,
    weight: 78.5,
    targetWeight: 75.0,
    height: 180,
    gender: 'male',
    activityLevel: 1.4,
  });

  // Focus: 'lose_weight' | 'gain_muscle' | 'calisthenics_strength'
  const [selectedFocus, setSelectedFocus] = useState('calisthenics_strength');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Complete Registration & Onboarding
      register(accountData.email, accountData.name);
      finishOnboarding({
        ...metricsData,
        goal: selectedFocus,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const liveBmi = calculateBMI(metricsData.weight, metricsData.height);
  const liveTargets = calculateDailyTargets({
    weight: metricsData.weight,
    height: metricsData.height,
    age: metricsData.age,
    gender: metricsData.gender,
    goal: selectedFocus,
    activityLevel: metricsData.activityLevel,
  });

  const focusOptions = [
    {
      id: 'lose_weight',
      title: 'Похудение',
      subtitle: 'Жиросжигание, кардио-сессии, HIIT и дефицит калорий',
      icon: Flame,
      badge: '-20% ккал',
      accent: '#FF5E00',
      description: 'Безопасный дефицит для сушки с высоким содержанием белка (2.2 г/кг) для сохранения мышц.'
    },
    {
      id: 'gain_muscle',
      title: 'Набор массы',
      subtitle: 'Набор мышечной массы, профицит калорий и гипертрофия',
      icon: Dumbbell,
      badge: '+15% ккал',
      accent: '#00FF85',
      description: 'Анаболический профицит калорий для максимального роста мышечных волокон и силовых показателей.'
    },
    {
      id: 'calisthenics_strength',
      title: 'Силовые элементы и калистеника',
      subtitle: 'Воркаут со своим весом: L-sit, Tuck Planche, выходы силой',
      icon: Zap,
      badge: 'Атлетический баланс',
      accent: '#38BDF8',
      description: 'Оптимальное соотношение силы к весу тела, статические удержания горизонта и уголка.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-[#121217] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col my-auto overflow-hidden"
      >
        {/* Glow ambient */}
        <div className="absolute -top-24 right-0 w-72 h-72 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Step Progress Tracker */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-9 bg-[#00FF85] shadow-neon-green'
                    : s < step
                    ? 'w-5 bg-emerald-600'
                    : 'w-5 bg-neutral-800'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-neutral-400">
            Шаг {step} из 3 • {step === 1 ? 'Аккаунт' : step === 2 ? 'Параметры' : 'Фокус'}
          </span>
        </div>

        {/* Multi-step Sliding Content */}
        <div className="relative overflow-hidden min-h-[360px] flex flex-col justify-between">
          <AnimatePresence custom={direction} mode="wait">
            {/* STEP 1: ACCOUNT CREATION */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Шаг 1: Создание аккаунта атлета
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Введи свои данные для создания персонального профиля
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Имя / Никнейм
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={accountData.name}
                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                        placeholder="Например: Артем Смирнов"
                        className="w-full bg-[#1A1A24] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Электронная почта
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        required
                        value={accountData.email}
                        onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                        placeholder="athlete@sporthelper.io"
                        className="w-full bg-[#1A1A24] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Пароль
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="password"
                        required
                        value={accountData.password}
                        onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A24] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#00FF85]"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Пароль защищен и зашифрован локально</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PHYSICAL METRICS (SLIDERS & INPUTS) */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Шаг 2: Физические показатели
                    </h2>
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${liveBmi.color}20`,
                        color: liveBmi.color,
                        border: `1px solid ${liveBmi.color}40`
                      }}
                    >
                      ИМТ: {liveBmi.bmi} ({liveBmi.label})
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Используй ползунки или введи числа напрямую
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Age slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Возраст</span>
                      <span className="text-sm font-black text-white">{metricsData.age} лет</span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="75"
                      value={metricsData.age}
                      onChange={(e) => setMetricsData({ ...metricsData, age: parseInt(e.target.value, 10) })}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                  </div>

                  {/* Weight slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Текущий вес</span>
                      <span className="text-sm font-black text-[#00FF85]">{metricsData.weight} кг</span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="150"
                      step="0.5"
                      value={metricsData.weight}
                      onChange={(e) => setMetricsData({ ...metricsData, weight: parseFloat(e.target.value) })}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                  </div>

                  {/* Target Weight slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Желаемый (целевой) вес</span>
                      <span className="text-sm font-black text-[#FF5E00]">{metricsData.targetWeight} кг</span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="150"
                      step="0.5"
                      value={metricsData.targetWeight}
                      onChange={(e) => setMetricsData({ ...metricsData, targetWeight: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF5E00] cursor-pointer"
                    />
                  </div>

                  {/* Height slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-neutral-400 uppercase">Рост</span>
                      <span className="text-sm font-black text-white">{metricsData.height} см</span>
                    </div>
                    <input
                      type="range"
                      min="140"
                      max="215"
                      value={metricsData.height}
                      onChange={(e) => setMetricsData({ ...metricsData, height: parseInt(e.target.value, 10) })}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: FOCUS SELECTION (CARDS WITH ICONS) */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3.5"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Шаг 3: Выбор главного фокуса
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Выбери направление — алгоритм рассчитает БЖУ и подберет тренировки
                  </p>
                </div>

                <div className="space-y-2.5">
                  {focusOptions.map((opt) => {
                    const isSelected = selectedFocus === opt.id;
                    const Icon = opt.icon;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedFocus(opt.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-gradient-to-r from-white/[0.08] to-transparent border-white/30 shadow-lg'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                        }`}
                        style={{
                          borderColor: isSelected ? opt.accent : undefined
                        }}
                      >
                        <div
                          className="p-2.5 rounded-xl shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${opt.accent}20`,
                            color: opt.accent
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white text-sm sm:text-base">
                              {opt.title}
                            </h4>
                            <span
                              className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${opt.accent}20`,
                                color: opt.accent
                              }}
                            >
                              {opt.badge}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-400 mt-0.5 leading-snug">
                            {opt.subtitle}
                          </p>
                        </div>

                        <div className="shrink-0 mt-1">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#00FF85] border-[#00FF85] text-black'
                                : 'border-neutral-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Instant Plan Preview Pill */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">
                    Расчет калорий: <strong className="text-white">{liveTargets.calories} ккал</strong>
                  </span>
                  <span className="text-neutral-400">
                    Белки: <strong className="text-sky-400">{liveTargets.protein}г</strong> • Жиры: <strong className="text-[#FF5E00]">{liveTargets.fats}г</strong>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10 shrink-0">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-neon-green transition-all ml-auto"
          >
            <span>{step === 3 ? 'Завершить регистрацию 🚀' : 'Продолжить'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
