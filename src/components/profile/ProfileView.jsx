import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Edit2
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { mockBadges } from '../../data/mockBadges';
import { calculateBMI } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

import { AvatarUploader } from './AvatarUploader';

export const ProfileView = ({ onOpenOnboarding, onOpenAuth }) => {
  const { 
    user, 
    profile, 
    levelInfo, 
    dailyTargets, 
    streak, 
    unlockedBadgeIds, 
    orderHistory,
    updateProfile, 
    logout, 
    resetDemoState 
  } = useFitness();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    weight: profile.weight,
    targetWeight: profile.targetWeight,
    height: profile.height,
    age: profile.age,
    goal: profile.goal
  });

  const bmi = calculateBMI(profile.weight, profile.height);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00FF85]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
            <AvatarUploader size="md" />

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {user.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                  {levelInfo.title}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {user.email}
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                <span className="text-[#FF5E00] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-[#FF5E00]" />
                  {streak} дней стрик
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-[#00FF85] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Уровень {levelInfo.level}
                </span>
              </div>
            </div>
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Отмена' : 'Редактировать параметры'}</span>
            </button>

            <button
              onClick={onOpenOnboarding}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#00FF85]/15 hover:bg-[#00FF85]/25 text-[#00FF85] font-bold text-xs border border-[#00FF85]/30 transition-colors"
            >
              Пройти опрос заново
            </button>
          </div>
        </div>

        {/* Edit Parameters Form Drawer */}
        {isEditing && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSave}
            className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-3"
          >
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Текущий вес (кг)
              </label>
              <input
                type="number"
                step="0.1"
                value={editForm.weight}
                onChange={(e) => setEditForm({ ...editForm, weight: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00FF85]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Целевой вес (кг)
              </label>
              <input
                type="number"
                step="0.1"
                value={editForm.targetWeight}
                onChange={(e) => setEditForm({ ...editForm, targetWeight: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00FF85]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Рост (см)
              </label>
              <input
                type="number"
                value={editForm.height}
                onChange={(e) => setEditForm({ ...editForm, height: parseInt(e.target.value, 10) || 0 })}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00FF85]"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Цель
              </label>
              <select
                value={editForm.goal}
                onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF85]"
              >
                <option value="gain_muscle">Набор массы / Сила</option>
                <option value="lose_weight">Похудение / Рельеф</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-extrabold text-xs shadow-neon-green transition-all"
              >
                Сохранить
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Scale className="w-4 h-4 text-[#00FF85]" />
            <span>Вес / Цель</span>
          </div>
          <div className="text-xl font-black text-white">
            {profile.weight} <span className="text-xs text-neutral-400">→ {profile.targetWeight} кг</span>
          </div>
          <span className="text-[11px] text-[#00FF85] font-semibold mt-1 block">
            {profile.goal === 'gain_muscle' ? 'Набор мышечной массы' : 'Снижение жира'}
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Ruler className="w-4 h-4 text-sky-400" />
            <span>Рост & Возраст</span>
          </div>
          <div className="text-xl font-black text-white">
            {profile.height} см
          </div>
          <span className="text-[11px] text-neutral-400 font-medium mt-1 block">
            {profile.age} лет • ИМТ {bmi.bmi}
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Activity className="w-4 h-4 text-[#FF5E00]" />
            <span>Метаболизм (BMR)</span>
          </div>
          <div className="text-xl font-black text-white">
            {dailyTargets.bmr} <span className="text-xs text-neutral-400">ккал</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium mt-1 block">
            TDEE расход: {dailyTargets.tdee} ккал
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
            <Zap className="w-4 h-4 text-[#00FF85]" />
            <span>Норма на день</span>
          </div>
          <div className="text-xl font-black text-[#00FF85]">
            {dailyTargets.calories} <span className="text-xs text-neutral-400">ккал</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium mt-1 block">
            Б: {dailyTargets.protein}г • Ж: {dailyTargets.fats}г • У: {dailyTargets.carbs}г
          </span>
        </div>
      </div>

      {/* Achievements Gallery */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#FF5E00]/15 text-[#FF5E00]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Зал славы и достижения
              </h3>
              <p className="text-xs text-neutral-400">
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
                    ? 'bg-white/[0.04] border-[#00FF85]/30 shadow-[0_0_15px_-5px_rgba(0,255,133,0.15)]'
                    : 'bg-white/[0.01] border-white/5 opacity-40 grayscale'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{badge.icon}</span>
                    {isUnlocked ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00FF85]/15 text-[#00FF85] border border-[#00FF85]/30">
                        Получено
                      </span>
                    ) : (
                      <div className="p-1 rounded-full bg-white/5 text-neutral-400">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <h5 className="font-bold text-white text-sm">
                    {badge.title}
                  </h5>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 text-right">
                  <span className="text-[11px] font-bold text-[#00FF85]">
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
        <div className="glass-card rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-[#00FF85]" />
            <h3 className="text-base font-bold text-white">История заказов в магазине</h3>
          </div>
          <div className="space-y-3">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white">Заказ №{order.id.slice(-6)}</span>
                  <p className="text-neutral-400 mt-0.5">{order.date} • {order.items.length} поз.</p>
                </div>
                <span className="text-sm font-black text-[#00FF85]">
                  {formatCurrency(order.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Danger / Demo reset zone */}
      <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-300">
            Управление данными и аккаунтом
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Сбросить сохраненный прогресс и запустить приложение с начальными демо-данными.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoState}
            className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить демо</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
};
