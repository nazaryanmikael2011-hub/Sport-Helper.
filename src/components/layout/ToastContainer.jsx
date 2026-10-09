import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Award, Info, X } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useFitness();

  const getIcon = (type) => {
    switch (type) {
      case 'xp':
        return <Zap className="w-5 h-5 text-[#00FF85] fill-[#00FF85]/20 animate-pulse" />;
      case 'badge':
        return <Award className="w-5 h-5 text-[#FF5E00]" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#00FF85]" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-sky-400" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'xp':
        return 'border-[#00FF85]/40 shadow-neon-green';
      case 'badge':
        return 'border-[#FF5E00]/50 shadow-neon-orange';
      case 'success':
        return 'border-emerald-500/40';
      default:
        return 'border-sky-500/30';
    }
  };

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 pointer-events-none flex flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto bg-[#14141B]/95 backdrop-blur-xl border ${getBorderColor(
              toast.type
            )} rounded-2xl p-4 shadow-2xl flex items-start gap-3.5`}
          >
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {getIcon(toast.type)}
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h4 className="text-sm font-bold text-white tracking-wide truncate">
                {toast.title}
              </h4>
              <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white transition-colors p-1 -mr-1"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
