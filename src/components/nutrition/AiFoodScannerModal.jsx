import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  X, 
  Check, 
  RotateCcw, 
  Flame, 
  Cpu, 
  Zap, 
  Layers, 
  ChevronRight,
  Plus,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useFitness } from '../../context/FitnessContext';

const PRESET_DISHES = [
  {
    id: 'chicken_rice',
    name: 'Куриная грудка с рисом и брокколи',
    portionGrams: 350,
    caloriesPer100g: 128,
    proteinPer100g: 12.0,
    fatsPer100g: 2.6,
    carbsPer100g: 13.7,
    calories: 450,
    protein: 42.0,
    fats: 9.0,
    carbs: 48.0,
    icon: '🍗',
    confidence: 96.8,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['Белок', 'Чистый рацион', 'Набор массы']
  },
  {
    id: 'salmon_veggies',
    name: 'Лосось на гриле со спаржей и киноа',
    portionGrams: 320,
    caloriesPer100g: 162,
    proteinPer100g: 11.8,
    fatsPer100g: 8.1,
    carbsPer100g: 3.8,
    calories: 520,
    protein: 38.0,
    fats: 26.0,
    carbs: 12.0,
    icon: '🐟',
    confidence: 98.2,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    tags: ['Омега-3', 'Здоровые жиры', 'Премиум']
  },
  {
    id: 'oatmeal_berries',
    name: 'Овсяная каша с протеином и ягодами',
    portionGrams: 300,
    caloriesPer100g: 120,
    proteinPer100g: 8.3,
    fatsPer100g: 2.3,
    carbsPer100g: 17.3,
    calories: 360,
    protein: 25.0,
    fats: 7.0,
    carbs: 52.0,
    icon: '🥣',
    confidence: 95.4,
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    tags: ['Сложные углеводы', 'Завтрак', 'Энергия']
  },
  {
    id: 'greek_salad',
    name: 'Греческий салат с фетой и оливками',
    portionGrams: 280,
    caloriesPer100g: 103,
    proteinPer100g: 5.7,
    fatsPer100g: 6.4,
    carbsPer100g: 5.0,
    calories: 290,
    protein: 16.0,
    fats: 18.0,
    carbs: 14.0,
    icon: '🥗',
    confidence: 97.1,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['Клетчатка', 'Легкий ужин', 'Витамины']
  },
  {
    id: 'beef_steak',
    name: 'Говяжий стейк с запеченным бататом',
    portionGrams: 360,
    caloriesPer100g: 161,
    proteinPer100g: 13.3,
    fatsPer100g: 6.1,
    carbsPer100g: 11.6,
    calories: 580,
    protein: 48.0,
    fats: 22.0,
    carbs: 42.0,
    icon: '🥩',
    confidence: 96.1,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    tags: ['Креатин & Железо', 'Анаболизм', 'Сила']
  }
];

export const AiFoodScannerModal = ({ isOpen, onClose, defaultMealType = 'lunch' }) => {
  const { addMealItem, awardXp, addToast } = useFitness();
  const fileInputRef = useRef(null);

  const [mode, setMode] = useState('upload'); // 'upload' | 'scanning' | 'result'
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState('Инициализация ИИ-модели...');
  const [scanError, setScanError] = useState(null);
  const [recognizedDish, setRecognizedDish] = useState(null);
  const [customDishName, setCustomDishName] = useState('');
  const [portionGrams, setPortionGrams] = useState(300);
  const [selectedMealType, setSelectedMealType] = useState(defaultMealType);

  useEffect(() => {
    if (isOpen) {
      setMode('upload');
      setSelectedImage(null);
      setScanProgress(0);
      setScanError(null);
      setRecognizedDish(null);
      setSelectedMealType(defaultMealType);
    }
  }, [isOpen, defaultMealType]);

  if (!isOpen) return null;

  const triggerScan = (imageData, dishTemplate = null, shouldFail = false) => {
    setSelectedImage(imageData);
    setMode('scanning');
    setScanProgress(0);
    setScanError(null);
    setScanStepText('Инициализация компьютерного зрения...');

    const chosenDish = dishTemplate || PRESET_DISHES[Math.floor(Math.random() * PRESET_DISHES.length)];

    // Simulation of AI steps
    const timer1 = setTimeout(() => {
      setScanProgress(30);
      setScanStepText('Сегментация объектов и проверка наличия блюда...');
    }, 600);

    const timer2 = setTimeout(() => {
      setScanProgress(68);
      if (shouldFail) {
        setScanStepText('Анализ текстур и классификация объектов...');
      } else {
        setScanStepText('Оценка плотности, объема и калорийности...');
      }
    }, 1300);

    const timer3 = setTimeout(() => {
      if (shouldFail) {
        // AI detection failed: Non-food item detected or unclear photo
        setMode('upload');
        setSelectedImage(null);
        setScanError('⚠️ На фото не обнаружена еда. Пожалуйста, сфотографируйте ваше блюдо более четко.');
        addToast(
          '⚠️ Еда не распознана',
          'Пожалуйста, сфотографируйте ваше блюдо более четко',
          'error',
          5000
        );
      } else {
        setScanProgress(100);
        setScanStepText('Анализ завершен! Формирование БЖУ профиля...');
      }
    }, 2000);

    const timer4 = setTimeout(() => {
      if (!shouldFail) {
        setRecognizedDish(chosenDish);
        setCustomDishName(chosenDish.name);
        setPortionGrams(chosenDish.portionGrams);
        setMode('result');
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#00FF85', '#38BDF8', '#FFFFFF']
          });
        } catch (_) {}
      }
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Smart check for non-food images:
    // 1. Filename keyword check for non-food objects
    const nonFoodPattern = /(cat|dog|pet|car|person|human|me|selfie|chair|table|room|desk|house|screen|phone|laptop|document|doc|nonfood|nofood|notfood|furniture|kot|pes|chel|mashina|auto)/i;
    const isNonFoodByName = nonFoodPattern.test(file.name);
    // 2. 25% random probability for arbitrary uploaded image to simulate realistic AI scanner
    const isRandomFail = Math.random() < 0.25;
    const shouldFail = isNonFoodByName || isRandomFail;

    const reader = new FileReader();
    reader.onload = () => {
      triggerScan(reader.result, null, shouldFail);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSelectPreset = (preset) => {
    // Preset dishes are verified foods, so shouldFail = false
    triggerScan(preset.image, preset, false);
  };

  const handleConfirmAndAdd = () => {
    if (!recognizedDish) return;

    const ratio = portionGrams / 100;
    const finalCalories = Math.round(recognizedDish.caloriesPer100g * ratio);

    const foodItem = {
      name: customDishName || recognizedDish.name,
      caloriesPer100g: recognizedDish.caloriesPer100g,
      proteinPer100g: recognizedDish.proteinPer100g,
      fatsPer100g: recognizedDish.fatsPer100g,
      carbsPer100g: recognizedDish.carbsPer100g,
      icon: recognizedDish.icon || '🥗',
      defaultPortionGrams: portionGrams
    };

    addMealItem(selectedMealType, foodItem, portionGrams);
    awardXp(30, 'За ИИ-распознавание блюда 📸');

    const mealNamesMap = {
      breakfast: 'Завтрак',
      lunch: 'Обед',
      dinner: 'Ужин',
      snack: 'Перекус'
    };

    addToast(
      'Блюдо добавлено по фото! 📸✨',
      `"${foodItem.name}" (${finalCalories} ккал) записано в ${mealNamesMap[selectedMealType]}. +30 XP!`,
      'success',
      4500
    );

    onClose();
  };

  const mealSlots = [
    { id: 'breakfast', label: 'Завтрак', icon: '🍳' },
    { id: 'lunch', label: 'Обед', icon: '🍗' },
    { id: 'dinner', label: 'Ужин', icon: '🥗' },
    { id: 'snack', label: 'Перекус', icon: '🍎' },
  ];

  // Calculated live values based on portion slider
  const currentRatio = recognizedDish ? portionGrams / 100 : 1;
  const currentCalories = recognizedDish ? Math.round(recognizedDish.caloriesPer100g * currentRatio) : 0;
  const currentProtein = recognizedDish ? +(recognizedDish.proteinPer100g * currentRatio).toFixed(1) : 0;
  const currentFats = recognizedDish ? +(recognizedDish.fatsPer100g * currentRatio).toFixed(1) : 0;
  const currentCarbs = recognizedDish ? +(recognizedDish.carbsPer100g * currentRatio).toFixed(1) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-white dark:bg-[#121217] border border-gray-200 dark:border-white/10 rounded-3xl p-5 sm:p-7 relative overflow-hidden my-auto shadow-2xl"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF85]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF85] to-[#10B981] p-0.5 shadow-neon-green flex items-center justify-center">
              <div className="w-full h-full bg-[#0A0A0C] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#00FF85]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                  ИИ-сканер еды по фото
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-emerald-600 dark:text-[#00FF85] border border-[#00FF85]/30">
                  AI Vision 2.0
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Моментальное распознавание калорий и БЖУ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden native camera/file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Body content based on active mode */}
        <div className="py-5 relative z-10">
          {mode === 'upload' && (
            <div className="space-y-4">
              {/* Error banner if previous scan was not food */}
              {scanError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{scanError}</span>
                  </div>
                  <button
                    onClick={() => setScanError(null)}
                    className="p-1 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {/* Camera / Upload trigger big dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-gray-300 dark:border-white/15 hover:border-emerald-500 dark:hover:border-[#00FF85]/60 bg-gray-50 hover:bg-gray-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00FF85]/20 to-sky-400/20 border border-emerald-500/30 dark:border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-emerald-600 dark:text-[#00FF85]" />
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  Сфотографировать или выбрать из галереи
                </h4>
                <p className="text-xs text-gray-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                  Наведите камеру на тарелку под хорошим освещением для точного распознавания БЖУ
                </p>

                <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-800 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white shadow-sm">
                  <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00FF85]" />
                  <span>Открыть камеру / файл</span>
                </div>
              </div>

              {/* Quick sample dishes */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider">
                    Или протестируйте на готовых примерах:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRESET_DISHES.slice(0, 4).map((dish) => (
                    <button
                      key={dish.id}
                      onClick={() => handleSelectPreset(dish)}
                      className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border border-gray-200 dark:border-white/5 hover:border-emerald-500/40 dark:hover:border-[#00FF85]/30 flex items-center gap-3 text-left transition-all group cursor-pointer"
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-[#00FF85] transition-colors">
                          {dish.name}
                        </h5>
                        <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">
                          {dish.calories} ккал • {dish.portionGrams}г
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-neutral-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF85] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'scanning' && (
            <div className="space-y-6 flex flex-col items-center justify-center py-4 text-center">
              {/* Photo scanning container with laser beam */}
              <div className="relative w-64 h-64 rounded-3xl overflow-hidden border-2 border-emerald-500 dark:border-[#00FF85]/50 shadow-[0_0_30px_rgba(0,255,133,0.3)] bg-neutral-900">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Сканируемое блюдо"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                )}

                {/* Animated Scanner Laser Bar */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FF85] to-transparent shadow-[0_0_15px_#00FF85]"
                  animate={{
                    top: ['5%', '92%', '5%'],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Grid Overlay effect */}
                <div className="absolute inset-0 bg-[radial-gradient(#00FF85_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                {/* Live scanner tag */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-[#00FF85]/40 text-[11px] font-bold text-[#00FF85] flex items-center justify-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  <span>ИИ нейросеть анализирует...</span>
                </div>
              </div>

              {/* Progress & Status */}
              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-900 dark:text-white">{scanStepText}</span>
                  <span className="text-emerald-600 dark:text-[#00FF85] font-black">{scanProgress}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00FF85] to-[#10B981] rounded-full"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ ease: 'easeOut', duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'result' && recognizedDish && (
            <div className="space-y-5">
              {/* Preview with Accuracy Tag */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 h-44 bg-neutral-900">
                <img
                  src={selectedImage || recognizedDish.image}
                  alt={recognizedDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#00FF85]/40 text-[#00FF85] text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#00FF85]" />
                  <span>Точность ИИ: {recognizedDish.confidence}%</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div className="min-w-0 pr-2 flex-1">
                    <input
                      type="text"
                      value={customDishName}
                      onChange={(e) => setCustomDishName(e.target.value)}
                      className="bg-black/50 border border-white/20 rounded-xl px-2.5 py-1 text-sm font-black text-white w-full focus:outline-none focus:border-[#00FF85]"
                      placeholder="Название блюда"
                    />
                  </div>
                  <button
                    onClick={() => setMode('upload')}
                    className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs text-white font-semibold flex items-center gap-1 shrink-0 backdrop-blur-md cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Переснять</span>
                  </button>
                </div>
              </div>

              {/* Portion slider */}
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700 dark:text-neutral-400">Вес порции на фото:</span>
                  <span className="text-emerald-600 dark:text-[#00FF85] text-sm">{portionGrams} грамм</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={portionGrams}
                  onChange={(e) => setPortionGrams(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 dark:accent-[#00FF85] cursor-pointer"
                />
              </div>

              {/* Macros Breakdown Cards */}
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/5 text-center">
                  <span className="text-[10px] text-gray-500 dark:text-neutral-400 uppercase font-bold block">Калории</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-[#00FF85] mt-0.5 block">
                    {currentCalories}
                  </span>
                  <span className="text-[10px] text-gray-500">ккал</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center">
                  <span className="text-[10px] text-sky-500 dark:text-sky-400 uppercase font-bold block">Белки</span>
                  <span className="text-base sm:text-lg font-black text-sky-600 dark:text-sky-300 mt-0.5 block">
                    {currentProtein}г
                  </span>
                  <span className="text-[10px] text-sky-500/80">протеин</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-[#FF5E00]/10 border border-[#FF5E00]/20 text-center">
                  <span className="text-[10px] text-[#FF5E00] uppercase font-bold block">Жиры</span>
                  <span className="text-base sm:text-lg font-black text-[#FF5E00] mt-0.5 block">
                    {currentFats}г
                  </span>
                  <span className="text-[10px] text-[#FF5E00]/80">липиды</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold block">Углеводы</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-300 mt-0.5 block">
                    {currentCarbs}г
                  </span>
                  <span className="text-[10px] text-emerald-600/80">энергия</span>
                </div>
              </div>

              {/* Meal Slot Choice (Завтрак / Обед / Ужин / Перекус) */}
              <div>
                <label className="text-[11px] font-bold text-gray-700 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                  В какой прием пищи добавить:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {mealSlots.map((slot) => {
                    const isSelected = selectedMealType === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedMealType(slot.id)}
                        className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00FF85]/20 border-emerald-500 dark:border-[#00FF85] text-gray-900 dark:text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-white/[0.02] border-gray-200 dark:border-white/5 text-gray-700 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20'
                        }`}
                      >
                        <span className="text-base">{slot.icon}</span>
                        <span>{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConfirmAndAdd}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 active:scale-95 text-black font-black text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>Записать в дневник питания (+30 XP) ⚡</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
