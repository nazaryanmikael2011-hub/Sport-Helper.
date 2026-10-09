import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { calculateDailyTargets, calculateLevel } from '../utils/calculations';
import { mockBadges } from '../data/mockBadges';

const FitnessContext = createContext(null);

const STORAGE_KEY = 'sport_helper_app_state_v1';

// Default initial user data for demo/immediate immersion
const initialDefaultState = {
  user: {
    name: 'Алексей Смирнов',
    email: 'alex.athlete@sporthelper.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isLoggedIn: true,
  },
  profile: {
    weight: 78.5,
    targetWeight: 75.0,
    height: 180,
    age: 26,
    gender: 'male',
    goal: 'gain_muscle', // 'gain_muscle' | 'lose_weight'
    activityLevel: 1.4,
    isOnboarded: true,
  },
  weightHistory: [
    { date: '25 сен', weight: 81.0 },
    { date: '28 сен', weight: 80.4 },
    { date: '01 окт', weight: 79.8 },
    { date: '04 окт', weight: 79.2 },
    { date: '07 окт', weight: 78.8 },
    { date: '09 окт', weight: 78.5 },
  ],
  meals: {
    breakfast: [
      {
        id: 'm1',
        name: 'Овсяная каша с ягодами',
        portionGrams: 250,
        calories: 170,
        protein: 6.2,
        fats: 3.0,
        carbs: 30.0,
        icon: '🥣'
      },
      {
        id: 'm2',
        name: 'Яичница из 3 яиц с зеленью',
        portionGrams: 180,
        calories: 279,
        protein: 22.7,
        fats: 20.7,
        carbs: 1.3,
        icon: '🍳'
      }
    ],
    lunch: [
      {
        id: 'm3',
        name: 'Куриное филе на гриле',
        portionGrams: 200,
        calories: 284,
        protein: 59.0,
        fats: 5.0,
        carbs: 0.0,
        icon: '🍗'
      },
      {
        id: 'm4',
        name: 'Бурый рис отварной',
        portionGrams: 180,
        calories: 202,
        protein: 4.7,
        fats: 1.6,
        carbs: 42.3,
        icon: '🍚'
      }
    ],
    dinner: [
      {
        id: 'm5',
        name: 'Филе индейки запеченное',
        portionGrams: 180,
        calories: 225,
        protein: 45.0,
        fats: 4.0,
        carbs: 0.9,
        icon: '🍗'
      },
      {
        id: 'm6',
        name: 'Овощи на гриле',
        portionGrams: 200,
        calories: 96,
        protein: 3.0,
        fats: 3.6,
        carbs: 13.0,
        icon: '🥦'
      }
    ],
    snack: [
      {
        id: 'm7',
        name: 'Протеиновый шейк на миндальном молоке',
        portionGrams: 300,
        calories: 195,
        protein: 31.5,
        fats: 4.5,
        carbs: 6.6,
        icon: '🥤'
      }
    ]
  },
  completedWorkouts: [
    {
      id: 'cw-1',
      workoutId: 'w-lsit',
      title: 'Калистеника: Прогрессия L-Sit',
      date: 'Вчера, 18:30',
      durationMin: 35,
      caloriesBurned: 240,
      xpEarned: 120
    }
  ],
  xp: 380,
  streak: 5,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  unlockedBadgeIds: ['badge-first-workout', 'badge-streak-3', 'badge-calisthenics-pioneer'],
  cart: [
    {
      product: {
        id: 'prod-bands-set',
        name: 'Набор петель и фитнес-резинок для подтягиваний (5 уровней)',
        price: 1890,
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
        badge: 'Хит продаж',
        category: 'Аксессуары'
      },
      quantity: 1
    }
  ],
  orderHistory: []
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
      }
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

  const finishOnboarding = (surveyData) => {
    const updatedWeight = parseFloat(surveyData.weight) || state.profile.weight;
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
        age: parseInt(surveyData.age, 10) || prev.profile.age,
        goal: surveyData.goal || prev.profile.goal,
        isOnboarded: true
      },
      weightHistory: [
        ...prev.weightHistory,
        {
          date: 'Старт',
          weight: updatedWeight
        }
      ]
    }));
    awardXp(100, 'За завершение онбординга');
    addToast('Профиль атлета сформирован! 🎯', 'Программа тренировок и меню адаптированы под твою цель.', 'success', 5000);
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
