import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Sparkles, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const AuthModal = ({ isOpen, onClose, onOpenOnboarding }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, register } = useFitness();

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (isRegister && (!name || !name.trim())) {
      errs.name = 'Введите имя';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      errs.email = 'Введите почту';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Введите корректный email';
    }

    if (!password) {
      errs.password = 'Введите пароль';
    } else if (password.length < 6) {
      errs.password = 'Минимум 6 символов';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isRegister) {
      register(email.trim(), name.trim() || 'Новый Атлет');
      onClose();
      if (onOpenOnboarding) {
        onOpenOnboarding();
      }
    } else {
      login(email.trim(), name.trim() || 'Атлет');
      onClose();
    }
  };

  const fillDemo = () => {
    setName('Алексей Смирнов');
    setEmail('alex.athlete@sporthelper.io');
    setPassword('secret123');
    setErrors({});
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#121217] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Top ambient glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00FF85]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-xl bg-white/5 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00FF85]/15 border border-[#00FF85]/30 text-[#00FF85] mb-3 shadow-neon-green">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {isRegister ? 'Создать аккаунт' : 'Добро пожаловать'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isRegister
                ? 'Начни путь к эталонному телу и железной силе'
                : 'Войди, чтобы продолжить тренировочный стрик'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Твое имя или никнейм <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: null });
                    }}
                    placeholder="Введите имя"
                    className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-2 border-red-500/90 ring-2 ring-red-500/20'
                        : 'border border-white/10 focus:border-[#00FF85]'
                    }`}
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Электронная почта <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Введите почту"
                  className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-2 border-red-500/90 ring-2 ring-red-500/20'
                      : 'border border-white/10 focus:border-[#00FF85]'
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Пароль <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  placeholder="Введите пароль"
                  className={`w-full bg-[#1A1A24] rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-neutral-500/80 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-2 border-red-500/90 ring-2 ring-red-500/20'
                      : 'border border-white/10 focus:border-[#00FF85]'
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
                <div className="flex items-center gap-1.5 mt-1 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-neon-green transition-all mt-2 cursor-pointer"
            >
              <span>{isRegister ? 'Зарегистрироваться и пройти опрос' : 'Войти в личный кабинет'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill button */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
            <button
              type="button"
              onClick={fillDemo}
              className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00FF85]" />
              Заполнить тестовыми данными
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrors({});
              }}
              className="text-xs text-neutral-400 hover:text-white transition-colors text-center mt-1"
            >
              {isRegister ? (
                <>Уже есть аккаунт? <span className="text-[#00FF85] font-semibold underline underline-offset-2">Войти</span></>
              ) : (
                <>Нет аккаунта? <span className="text-[#00FF85] font-semibold underline underline-offset-2">Создать сейчас</span></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
