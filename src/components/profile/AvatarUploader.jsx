import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image, Trash2, X, Upload, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const AvatarUploader = ({ className = '', size = 'md' }) => {
  const { user, updateUserAvatar, removeUserAvatar } = useFitness();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Detect mobile viewport (< 768px)
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleTriggerUpload = () => {
    if (isMobile) {
      setIsBottomSheetOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const previewUrl = URL.createObjectURL(file);

    // Convert to Data URL for persistent storage in localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      updateUserAvatar(dataUrl || previewUrl);
    };
    reader.readAsDataURL(file);

    // Reset input value so same file can be selected again if needed
    e.target.value = '';
    setIsBottomSheetOpen(false);
  };

  const handleRemove = () => {
    removeUserAvatar();
    setIsBottomSheetOpen(false);
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-28 h-28 sm:w-32 sm:h-32'
  }[size] || 'w-24 h-24 sm:w-28 sm:h-28';

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Interactive Avatar Container */}
      <div
        onClick={handleTriggerUpload}
        className={`relative ${sizeClasses} rounded-full cursor-pointer group select-none shadow-neon-green/30 transition-transform duration-300 hover:scale-[1.02]`}
      >
        {/* User Avatar Image */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full rounded-full object-cover border-2 border-[#00FF85] shadow-lg"
        />

        {/* Desktop Overlay (Appears on Hover) */}
        <div className="absolute inset-0 rounded-full bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex flex-col items-center justify-center p-2 text-white">
          <Camera className="w-5 h-5 text-[#00FF85] mb-1 stroke-[2.5]" />
          <span className="text-[10px] font-black tracking-wider uppercase text-neutral-200">
            Изменить фото
          </span>
        </div>

        {/* Mobile Overlay Badge (Always visible on mobile devices) */}
        <div className="absolute inset-x-0 bottom-0 py-1 bg-black/75 backdrop-blur-sm rounded-b-full md:hidden flex items-center justify-center gap-1 border-t border-white/10 text-white">
          <Camera className="w-3.5 h-3.5 text-[#00FF85]" />
          <span className="text-[9px] font-bold tracking-tight text-neutral-200">
            Изменить фото
          </span>
        </div>

        {/* Active glowing ring on hover */}
        <div className="absolute -inset-1 rounded-full border border-[#00FF85]/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-[1px]" />
      </div>

      {/* Bright Action Button Under Avatar */}
      <button
        type="button"
        onClick={handleTriggerUpload}
        className="mt-3.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FF85] to-[#10B981] hover:brightness-110 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-neon-green transition-all"
      >
        <Image className="w-4 h-4 stroke-[2.5]" />
        <span>Загрузить из галереи</span>
      </button>

      {/* Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#14141B] border-t border-white/10 rounded-t-3xl p-5 shadow-2xl flex flex-col gap-3 z-10 pb-safe"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 rounded-full bg-neutral-700 mx-auto -mt-1 mb-2" />

              {/* Title & Close */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <h4 className="text-base font-black text-white">
                    Фотография профиля
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Выберите источник для нового аватара
                  </p>
                </div>
                <button
                  onClick={() => setIsBottomSheetOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Options List */}
              <div className="space-y-2.5 pt-2">
                {/* 1. Take Photo (Camera) */}
                <button
                  type="button"
                  onClick={() => {
                    cameraInputRef.current?.click();
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-sm flex items-center gap-3 transition-colors text-left"
                >
                  <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <span>Сделать фото</span>
                    <span className="block text-[11px] text-neutral-400 font-normal">
                      Использовать камеру телефона
                    </span>
                  </div>
                </button>

                {/* 2. Choose from Gallery (Accent Colored) */}
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#00FF85]/20 to-[#10B981]/15 hover:from-[#00FF85]/30 hover:to-[#10B981]/25 border border-[#00FF85]/50 text-white font-bold text-sm flex items-center gap-3 shadow-neon-green/20 transition-all text-left"
                >
                  <div className="p-2.5 rounded-xl bg-[#00FF85] text-black">
                    <Image className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[#00FF85] font-black">Выбрать из галереи</span>
                    <span className="block text-[11px] text-neutral-300 font-normal">
                      Загрузить фото из памяти устройства
                    </span>
                  </div>
                </button>

                {/* 3. Delete Current Avatar (Red) */}
                <button
                  type="button"
                  onClick={handleRemove}
                  className="w-full p-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/15 border border-red-500/25 text-red-400 font-bold text-sm flex items-center gap-3 transition-colors text-left"
                >
                  <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span>Удалить текущее</span>
                    <span className="block text-[11px] text-neutral-400 font-normal">
                      Сбросить до стандартного аватара
                    </span>
                  </div>
                </button>
              </div>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setIsBottomSheetOpen(false)}
                className="w-full mt-2 py-3 rounded-2xl bg-white/5 text-neutral-300 font-bold text-xs hover:bg-white/10 transition-colors"
              >
                Отмена
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
