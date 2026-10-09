export const mockBadges = [
  {
    id: 'badge-first-workout',
    title: 'Первый шаг чемпиона',
    description: 'Заверши свою самую первую тренировку в приложении',
    icon: '⚡',
    xpReward: 50,
    category: 'workout',
    checkUnlocked: (state) => state.completedWorkouts?.length >= 1
  },
  {
    id: 'badge-streak-3',
    title: 'Железная воля: 3 дня',
    description: 'Поддерживай активность 3 дня подряд без пропусков',
    icon: '🔥',
    xpReward: 100,
    category: 'streak',
    checkUnlocked: (state) => (state.streak || 0) >= 3
  },
  {
    id: 'badge-streak-7',
    title: 'Неукротимый: Стрик 7 дней',
    description: 'Целая неделя дисциплины и преданности спорту',
    icon: '👑',
    xpReward: 250,
    category: 'streak',
    checkUnlocked: (state) => (state.streak || 0) >= 7
  },
  {
    id: 'badge-nutrition-master',
    title: 'Мастер нутрициологии',
    description: 'Добавь все 4 приема пищи (Завтрак, Обед, Ужин, Перекус)',
    icon: '🥗',
    xpReward: 75,
    category: 'nutrition',
    checkUnlocked: (state) => {
      const meals = state.meals || {};
      return (meals.breakfast?.length > 0) &&
             (meals.lunch?.length > 0) &&
             (meals.dinner?.length > 0) &&
             (meals.snack?.length > 0);
    }
  },
  {
    id: 'badge-calisthenics-pioneer',
    title: 'Повелитель гравитации',
    description: 'Пройди тренировку по калистенике (L-sit или Planche)',
    icon: '🤸‍♂️',
    xpReward: 150,
    category: 'workout',
    checkUnlocked: (state) => state.completedWorkouts?.some(w => w.id?.includes('lsit') || w.id?.includes('planche'))
  },
  {
    id: 'badge-cardio-beast',
    title: 'Кардио-машина',
    description: 'Сожги суммарно более 500 ккал на интенсивных тренировках',
    icon: '🏃‍♂️',
    xpReward: 120,
    category: 'workout',
    checkUnlocked: (state) => {
      const totalBurned = (state.completedWorkouts || []).reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
      return totalBurned >= 500;
    }
  },
  {
    id: 'badge-level-3',
    title: 'Восходящая звезда: Уровень 3',
    description: 'Заработай достаточно опыта для перехода на 3-й ранг',
    icon: '⭐',
    xpReward: 200,
    category: 'level',
    checkUnlocked: (state) => (state.level || 1) >= 3
  },
  {
    id: 'badge-fitness-shopper',
    title: 'Экипирован на 100%',
    description: 'Добавь спортивный товар в корзину или оформи заказ',
    icon: '🛍️',
    xpReward: 60,
    category: 'shop',
    checkUnlocked: (state) => (state.cart?.length > 0) || (state.orderHistory?.length > 0)
  }
];

export const motivationalQuotes = [
  "«Ты сильнее, чем твои оправдания. Выходи на максимум сегодня!»",
  "«Тяжелые тренировки сегодня — легкое превосходство завтра.»",
  "«Дисциплина — это решение делать то, чего не хочется, ради того, о чем мечтаешь.»",
  "«Каждый повтор делает тебя крепче, каждый прием пищи строит твое тело.»",
  "«Гравитация — это лишь вызов. Ты рожден побеждать!»",
  "«Не жди идеального момента, возьми этот момент и сделай его идеальным.»",
  "«Усталость пройдет, а результат останется навсегда.»"
];
