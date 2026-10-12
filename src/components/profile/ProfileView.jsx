import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Award, 
  Flame, 
  Scale, 
  Ruler, 
  Calendar, 
  Activity, 
  RotateCcw, 
  LogOut, 
  Check, 
  Lock, 
  ShoppingBag,
  Zap,
  Edit2,
  CheckCircle,
  Trophy,
  Target,
  Sparkles,
  Save,
  X,
  CreditCard,
  Heart,
  Shield,
  CheckCircle2,
  Crown,
  Loader2,
  Sun,
  Moon,
  Layers
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockBadges } from '../../data/mockBadges';
import { calculateBMI, calculateDailyTargets } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

import { AvatarUploader } from './AvatarUploader';

const EQUIPMENT_OPTIONS = [
  { id: 'pullup_bar', label: 'Турник', icon: '🚪' },
  { id: 'dumbbells', label: 'Гантели', icon: '🏋️' },
  { id: 'resistance_bands', label: 'Фитнес-резинки', icon: '🎗️' },
  { id: 'jump_rope', label: 'Скакалка', icon: '🪢' },
  { id: 'none', label: 'Свой вес', icon: '🤸' },
];

export const ProfileView = ({ onOpenOnboarding, onOpenAuth }) => {
  const { 
    user, 
    profile, 
    levelInfo, 
    dailyTargets, 
    streak, 
    unlockedBadgeIds, 
    orderHistory,
    updateFullProfile, 
    logout, 
    resetDemoState,
    isPremium,
    activatePremium,
    theme,
    toggleTheme
  } = useFitness();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name || '',
    age: profile.age || 25,
    height: profile.height || 178,
    weight: profile.weight || 75,
    targetWeight: profile.targetWeight || 72,
    goal: profile.goal || 'gain_muscle',
    fitnessLevel: profile.fitnessLevel || 'intermediate',
    equipment: profile.equipment || ['none'],
  });

  // Keep form in sync when profile updates
  useEffect(() => {
    setEditForm({
      name: user.name || '',
      age: profile.age || 25,
      height: profile.height || 178,
      weight: profile.weight || 75,
      targetWeight: profile.targetWeight || 72,
      goal: profile.goal || 'gain_muscle',
      fitnessLevel: profile.fitnessLevel || 'intermediate',
      equipment: profile.equipment || ['none'],
    });
  }, [user.name, profile]);

  const bmi = calculateBMI(profile.weight, profile.height);

  // Live preview targets based on edited values
  const previewTargets = calculateDailyTargets({
    weight: editForm.weight,
    height: editForm.height,
    age: editForm.age,
    gender: profile.gender || 'male',
    goal: editForm.goal,
    activityLevel: profile.activityLevel || 1.4,
  });

  const levelBadges = {
    beginner: { name: 'Начинающий', color: '#38BDF8', bg: '#38BDF815' },
    intermediate: { name: 'Средний', color: '#00FF85', bg: '#00FF8515' },
    advanced: { name: 'Продвинутый', color: '#FF5E00', bg: '#FF5E0015' }
  };

  const currentLevelBadge = levelBadges[profile.fitnessLevel] || levelBadges.intermediate;

  const toggleEquipmentItem = (id) => {
    setEditForm((prev) => {
      let current = prev.equipment || [];
      if (id === 'none') {
        return { ...prev, equipment: ['none'] };
      }
      let next = current.filter((x) => x !== 'none');
      if (next.includes(id)) {
        next = next.filter((x) => x !== id);
        if (next.length === 0) next = ['none'];
      } else {
        next.push(id);
      }
      return { ...prev, equipment: next };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const levelNamesMap = {
      beginner: 'Начинающий',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
    };

    updateFullProfile({
      name: editForm.name.trim() || user.name,
      age: Math.max(5, parseInt(editForm.age, 10) || profile.age),
      height: parseFloat(editForm.height) || profile.height,
      weight: parseFloat(editForm.weight) || profile.weight,
      targetWeight: parseFloat(editForm.targetWeight) || profile.targetWeight,
      goal: editForm.goal,
      fitnessLevel: editForm.fitnessLevel,
      fitnessLevelName: levelNamesMap[editForm.fitnessLevel] || 'Средний',
      equipment: editForm.equipment && editForm.equipment.length > 0 ? editForm.equipment : ['none'],
    });

    setIsEditing(false);
  };

  // 1$ Support & Premium Card State
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData((prev) => ({ ...prev, number: formatted }));
    if (paymentErrors.number) setPaymentErrors((prev) => ({ ...prev, number: null }));
  };

  const handleExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    setCardData((prev) => ({ ...prev, expiry: raw }));
    if (paymentErrors.expiry) setPaymentErrors((prev) => ({ ...prev, expiry: null }));
  };

  const handleCvcChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardData((prev) => ({ ...prev, cvc: raw }));
    if (paymentErrors.cvc) setPaymentErrors((prev) => ({ ...prev, cvc: null }));
  };

  const handleNameChange = (e) => {
    const raw = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase().slice(0, 30);
    setCardData((prev) => ({ ...prev, name: raw }));
    if (paymentErrors.name) setPaymentErrors((prev) => ({ ...prev, name: null }));
  };

  const handlePaySupport = (e) => {
    e.preventDefault();
    const cleanNumber = cardData.number.replace(/\s/g, '');
    const errs = {};

    if (cleanNumber.length !== 16) {
      errs.number = 'Введите 16 цифр карты';
    }
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      errs.expiry = 'Формат ММ/ГГ';
    } else {
      const month = parseInt(cardData.expiry.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        errs.expiry = 'Месяц от 01 до 12';
      }
    }
    if (cardData.cvc.length !== 3) {
      errs.cvc = '3 цифры CVC';
    }
    if (cardData.name.trim().length < 3) {
      errs.name = 'Укажите имя владельца карты';
    }

    setPaymentErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      activatePremium();
      setCardData({ number: '', expiry: '', cvc: '', name: '' });
    }, 600);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00FF85]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <AvatarUploader size="md" />

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00FF85]/15 text-emerald-600 dark:text-[#00FF85] border border-[#00FF85]/30">
                  {levelInfo.title}
                </span>
                <span 
                  className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: currentLevelBadge.bg,
                    color: currentLevelBadge.color,
                    borderColor: `${currentLevelBadge.color}40`
                  }}
                >
                  Уровень: {currentLevelBadge.name}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400 mt-0.5">
                {user.email}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs font-semibold">
                <span className="text-[#FF5E00] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-[#FF5E00]" />
                  {streak} дней стрик
                </span>
                <span className="text-gray-400 dark:text-neutral-500">•</span>
                <span className="text-emerald-600 dark:text-[#00FF85] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Уровень {levelInfo.level}
                </span>
                <span className="text-gray-400 dark:text-neutral-500">•</span>
                <span className="text-gray-700 dark:text-neutral-300">
                  {profile.age} лет
                </span>
              </div>
            </div>
          </div>

          {/* Quick buttons */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                isEditing
                  ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border-gray-300 dark:border-white/20'
                  : 'bg-gradient-to-r from-[#00FF85]/20 to-[#10B981]/20 hover:brightness-125 text-emerald-600 dark:text-[#00FF85] border-emerald-500/40 dark:border-[#00FF85]/40 shadow-neon-green'
              }`}
            >
              {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
              <span>{isEditing ? 'Закрыть редактор' : 'Редактировать профиль'}</span>
            </button>

            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-neutral-300 font-bold text-xs border border-gray-200 dark:border-white/10 transition-colors text-center cursor-pointer"
            >
              Пройти опрос заново
            </button>
          </div>
        </div>

        {/* FULL PROFILE EDITING FORM DRAWER */}
        <AnimatePresence>
          {isEditing && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSave}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-emerald-600 dark:text-[#00FF85]" />
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                    Полное редактирование данных профиля
                  </h3>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-neutral-400">
                  Возраст доступен от 5 лет • Мгновенный пересчет калорий
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* 1. Name */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Имя пользователя
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
                  />
                </div>

                {/* 2. Age (from 5 years old) */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Возраст (лет) <span className="text-emerald-500 font-normal">от 5 лет</span>
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="99"
                    required
                    value={editForm.age}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setEditForm({ ...editForm, age: isNaN(val) ? 5 : Math.max(5, val) });
                    }}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
                  />
                </div>

                {/* 3. Height */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Рост (см)
                  </label>
                  <input
                    type="number"
                    min="90"
                    max="230"
                    required
                    value={editForm.height}
                    onChange={(e) => setEditForm({ ...editForm, height: parseInt(e.target.value, 10) || 170 })}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
                  />
                </div>

                {/* 4. Current Weight */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Текущий вес (кг)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="15"
                    max="200"
                    required
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: parseFloat(e.target.value) || 70 })}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
                  />
                </div>

                {/* 5. Target Weight */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Целевой вес (кг)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="15"
                    max="200"
                    required
                    value={editForm.targetWeight}
                    onChange={(e) => setEditForm({ ...editForm, targetWeight: parseFloat(e.target.value) || 70 })}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#00FF85]"
                  />
                </div>

                {/* 6. Main Goal */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Главная цель
                  </label>
                  <select
                    value={editForm.goal}
                    onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#00FF85]"
                  >
                    <option value="gain_muscle">Набор массы & Гипертрофия (+15% ккал)</option>
                    <option value="lose_weight">Похудение & Рельеф (-20% ккал)</option>
                    <option value="calisthenics_strength">Сила и калистеника (L-sit / Planche)</option>
                  </select>
                </div>

                {/* 7. Fitness Level */}
                <div className="lg:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1">
                    Уровень подготовки
                  </label>
                  <select
                    value={editForm.fitnessLevel}
                    onChange={(e) => setEditForm({ ...editForm, fitnessLevel: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#00FF85]"
                  >
                    <option value="beginner">Начинающий (Базовые отжимания, приседания, планка)</option>
                    <option value="intermediate">Средний (Подтягивания, брусья, L-sit, алмазные отжимания)</option>
                    <option value="advanced">Продвинутый (Tuck Planche, выходы силой, тяжелые веса)</option>
                  </select>
                </div>

                {/* 8. Available Equipment */}
                <div className="lg:col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-700 dark:text-neutral-300 block mb-1.5">
                    Доступный инвентарь (для подбора тренировок)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {EQUIPMENT_OPTIONS.map((item) => {
                      const isSelected = (editForm.equipment || []).includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleEquipmentItem(item.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#00FF85]/15 border-emerald-500/50 dark:border-[#00FF85] text-gray-900 dark:text-white shadow-sm'
                              : 'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00FF85]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic Live Nutrients Preview */}
              <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-[#00FF85]" />
                  <span className="text-gray-700 dark:text-neutral-300">
                    Пересчитанная дневная норма: <strong className="text-gray-900 dark:text-white">{previewTargets.calories} ккал</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-neutral-400">
                  <span>Белки: <strong className="text-sky-500 dark:text-sky-400">{previewTargets.protein}г</strong></span>
                  <span>Жиры: <strong className="text-[#FF5E00]">{previewTargets.fats}г</strong></span>
                  <span>Углеводы: <strong className="text-emerald-600 dark:text-[#00FF85]">{previewTargets.carbs}г</strong></span>
                </div>
              </div>

              {/* Form submit actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-neutral-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-black text-xs flex items-center gap-1.5 shadow-neon-green transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>Сохранить изменения</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-neutral-400 mb-1">
            <Scale className="w-4 h-4 text-emerald-600 dark:text-[#00FF85]" />
            <span>Вес / Цель</span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white">
            {profile.weight} <span className="text-xs text-gray-500 dark:text-neutral-400">→ {profile.targetWeight} кг</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-[#00FF85] font-semibold mt-1 block">
            {profile.goal === 'gain_muscle' ? 'Набор мышечной массы' : profile.goal === 'calisthenics_strength' ? 'Калистеника & Сила' : 'Снижение жира'}
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-neutral-400 mb-1">
            <Ruler className="w-4 h-4 text-sky-500" />
            <span>Рост & Возраст</span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white">
            {profile.height} см
          </div>
          <span className="text-[11px] text-gray-600 dark:text-neutral-400 font-medium mt-1 block">
            {profile.age} лет • ИМТ {bmi.bmi} ({bmi.label})
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-neutral-400 mb-1">
            <Trophy className="w-4 h-4 text-[#FF5E00]" />
            <span>Уровень подготовки</span>
          </div>
          <div 
            className="text-xl font-black"
            style={{ color: currentLevelBadge.color }}
          >
            {currentLevelBadge.name}
          </div>
          <span className="text-[11px] text-gray-600 dark:text-neutral-400 font-medium mt-1 block">
            TDEE расход: {dailyTargets.tdee} ккал
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-neutral-400 mb-1">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-[#00FF85]" />
            <span>Норма на день</span>
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-[#00FF85]">
            {dailyTargets.calories} <span className="text-xs text-gray-500 dark:text-neutral-400">ккал</span>
          </div>
          <span className="text-[11px] text-gray-600 dark:text-neutral-400 font-medium mt-1 block">
            Б: {dailyTargets.protein}г • Ж: {dailyTargets.fats}г • У: {dailyTargets.carbs}г
          </span>
        </div>
      </div>

      {/* Equipment & Theme Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Equipment Card */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#00FF85]/15 text-emerald-600 dark:text-[#00FF85]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Спортивный инвентарь</h4>
                <p className="text-[11px] text-gray-600 dark:text-neutral-400">Учитывается при умном подборе тренировок</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[11px] text-emerald-600 dark:text-[#00FF85] hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Изменить</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {(profile.equipment && profile.equipment.length > 0 ? profile.equipment : ['none']).map((eqId) => {
              const eq = EQUIPMENT_OPTIONS.find((item) => item.id === eqId) || { label: eqId, icon: '⚡' };
              return (
                <span
                  key={eqId}
                  className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-800 dark:text-neutral-200 font-medium flex items-center gap-1.5"
                >
                  <span>{eq.icon}</span>
                  <span>{eq.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Theme Settings Card */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-[#00FF85]/15 text-[#00FF85]' : 'bg-amber-500/15 text-amber-500'}`}>
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Тема оформления</h4>
                <p className="text-[11px] text-gray-600 dark:text-neutral-400">
                  {theme === 'dark' ? 'Темная неоновая (OLED Dark)' : 'Светлая минималистичная (Clean Light)'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => theme !== 'light' && toggleTheme()}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Светлая тема</span>
            </button>

            <button
              type="button"
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#00FF85] text-black shadow-neon-green'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-neutral-300'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Темная тема</span>
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Gallery */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#FF5E00]/15 text-[#FF5E00]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Зал славы и достижения
              </h3>
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Разблокировано {unlockedBadgeIds.length} из {mockBadges.length} наград
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-emerald-500/5 dark:bg-white/[0.04] border-emerald-500/30 dark:border-[#00FF85]/30 shadow-sm dark:shadow-[0_0_15px_-5px_rgba(0,255,133,0.15)]'
                    : 'bg-gray-100 dark:bg-white/[0.01] border-gray-200 dark:border-white/5 opacity-40 grayscale'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{badge.icon}</span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-emerald-600 dark:text-[#00FF85] border border-[#00FF85]/30">
                        Получено
                      </span>
                    ) : (
                      <div className="p-1 rounded-full bg-gray-200 dark:bg-white/5 text-gray-500 dark:text-neutral-400">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">
                    {badge.title}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200 dark:border-white/5 text-right">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-[#00FF85]">
                    +{badge.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders History if any */}
      {orderHistory && orderHistory.length > 0 && (
        <div className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-[#00FF85]" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">История заказов в магазине</h3>
          </div>
          <div className="space-y-3">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">Заказ №{order.id.slice(-6)}</span>
                  <p className="text-gray-500 dark:text-neutral-400 mt-0.5">{order.date} • {order.items.length} поз.</p>
                </div>
                <span className="text-sm font-black text-emerald-600 dark:text-[#00FF85]">
                  {formatCurrency(order.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support / Premium 1$ Donation Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/25">
              <Heart className="w-6 h-6 fill-amber-400/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                  Помощь сайту & Премиум-доступ
                </h3>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                  1$
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-neutral-400 mt-1 max-w-xl">
                Поддержите развитие проекта символическим взносом в 1$. В знак благодарности вы получите постоянный статус «Премиум атлет» и снимете все ограничения.
              </p>
            </div>
          </div>
        </div>

        {isPremium ? (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/5 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-400/20 text-amber-500 dark:text-amber-300">
                <Crown className="w-7 h-7 fill-amber-300/40" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 dark:text-white">
                    Премиум активирован навсегда! 🏆
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#00FF85]" />
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-200/80 mt-0.5">
                  Огромное спасибо за поддержку! Ваш вклад помогает SPORT HELPER непрерывно развиваться и добавлять новые тренировки.
                </p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-xs font-black shrink-0">
              PRO статус активен
            </div>
          </div>
        ) : (
          <form onSubmit={handlePaySupport} className="space-y-4 max-w-xl">
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-3.5">
              {/* Card Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-neutral-300 mb-1.5 flex items-center justify-between">
                  <span>Номер карты</span>
                  <span className="text-[10px] text-gray-500 dark:text-neutral-500 font-normal">16 цифр Visa / Mastercard / МИР</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-neutral-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardData.number}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 border text-xs font-mono tracking-wider text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all ${
                      paymentErrors.number ? 'border-red-500 ring-1 ring-red-500/50' : 'border-gray-300 dark:border-gray-700 focus:border-[#00FF85]'
                    }`}
                  />
                </div>
                {paymentErrors.number && (
                  <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-medium">{paymentErrors.number}</p>
                )}
              </div>

              {/* Expiry and CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-300 mb-1.5">
                    Срок действия
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardData.expiry}
                    onChange={handleExpiryChange}
                    placeholder="ММ/ГГ"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 border text-xs font-mono text-center tracking-wider text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all ${
                      paymentErrors.expiry ? 'border-red-500 ring-1 ring-red-500/50' : 'border-gray-300 dark:border-gray-700 focus:border-[#00FF85]'
                    }`}
                  />
                  {paymentErrors.expiry && (
                    <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-medium">{paymentErrors.expiry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-neutral-300 mb-1.5">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={cardData.cvc}
                    onChange={handleCvcChange}
                    placeholder="•••"
                    maxLength={3}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 border text-xs font-mono text-center tracking-wider text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all ${
                      paymentErrors.cvc ? 'border-red-500 ring-1 ring-red-500/50' : 'border-gray-300 dark:border-gray-700 focus:border-[#00FF85]'
                    }`}
                  />
                  {paymentErrors.cvc && (
                    <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-medium">{paymentErrors.cvc}</p>
                  )}
                </div>
              </div>

              {/* Cardholder name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-neutral-300 mb-1.5">
                  Имя владельца карты
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={handleNameChange}
                  placeholder="IVAN IVANOV"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 border text-xs uppercase font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all ${
                    paymentErrors.name ? 'border-red-500 ring-1 ring-red-500/50' : 'border-gray-300 dark:border-gray-700 focus:border-[#00FF85]'
                  }`}
                />
                {paymentErrors.name && (
                  <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 font-medium">{paymentErrors.name}</p>
                )}
              </div>
            </div>

            {/* Bottom info and submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-[#00FF85]" />
                <span>Защищенный SSL 256-bit платеж</span>
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-[#FF5E00] hover:brightness-110 active:scale-95 text-black font-black text-xs shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Обработка платежа...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Оплатить 1$ и получить Премиум</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Danger / Demo reset zone */}
      <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-700 dark:text-red-300">
            Управление данными и аккаунтом
          </h4>
          <p className="text-xs text-gray-600 dark:text-neutral-400 mt-0.5">
            Сбросить сохраненный прогресс и запустить приложение с начальными демо-данными.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoState}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить демо</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-neutral-400 dark:hover:text-white border border-gray-200 dark:border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};
