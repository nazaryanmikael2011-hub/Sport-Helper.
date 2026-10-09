import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { calculateDailyTargets, calculateLevel } from '../utils/calculations';
import { mockBadges } from '../data/mockBadges';

const FitnessContext = createContext(null);

const STORAGE_KEY = 'sport_helper_app_state_v2';

// Default initial user data for fresh start (all stats initialized with zeros)
const initialDefaultState = {
  user: {
    name: 'Атлет',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isLoggedIn: false,
  },
  profile: {
    weight: 75.0,
    targetWeight: 70.0,
    height: 178,
    age: 22,
    gender: 'male',
    goal: 'gain_muscle', // 'gain_muscle' | 'lose_weight' | 'calisthenics_strength'
    fitnessLevel: 'intermediate', // 'beginner' | 'intermediate' | 'advanced'
    fitnessLevelName: 'Средний',
    strengthTest: {
      pushups: 15,
      pullups: 5,
      squats: 20,
      crunches: 20,
      dips: 5
    },
    activityLevel: 1.4,
    isOnboarded: false,
  },
  weightHistory: [],
  meals: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  },
  completedWorkouts: [],
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  unlockedBadgeIds: [],
  cart: [],
  orderHistory: [],
  isPremium: false,
  trialDaysLeft: 90,
};

export const FitnessProvider = ({ children }) => {
  // Load initial state from localStorage or fallback
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return {
      ...initialDefaultState,
      user: {
        ...initialDefaultState.user,
        isLoggedIn: false,
      },
      profile: {
        ...initialDefaultState.profile,
        isOnboarded: false,
      }
    };
  });

  // Active workout runner state (not persisted in case of accidental reload)
  const [activeWorkout, setActiveWorkout] = useState(null);

  // Active toast notifications list
  const [toasts, setToasts] = useState([]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  // Toast notifier helper
  const addToast = useCallback((title, message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Award XP and check level up
  const awardXp = useCallback((amount, reason = '') => {
    setState((prev) => {
      const oldXp = prev.xp || 0;
      const newXp = oldXp + amount;
      const oldLevelInfo = calculateLevel(oldXp);
      const newLevelInfo = calculateLevel(newXp);

      if (newLevelInfo.level > oldLevelInfo.level) {
        // Trigger celebratory confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00FF85', '#FF5E00', '#F59E0B']
          });
        } catch (_) {}

        setTimeout(() => {
          addToast(
            `НОВЫЙ УРОВЕНЬ ${newLevelInfo.level}! 🏆`,
            `Поздравляем! Твой новый титул: "${newLevelInfo.title}". Так держать!`,
            'badge',
            6000
          );
        }, 300);
      } else {
        addToast(
          `+${amount} XP Получено! ⚡`,
          reason || 'За спортивную дисциплину',
          'xp',
          3500
        );
      }

      return {
        ...prev,
        xp: newXp
      };
    });
  }, [addToast]);

  // Check badges achievement trigger
  const checkAchievements = useCallback(() => {
    setState((prev) => {
      const currentUnlocked = new Set(prev.unlockedBadgeIds || []);
      let newlyUnlocked = [];
      let totalBonusXp = 0;

      mockBadges.forEach((badge) => {
        if (!currentUnlocked.has(badge.id)) {
          const isEligible = badge.checkUnlocked(prev);
          if (isEligible) {
            newlyUnlocked.push(badge);
            currentUnlocked.add(badge.id);
            totalBonusXp += badge.xpReward || 50;
          }
        }
      });

      if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((b) => {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#00FF85', '#FFFFFF']
            });
          } catch (_) {}

          addToast(
            `Достижение разблокировано: ${b.title} ${b.icon}`,
            `${b.description} (+${b.xpReward} XP)`,
            'badge',
            5000
          );
        });

        return {
          ...prev,
          unlockedBadgeIds: Array.from(currentUnlocked),
          xp: (prev.xp || 0) + totalBonusXp
        };
      }

      return prev;
    });
  }, [addToast]);

  // Daily targets based on current user metrics
  const dailyTargets = calculateDailyTargets(state.profile || {});

  // Current level info
  const levelInfo = calculateLevel(state.xp || 0);

  // Sum of today's nutrients
  const todayNutrients = Object.values(state.meals || {}).reduce(
    (acc, mealList) => {
      mealList.forEach((item) => {
        acc.calories += item.calories || 0;
        acc.protein += item.protein || 0;
        acc.fats += item.fats || 0;
        acc.carbs += item.carbs || 0;
      });
      return acc;
    },
    { calories: 0, protein: 0, fats: 0, carbs: 0 }
  );

  // Auth actions
  const login = (email, name) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        email: email || prev.user.email,
        name: name || prev.user.name,
        isLoggedIn: true
      }
    }));
    addToast('Вход выполнен!', `С возвращением, ${name || 'атлет'}!`, 'success');
  };

  const register = (email, name) => {
    setState((prev) => ({
      ...prev,
      user: {
        email,
        name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        isLoggedIn: true
      },
      profile: {
        ...prev.profile,
        isOnboarded: false
      },
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
      },
      completedWorkouts: [],
      xp: 0,
      streak: 1,
      unlockedBadgeIds: [],
      cart: [],
      orderHistory: [],
      isPremium: false,
      trialDaysLeft: 90
    }));
    addToast('Регистрация успешна!', 'Давай настроим твой профиль для максимальных результатов.', 'success');
  };

  const loadDemoUser = () => {
    setState({
      ...initialDefaultState,
      user: {
        ...initialDefaultState.user,
        isLoggedIn: true,
      },
      profile: {
        ...initialDefaultState.profile,
        isOnboarded: true,
      }
    });
    addToast('Демо-аккаунт активирован! ⚡', 'Добро пожаловать в SPORT HELPER, Алексей!', 'success');
  };

  const logout = () => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        isLoggedIn: false
      },
      profile: {
        ...prev.profile,
        isOnboarded: false
      }
    }));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    addToast('Выход выполнен', 'До скорой тренировки!', 'info');
  };

  // Profile actions
  const updateUserAvatar = (newAvatar) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        avatar: newAvatar
      }
    }));
    awardXp(30, 'За обновление фото профиля');
    addToast('Фото профиля обновлено! 📸', 'Новый аватар успешно сохранен', 'success');
  };

  const removeUserAvatar = () => {
    const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        avatar: defaultAvatar
      }
    }));
    addToast('Аватар удален', 'Установлено стандартное изображение', 'info');
  };

  const updateProfile = (newProfileData) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...newProfileData
      }
    }));
    addToast('Профиль обновлен', 'Новые нормы питания пересчитаны', 'success');
  };

  const updateFullProfile = ({ name, email, age, height, weight, targetWeight, goal, fitnessLevel, fitnessLevelName, strengthTest }) => {
    setState((prev) => {
      const updatedUser = {
        ...prev.user,
        ...(name && { name }),
        ...(email && { email }),
      };

      const updatedWeight = weight !== undefined ? parseFloat(weight) || prev.profile.weight : prev.profile.weight;
      const parsedAge = age !== undefined ? Math.max(5, parseInt(age, 10) || prev.profile.age) : prev.profile.age;

      const levelNamesMap = {
        beginner: 'Начинающий',
        intermediate: 'Средний',
        advanced: 'Продвинутый',
      };

      const finalLevelName = fitnessLevelName || (fitnessLevel ? levelNamesMap[fitnessLevel] : prev.profile.fitnessLevelName) || 'Средний';

      const updatedProfile = {
        ...prev.profile,
        age: parsedAge,
        ...(height !== undefined && { height: parseFloat(height) || prev.profile.height }),
        ...(weight !== undefined && { weight: updatedWeight }),
        ...(targetWeight !== undefined && { targetWeight: parseFloat(targetWeight) || prev.profile.targetWeight }),
        ...(goal && { goal }),
        ...(fitnessLevel && { fitnessLevel }),
        fitnessLevelName: finalLevelName,
        ...(strengthTest && { strengthTest: { ...prev.profile.strengthTest, ...strengthTest } }),
      };

      // Add to weight history if weight changed significantly
      let newWeightHistory = prev.weightHistory;
      if (weight && Math.abs(updatedWeight - prev.profile.weight) >= 0.1) {
        const todayStr = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date());
        newWeightHistory = [...prev.weightHistory, { date: todayStr, weight: updatedWeight }];
      }

      return {
        ...prev,
        user: updatedUser,
        profile: updatedProfile,
        weightHistory: newWeightHistory,
      };
    });

    awardXp(35, 'За актуализацию личных данных профиля');
    addToast('Изменения сохранены! ⚡', 'Личные данные обновлены, калории и тренировки пересчитаны.', 'success', 4500);
  };

  const finishOnboarding = (surveyData) => {
    const updatedWeight = parseFloat(surveyData.weight) || state.profile.weight || 75;
    const userAge = Math.max(5, parseInt(surveyData.age, 10) || 20);

    const levelNamesMap = {
      beginner: 'Начинающий',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
    };

    const finalLevel = surveyData.fitnessLevel || 'intermediate';
    const finalLevelName = surveyData.fitnessLevelName || levelNamesMap[finalLevel] || 'Средний';

    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        isLoggedIn: true,
      },
      profile: {
        ...prev.profile,
        ...surveyData,
        weight: updatedWeight,
        targetWeight: parseFloat(surveyData.targetWeight) || prev.profile.targetWeight,
        height: parseFloat(surveyData.height) || prev.profile.height,
        age: userAge,
        goal: surveyData.goal || prev.profile.goal,
        fitnessLevel: finalLevel,
        fitnessLevelName: finalLevelName,
        strengthTest: surveyData.strengthTest || prev.profile.strengthTest,
        isOnboarded: true
      },
      weightHistory: [
        {
          date: 'Старт',
          weight: updatedWeight
        }
      ],
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
      },
      completedWorkouts: [],
      xp: 0,
      streak: 1,
    }));
    addToast('Профиль атлета сформирован! 🎯', `Уровень "${finalLevelName}" присвоен. Тренировки и нормы адаптированы!`, 'success', 5000);
  };

  const addWeightEntry = (weightValue) => {
    const numericWeight = parseFloat(weightValue);
    if (!numericWeight || isNaN(numericWeight)) return;

    const todayStr = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date());

    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        weight: numericWeight
      },
      weightHistory: [
        ...prev.weightHistory,
        { date: todayStr, weight: numericWeight }
      ]
    }));

    awardXp(30, 'За отслеживание веса');
    addToast('Вес обновлен!', `Текущий показатель: ${numericWeight} кг`, 'success');
  };

  // Nutrition actions
  const addMealItem = (mealCategory, foodItem, portionGrams) => {
    const grams = parseFloat(portionGrams) || foodItem.defaultPortionGrams || 100;
    const ratio = grams / 100;

    const newItem = {
      id: 'meal_' + Date.now() + Math.random().toString(36).substring(2, 5),
      name: foodItem.name,
      portionGrams: grams,
      calories: Math.round(foodItem.caloriesPer100g * ratio),
      protein: +(foodItem.proteinPer100g * ratio).toFixed(1),
      fats: +(foodItem.fatsPer100g * ratio).toFixed(1),
      carbs: +(foodItem.carbsPer100g * ratio).toFixed(1),
      icon: foodItem.icon || '🥗'
    };

    setState((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealCategory]: [...(prev.meals[mealCategory] || []), newItem]
      }
    }));

    awardXp(15, 'За учет приема пищи');
    addToast('Блюдо добавлено!', `${newItem.name} (+${newItem.calories} ккал)`, 'success');
    
    // Check if achievements unlocked
    setTimeout(checkAchievements, 500);
  };

  const removeMealItem = (mealCategory, itemId) => {
    setState((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealCategory]: (prev.meals[mealCategory] || []).filter((item) => item.id !== itemId)
      }
    }));
    addToast('Удалено', 'Прием пищи скорректирован', 'info');
  };

  // Workout Player actions
  const startWorkout = (workout) => {
    setActiveWorkout(workout);
  };

  const finishWorkout = (workoutData) => {
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00FF85', '#FF5E00', '#38BDF8']
      });
    } catch (_) {}

    const completedEntry = {
      id: 'cw_' + Date.now(),
      workoutId: workoutData.id,
      title: workoutData.title,
      date: 'Сегодня, ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      durationMin: workoutData.durationMin || 30,
      caloriesBurned: workoutData.caloriesBurned || 300,
      xpEarned: workoutData.xpReward || 150
    };

    setState((prev) => ({
      ...prev,
      completedWorkouts: [completedEntry, ...(prev.completedWorkouts || [])],
      streak: (prev.streak || 0) + 1
    }));

    setActiveWorkout(null);
    awardXp(workoutData.xpReward || 150, 'За завершение тренировки');

    addToast(
      'ТРЕНИРОВКА ЗАВЕРШЕНА! 🔥',
      `Сожжено ~${workoutData.caloriesBurned || 300} ккал. Отличная работа! Ты на шаг ближе к своей идеальной форме, не сдавайся!`,
      'success',
      7000
    );

    setTimeout(checkAchievements, 600);
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
  };

  // Shop & Cart actions
  const addToCart = (product, quantity = 1) => {
    setState((prev) => {
      const existingIndex = prev.cart.findIndex((item) => item.product.id === product.id);
      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = [...prev.cart];
        updatedCart[existingIndex].quantity += quantity;
      } else {
        updatedCart = [...prev.cart, { product, quantity }];
      }
      return {
        ...prev,
        cart: updatedCart
      };
    });

    addToast('В корзине 🛒', `${product.name} добавлен`, 'success');
    setTimeout(checkAchievements, 500);
  };

  const removeFromCart = (productId) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.product.id !== productId)
    }));
  };

  const updateCartQuantity = (productId, delta) => {
    setState((prev) => {
      const updatedCart = prev.cart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      return {
        ...prev,
        cart: updatedCart
      };
    });
  };

  const clearCart = () => {
    setState((prev) => ({
      ...prev,
      cart: []
    }));
  };

  const checkout = () => {
    if (state.cart.length === 0) return;

    const orderTotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    setState((prev) => ({
      ...prev,
      orderHistory: [
        {
          id: 'ord_' + Date.now(),
          date: new Date().toLocaleDateString('ru-RU'),
          items: prev.cart,
          total: orderTotal
        },
        ...(prev.orderHistory || [])
      ],
      cart: []
    }));

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00FF85', '#FF5E00']
      });
    } catch (_) {}

    awardXp(100, 'За заказ спортивной экипировки');
    addToast(
      'Заказ успешно оформлен! 🚀',
      `Сумма: ${orderTotal.toLocaleString('ru-RU')} ₽. Скоро доставим!`,
      'success',
      6000
    );

    setTimeout(checkAchievements, 500);
  };

  // Reset entire state back to default / initial first-time screen
  const resetDemoState = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    setState({
      ...initialDefaultState,
      user: {
        ...initialDefaultState.user,
        isLoggedIn: false
      },
      profile: {
        ...initialDefaultState.profile,
        isOnboarded: false
      }
    });
    addToast('Данные сброшены', 'Экран первого входа активирован', 'info');
  };

  // Support / Premium activation logic
  const activatePremium = () => {
    setState((prev) => ({
      ...prev,
      isPremium: true,
      trialDaysLeft: 90
    }));

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00FF85', '#FFD700', '#FF5E00', '#38BDF8']
      });
    } catch (_) {}

    addToast('Спасибо за поддержку! 👑', 'Премиум активирован навсегда. Ваша помощь развивает SPORT HELPER!', 'badge', 6000);
  };

  return (
    <FitnessContext.Provider
      value={{
        ...state,
        dailyTargets,
        levelInfo,
        todayNutrients,
        activeWorkout,
        toasts,
        login,
        register,
        loadDemoUser,
        logout,
        updateProfile,
        updateFullProfile,
        finishOnboarding,
        addWeightEntry,
        addMealItem,
        removeMealItem,
        startWorkout,
        finishWorkout,
        cancelWorkout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkout,
        awardXp,
        addToast,
        removeToast,
        updateUserAvatar,
        removeUserAvatar,
        resetDemoState,
        activatePremium,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
