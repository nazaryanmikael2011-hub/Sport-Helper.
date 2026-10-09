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
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Award,
  AlertCircle
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
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Step 1: Account (ALL INITIALIZED AS EMPTY STRINGS)
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Step 2: Physical Metrics (ALL INITIALIZED AS EMPTY STRINGS)
  const [metricsData, setMetricsData] = useState({
    age: '',
    weight: '',
    targetWeight: '',
    height: '',
    gender: 'male',
    activityLevel: 1.4,
  });

  // Step 3: Strength Evaluation (ALL INITIALIZED AS EMPTY STRINGS)
  const [strengthData, setStrengthData] = useState({
    pushups: '',
    pullups: '',
    squats: '',
    crunches: '',
    dips: '',
  });

  // Step 4: Focus: 'lose_weight' | 'gain_muscle' | 'calisthenics_strength'
  const [selectedFocus, setSelectedFocus] = useState('calisthenics_strength');

  if (!isOpen) return null;

  // Real-time evaluation of strength test (using 0 for any blank fields during preview)
  const activeStrengthForEval = {
    pushups: Number(strengthData.pushups) || 0,
    pullups: Number(strengthData.pullups) || 0,
    squats: Number(strengthData.squats) || 0,
    crunches: Number(strengthData.crunches) || 0,
    dips: Number(strengthData.dips) || 0,
  };
  const isAnyStrengthFilled = Object.values(strengthData).some((val) => val !== '');
  const fitnessLevelEvaluation = calculateFitnessLevelFromTest(activeStrengthForEval);

  // Live calculations for BMI & Targets
  const parsedWeight = parseFloat(metricsData.weight) || 75;
  const parsedHeight = parseFloat(metricsData.height) || 178;
  const parsedAge = parseInt(metricsData.age, 10) || 20;

  const liveBmi = calculateBMI(parsedWeight, parsedHeight);
  const liveTargets = calculateDailyTargets({
    weight: parsedWeight,
    height: parsedHeight,
    age: parsedAge,
    gender: metricsData.gender,
    goal: selectedFocus,
    activityLevel: metricsData.activityLevel,
  });

  // Validation functions per step
  const validateStep1 = () => {
    const errs = {};
    if (!accountData.name || !accountData.name.trim()) {
      errs.name = 'Обязательное поле. Введите имя';
    } else if (accountData.name.trim().length < 2) {
      errs.name = 'Имя должно содержать минимум 2 символа';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!accountData.email || !accountData.email.trim()) {
      errs.email = 'Обязательное поле. Введите почту';
    } else if (!emailRegex.test(accountData.email.trim())) {
      errs.email = 'Введите корректную почту (например, athlete@mail.ru)';
    }

    if (!accountData.password) {
      errs.password = 'Обязательное поле. Введите пароль';
    } else if (accountData.password.length < 6) {
      errs.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};

    // Age validation (>= 5 years)
    if (metricsData.age === '' || metricsData.age === null || metricsData.age === undefined) {
      errs.age = 'Обязательное поле. Введите ваш возраст';
    } else {
      const ageNum = parseInt(metricsData.age, 10);
      if (isNaN(ageNum) || ageNum < 5 || ageNum > 99) {
        errs.age = 'Возраст должен быть от 5 до 99 лет';
      }
    }

    // Weight validation
    if (metricsData.weight === '' || metricsData.weight === null || metricsData.weight === undefined) {
      errs.weight = 'Обязательное поле. Введите текущий вес';
    } else {
      const wNum = parseFloat(metricsData.weight);
      if (isNaN(wNum) || wNum < 15 || wNum > 250) {
        errs.weight = 'Введите корректный вес (от 15 до 250 кг)';
      }
    }

    // Target Weight validation
    if (metricsData.targetWeight === '' || metricsData.targetWeight === null || metricsData.targetWeight === undefined) {
      errs.targetWeight = 'Обязательное поле. Введите целевой вес';
    } else {
      const twNum = parseFloat(metricsData.targetWeight);
      if (isNaN(twNum) || twNum < 15 || twNum > 250) {
        errs.targetWeight = 'Введите корректный целевой вес (от 15 до 250 кг)';
      }
    }

    // Height validation
    if (metricsData.height === '' || metricsData.height === null || metricsData.height === undefined) {
      errs.height = 'Обязательное поле. Введите ваш рост';
    } else {
      const hNum = parseInt(metricsData.height, 10);
      if (isNaN(hNum) || hNum < 80 || hNum > 240) {
        errs.height = 'Введите корректный рост (от 80 до 240 см)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    const testKeys = [
      { key: 'pushups', name: 'отжимания' },
      { key: 'pullups', name: 'подтягивания' },
      { key: 'squats', name: 'приседания' },
      { key: 'crunches', name: 'скручивания' },
      { key: 'dips', name: 'отжимания на брусьях' },
    ];

    testKeys.forEach(({ key, name }) => {
      const val = strengthData[key];
      if (val === '' || val === null || val === undefined) {
        errs[key] = `Укажите количество (или 0)`;
      } else {
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 0) {
          errs[key] = 'Число должно быть от 0';
        }
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      if (!validateStep2()) return;
      setDirection(1);
      setStep(3);
    } else if (step === 3) {
      if (!validateStep3()) return;
      setDirection(1);
      setStep(4);
    } else {
      // Step 4: Finalize
      register(accountData.email.trim(), accountData.name.trim());
      finishOnboarding({
        weight: parseFloat(metricsData.weight) || 75,
        targetWeight: parseFloat(metricsData.targetWeight) || 70,
        height: parseInt(metricsData.height, 10) || 178,
        age: parseInt(metricsData.age, 10) || 20,
        gender: metricsData.gender,
        goal: selectedFocus,
        fitnessLevel: fitnessLevelEvaluation.levelKey,
        fitnessLevelName: fitnessLevelEvaluation.levelName,
        strengthTest: {
          pushups: Number(strengthData.pushups) || 0,
          pullups: Number(strengthData.pullups) || 0,
          squats: Number(strengthData.squats) || 0,
          crunches: Number(strengthData.crunches) || 0,
          dips: Number(strengthData.dips) || 0,
        },
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

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
      subtitle: 'Чистые повторения за один подход',
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
      subtitle: 'Глубокий сед до параллели полу',
      min: 0,
      max: 120,
      step: 1,
      accent: '#F59E0B'
    },
    {
      key: 'crunches',
      title: '4. Скручивания на пресс',
      subtitle: 'Подъемы корпуса или скручивания',
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
        <div className="relative overflow-hidden min-h-[390px] flex flex-col justify-between">
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
                    Заполните форму для регистрации личного кабинета
                  </p>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Имя / Никнейм <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => {
                          setAccountData({ ...accountData, name: e.target.value });
                          if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                        }}
                        placeholder="Введите имя"
                        className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-2 border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                            : 'border border-white/10 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/30'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Электронная почта <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => {
                          setAccountData({ ...accountData, email: e.target.value });
                          if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                        }}
                        placeholder="Введите почту"
                        className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-2 border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                            : 'border border-white/10 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/30'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Password field with show/hide toggle */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                      Пароль <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={accountData.password}
                        onChange={(e) => {
                          setAccountData({ ...accountData, password: e.target.value });
                          if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                        }}
                        placeholder="Введите пароль"
                        className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                          errors.password
                            ? 'border-2 border-red-500/90 focus:border-red-500 ring-2 ring-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                            : 'border border-white/10 focus:border-[#00FF85] focus:ring-1 focus:ring-[#00FF85]/30'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors focus:outline-none"
                        title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-neutral-300" />
                        ) : (
                          <Eye className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.password}</span>
                      </motion.div>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Пароль сохраняется локально и защищен</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PHYSICAL METRICS (ALL EMPTY INITIALLY + VALIDATION) */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-3.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Шаг 2: Физические показатели
                    </h2>
                    {metricsData.weight && metricsData.height ? (
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
                    ) : (
                      <span className="text-[11px] font-semibold text-neutral-400">
                        Возраст от 5 лет
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Заполните ваши физические данные для точного расчета калорий
                  </p>
                </div>

                <div className="space-y-3 pt-1 max-h-[300px] overflow-y-auto pr-1">
                  {/* Age Input & Slider (MIN 5 YEARS) */}
                  <div className={`p-3 rounded-2xl bg-[#1A1A24] transition-all ${
                    errors.age ? 'border-2 border-red-500/90 ring-2 ring-red-500/20' : 'border border-white/5'
                  }`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="text-xs font-bold text-neutral-300 uppercase">Возраст</span>
                        <span className="text-[10px] text-emerald-400 ml-2 font-medium">от 5 лет</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="5"
                          max="99"
                          value={metricsData.age}
                          onChange={(e) => {
                            setMetricsData({ ...metricsData, age: e.target.value });
                            if (errors.age) setErrors((prev) => ({ ...prev, age: null }));
                          }}
                          placeholder="Введите ваш возраст"
                          className="w-44 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-black text-white placeholder:text-neutral-500/80 placeholder:font-normal focus:outline-none focus:border-[#00FF85]"
                        />
                        {metricsData.age && <span className="text-xs text-neutral-400 font-bold">лет</span>}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="90"
                      value={metricsData.age === '' ? 5 : Number(metricsData.age)}
                      onChange={(e) => {
                        setMetricsData({ ...metricsData, age: e.target.value });
                        if (errors.age) setErrors((prev) => ({ ...prev, age: null }));
                      }}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                    {errors.age && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.age}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Weight Input & Slider */}
                  <div className={`p-3 rounded-2xl bg-[#1A1A24] transition-all ${
                    errors.weight ? 'border-2 border-red-500/90 ring-2 ring-red-500/20' : 'border border-white/5'
                  }`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Текущий вес</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.5"
                          min="15"
                          max="250"
                          value={metricsData.weight}
                          onChange={(e) => {
                            setMetricsData({ ...metricsData, weight: e.target.value });
                            if (errors.weight) setErrors((prev) => ({ ...prev, weight: null }));
                          }}
                          placeholder="Введите текущий вес"
                          className="w-44 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-black text-[#00FF85] placeholder:text-neutral-500/80 placeholder:font-normal focus:outline-none focus:border-[#00FF85]"
                        />
                        {metricsData.weight && <span className="text-xs text-neutral-400 font-bold">кг</span>}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      step="0.5"
                      value={metricsData.weight === '' ? 20 : Number(metricsData.weight)}
                      onChange={(e) => {
                        setMetricsData({ ...metricsData, weight: e.target.value });
                        if (errors.weight) setErrors((prev) => ({ ...prev, weight: null }));
                      }}
                      className="w-full accent-[#00FF85] cursor-pointer"
                    />
                    {errors.weight && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.weight}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Target Weight Input & Slider */}
                  <div className={`p-3 rounded-2xl bg-[#1A1A24] transition-all ${
                    errors.targetWeight ? 'border-2 border-red-500/90 ring-2 ring-red-500/20' : 'border border-white/5'
                  }`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Желаемый вес</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.5"
                          min="15"
                          max="250"
                          value={metricsData.targetWeight}
                          onChange={(e) => {
                            setMetricsData({ ...metricsData, targetWeight: e.target.value });
                            if (errors.targetWeight) setErrors((prev) => ({ ...prev, targetWeight: null }));
                          }}
                          placeholder="Введите целевой вес"
                          className="w-44 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-black text-[#FF5E00] placeholder:text-neutral-500/80 placeholder:font-normal focus:outline-none focus:border-[#FF5E00]"
                        />
                        {metricsData.targetWeight && <span className="text-xs text-neutral-400 font-bold">кг</span>}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      step="0.5"
                      value={metricsData.targetWeight === '' ? 20 : Number(metricsData.targetWeight)}
                      onChange={(e) => {
                        setMetricsData({ ...metricsData, targetWeight: e.target.value });
                        if (errors.targetWeight) setErrors((prev) => ({ ...prev, targetWeight: null }));
                      }}
                      className="w-full accent-[#FF5E00] cursor-pointer"
                    />
                    {errors.targetWeight && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.targetWeight}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Height Input & Slider */}
                  <div className={`p-3 rounded-2xl bg-[#1A1A24] transition-all ${
                    errors.height ? 'border-2 border-red-500/90 ring-2 ring-red-500/20' : 'border border-white/5'
                  }`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-neutral-300 uppercase">Рост</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="80"
                          max="240"
                          value={metricsData.height}
                          onChange={(e) => {
                            setMetricsData({ ...metricsData, height: e.target.value });
                            if (errors.height) setErrors((prev) => ({ ...prev, height: null }));
                          }}
                          placeholder="Введите ваш рост"
                          className="w-44 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-black text-sky-400 placeholder:text-neutral-500/80 placeholder:font-normal focus:outline-none focus:border-sky-400"
                        />
                        {metricsData.height && <span className="text-xs text-neutral-400 font-bold">см</span>}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="220"
                      value={metricsData.height === '' ? 90 : Number(metricsData.height)}
                      onChange={(e) => {
                        setMetricsData({ ...metricsData, height: e.target.value });
                        if (errors.height) setErrors((prev) => ({ ...prev, height: null }));
                      }}
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                    {errors.height && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.height}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: STRENGTH ASSESSMENT (ALL EMPTY INITIALLY + VALIDATION) */}
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
                    Укажите, сколько повторений вы делаете за один подход (если 0 — введите 0):
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
                          Расчет уровня:
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
                        {isAnyStrengthFilled
                          ? fitnessLevelEvaluation.description
                          : 'Заполните поля ниже для персонального подбора программ'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5 Questions Inputs */}
                <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {strengthQuestions.map((q) => {
                    const hasError = Boolean(errors[q.key]);

                    return (
                      <div 
                        key={q.key} 
                        className={`p-2.5 rounded-xl bg-[#1A1A24] transition-all ${
                          hasError ? 'border-2 border-red-500/90 ring-2 ring-red-500/20' : 'border border-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {q.title} <span className="text-red-400">*</span>
                            </span>
                            <span className="text-[10px] text-neutral-400">{q.subtitle}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <input
                              type="number"
                              min={q.min}
                              max={q.max}
                              value={strengthData[q.key]}
                              onChange={(e) => {
                                setStrengthData({
                                  ...strengthData,
                                  [q.key]: e.target.value
                                });
                                if (errors[q.key]) setErrors((prev) => ({ ...prev, [q.key]: null }));
                              }}
                              placeholder="Введите количество"
                              className="w-36 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-right text-xs font-black text-white placeholder:text-neutral-500/80 placeholder:font-normal focus:outline-none focus:border-[#00FF85]"
                            />
                            {strengthData[q.key] !== '' && (
                              <span className="text-[11px] text-neutral-400 font-bold">раз</span>
                            )}
                          </div>
                        </div>

                        <input
                          type="range"
                          min={q.min}
                          max={q.max}
                          step={q.step}
                          value={strengthData[q.key] === '' ? 0 : Number(strengthData[q.key])}
                          onChange={(e) => {
                            setStrengthData({
                              ...strengthData,
                              [q.key]: e.target.value
                            });
                            if (errors[q.key]) setErrors((prev) => ({ ...prev, [q.key]: null }));
                          }}
                          className="w-full cursor-pointer"
                          style={{ accentColor: q.accent }}
                        />

                        {hasError && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 mt-1 text-[11px] text-red-400 font-medium"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors[q.key]}</span>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
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
