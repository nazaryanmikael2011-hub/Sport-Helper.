import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Award, Info, AlertTriangle, X } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useFitness();

  const getIcon = (type) => {
    switch (type) {
      case 'xp':
        return <Zap className="w-3.5 h-3.5 text-[#00FF85] fill-[#00FF85]/20 animate-pulse" />;
      case 'badge':
        return <Award className="w-3.5 h-3.5 text-[#FF5E00]" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF85]" />;
      case 'error':
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'xp':
        return 'border-emerald-500/40 shadow-[0_4px_16px_rgba(0,255,133,0.15)]';
      case 'badge':
        return 'border-orange-500/40 shadow-[0_4px_16px_rgba(255,94,0,0.15)]';
      case 'success':
        return 'border-emerald-500/40 shadow-[0_4px_16px_rgba(16,185,129,0.15)]';
      case 'error':
      case 'warning':
        return 'border-amber-500/50 shadow-[0_4px_16px_rgba(245,158,11,0.25)]';
      default:
        return 'border-sky-500/30';
    }
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-[70] pointer-events-none flex flex-col-reverse gap-2 max-w-[290px] sm:max-w-[330px] w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`pointer-events-auto bg-white dark:bg-gray-800 border ${getBorderColor(
              toast.type
            )} rounded-2xl p-2.5 sm:p-3 shadow-xl flex items-start gap-2.5 text-gray-900 dark:text-white`}
          >
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shrink-0 mt-0.5">
              {getIcon(toast.type)}
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white tracking-wide truncate">
                {toast.title}
              </h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5 leading-snug break-words line-clamp-2">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-1 -mr-1 -mt-0.5 shrink-0 cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
