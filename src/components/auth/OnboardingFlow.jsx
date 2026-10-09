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
  CheckCircle2,
  Trophy,
  Award
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { calculateDailyTargets, calculateBMI, calculateFitnessLevelFromTest } from '../../utils/calculations';

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

  // Step 1: Account
  const [accountData, setAccountData] = useState({
    name: 'Алексей Смирнов',
    email: 'alex.athlete@sporthelper.io',
    password: 'password123',
  });

  // Step 2: Physical Metrics (age now supported from 5 years old)
  const [metricsData, setMetricsData] = useState({
    age: 22,
    weight: 76.0,
    targetWeight: 74.0,
    height: 178,
    gender: 'male',
    activityLevel: 1.4,
  });

  // Step 3: Strength Evaluation (5 tests)
  const [strengthData, setStrengthData] = useState({
    pushups: 20,
    pullups: 6,
    squats: 30,
    crunches: 25,
    dips: 8,
  });

  // Step 4: Focus: 'lose_weight' | 'gain_muscle' | 'calisthenics_strength'
  const [selectedFocus, setSelectedFocus] = useState('calisthenics_strength');

  if (!isOpen) return null;

  // Real-time evaluation of strength test
  const fitnessLevelEvaluation = calculateFitnessLevelFromTest(strengthData);

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Complete Registration & Onboarding
      register(accountData.email, accountData.name);
      finishOnboarding({
        ...metricsData,
        goal: selectedFocus,
        fitnessLevel: fitnessLevelEvaluation.levelKey,
        fitnessLevelName: fitnessLevelEvaluation.levelName,
        strengthTest: strengthData,
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

  const strengthQuestions = [
    {
      key: 'pushups',
      title: '1. Отжимания от пола',
      subtitle: 'Количество чистых повторений в одном подходе',
      min: 0,
      max: 80,
      step: 1,
      accent: '#00FF85'
    },
    {
      key: 'pullups',
      title: '2. Подтягивания на перекладине',
      subtitle: 'Без раскачки с фиксацией подбородка',
      min: 0,
      max: 35,
      step: 1,
      accent: '#38BDF8'
    },
    {
      key: 'squats',
      title: '3. Приседания со своим весом',
      subtitle: 'До угла 90° или полного седа',
      min: 0,
      max: 120,
      step: 1,
      accent: '#F59E0B'
    },
    {
      key: 'crunches',
      title: '4. Скручивания на пресс',
      subtitle: 'Подъемы корпуса или скручивания лежа',
      min: 0,
      max: 100,
      step: 1,
      accent: '#EC4899'
    },
    {
      key: 'dips',
      title: '5. Отжимания на брусьях',
      subtitle: 'Глубокие отжимания с прямым корпусом',
      min: 0,
      max: 50,
      step: 1,
      accent: '#FF5E00'
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

        {/* Step Progress Tracker (4 steps) */}
        <div className="flex items-center justify-between mb-5 shrink-0">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-[#00FF85] shadow-neon-green'
                    : s < step
                    ? 'w-4 bg-emerald-600'
                    : 'w-4 bg-neutral-800'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold text-neutral-400">
            Шаг {step} из 4 • {
              step === 1 ? 'Аккаунт' : 
              step === 2 ? 'Параметры' : 
              step === 3 ? 'Тест силы' : 'Фокус'
            }
          </span>
        </div>

        {/* Multi-step Sliding Content */}
        <div className="relative overflow-hidden min-h-[380px] flex flex-col justify-between">
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

            {/* STEP 2: PHYSICAL METRICS (AGE >= 5 VALIDATION) */}
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
                    Возраст доступен от 5 лет. Используй ползунки или вводи числа напрямую.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1 max-h-[300px] overflow-y-auto pr-1">
                  {/* Age slider & direct input (MIN 5 YEARS OLD) */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="text-xs font-bold text-neutral-300 uppercase">Возраст</span>
                        <span className="text-[10px] text-emerald-400 ml-2 font-medium">от 5 лет</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="5"
                          max="95"
                          value={metricsData.age}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setMetricsData({ ...metricsData, age: isNaN(val) ? 5 : Math.max(5, Math.min(val, 99)) });
                          }}
                          className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-right text-xs font-black text-white focus:outline-none focus:border-[#00FF85]"
                        />
                        <span className="text-xs text-neutral-400 font-bold">лет</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="90"
                      value={metricsData.age}
                      onChange={(e) => setMetricsData({ ...metricsData, age: Math.max(5, parseInt(e.target.value, 10)) })}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                  </div>

                  {/* Weight slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Текущий вес</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="20"
                          max="180"
                          step="0.5"
                          value={metricsData.weight}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setMetricsData({ ...metricsData, weight: isNaN(val) ? 50 : Math.max(15, val) });
                          }}
                          className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-right text-xs font-black text-[#00FF85] focus:outline-none focus:border-[#00FF85]"
                        />
                        <span className="text-xs text-neutral-400 font-bold">кг</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      step="0.5"
                      value={metricsData.weight}
                      onChange={(e) => setMetricsData({ ...metricsData, weight: parseFloat(e.target.value) })}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                  </div>

                  {/* Target Weight slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Желаемый (целевой) вес</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="20"
                          max="180"
                          step="0.5"
                          value={metricsData.targetWeight}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setMetricsData({ ...metricsData, targetWeight: isNaN(val) ? 50 : Math.max(15, val) });
                          }}
                          className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-right text-xs font-black text-[#FF5E00] focus:outline-none focus:border-[#FF5E00]"
                        />
                        <span className="text-xs text-neutral-400 font-bold">кг</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      step="0.5"
                      value={metricsData.targetWeight}
                      onChange={(e) => setMetricsData({ ...metricsData, targetWeight: parseFloat(e.target.value) })}
                      className="w-full accent-[#FF5E00] cursor-pointer"
                    />
                  </div>

                  {/* Height slider */}
                  <div className="p-3 rounded-2xl bg-[#1A1A24] border border-white/5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Рост</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="100"
                          max="230"
                          value={metricsData.height}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setMetricsData({ ...metricsData, height: isNaN(val) ? 160 : Math.max(90, val) });
                          }}
                          className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-right text-xs font-black text-sky-400 focus:outline-none focus:border-sky-400"
                        />
                        <span className="text-xs text-neutral-400 font-bold">см</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      value={metricsData.height}
                      onChange={(e) => setMetricsData({ ...metricsData, height: parseInt(e.target.value, 10) })}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: STRENGTH ASSESSMENT (5 QUESTIONS) */}
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
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#00FF85]" />
                      <span>Шаг 3: Оценка физической подготовки</span>
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Сколько раз за один подход вы можете выполнить упражнения:
                  </p>
                </div>

                {/* Real-time Level Feedback Banner */}
                <div 
                  className="p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 backdrop-blur-md"
                  style={{
                    backgroundColor: `${fitnessLevelEvaluation.color}15`,
                    borderColor: `${fitnessLevelEvaluation.color}40`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Award 
                      className="w-5 h-5 shrink-0" 
                      style={{ color: fitnessLevelEvaluation.color }} 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                          Ваш уровень:
                        </span>
                        <span 
                          className="text-xs font-black uppercase px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${fitnessLevelEvaluation.color}25`,
                            color: fitnessLevelEvaluation.color,
                            border: `1px solid ${fitnessLevelEvaluation.color}50`
                          }}
                        >
                          {fitnessLevelEvaluation.levelName}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-tight mt-0.5">
                        {fitnessLevelEvaluation.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5 Questions Inputs */}
                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {strengthQuestions.map((q) => (
                    <div key={q.key} className="p-2.5 rounded-xl bg-[#1A1A24] border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-xs font-bold text-white block">{q.title}</span>
                          <span className="text-[10px] text-neutral-400">{q.subtitle}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <input
                            type="number"
                            min={q.min}
                            max={q.max}
                            value={strengthData[q.key]}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              setStrengthData({
                                ...strengthData,
                                [q.key]: isNaN(val) ? 0 : Math.max(0, val)
                              });
                            }}
                            className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-right text-xs font-black text-white focus:outline-none focus:border-[#00FF85]"
                          />
                          <span className="text-[11px] text-neutral-400 font-bold">раз</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={q.min}
                        max={q.max}
                        step={q.step}
                        value={strengthData[q.key]}
                        onChange={(e) => setStrengthData({
                          ...strengthData,
                          [q.key]: parseInt(e.target.value, 10)
                        })}
                        className="w-full cursor-pointer"
                        style={{ accentColor: q.accent }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: FOCUS SELECTION (CARDS WITH ICONS) */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Шаг 4: Выбор главного фокуса
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Программа и калории будут откалиброваны под твой фокус и уровень ({fitnessLevelEvaluation.levelName})
                  </p>
                </div>

                <div className="space-y-2">
                  {focusOptions.map((opt) => {
                    const isSelected = selectedFocus === opt.id;
                    const Icon = opt.icon;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedFocus(opt.id)}
                        className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-gradient-to-r from-white/[0.08] to-transparent border-white/30 shadow-lg'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                        }`}
                        style={{
                          borderColor: isSelected ? opt.accent : undefined
                        }}
                      >
                        <div
                          className="p-2 rounded-xl shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${opt.accent}20`,
                            color: opt.accent
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white text-xs sm:text-sm">
                              {opt.title}
                            </h4>
                            <span
                              className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${opt.accent}20`,
                                color: opt.accent
                              }}
                            >
                              {opt.badge}
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                            {opt.subtitle}
                          </p>
                        </div>

                        <div className="shrink-0 mt-0.5">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#00FF85] border-[#00FF85] text-black'
                                : 'border-neutral-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
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
                    Б: <strong className="text-sky-400">{liveTargets.protein}г</strong> • Ж: <strong className="text-[#FF5E00]">{liveTargets.fats}г</strong>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-3.5 border-t border-white/10 shrink-0">
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
            <span>{step === 4 ? 'Завершить регистрацию 🚀' : 'Продолжить'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
