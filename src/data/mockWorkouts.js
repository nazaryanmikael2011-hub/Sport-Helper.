export const mockWorkouts = [
  // ===================== НАЧИНАЮЩИЙ УРОВЕНЬ =====================
  {
    id: 'w-beginner-calisthenics',
    title: 'Старт в калистенике: Базовая сила и суставы',
    subtitle: 'Классические отжимания, приседания и укрепление кора',
    goalTag: 'gain_muscle',
    category: 'Базовый воркаут',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 30,
    caloriesBurned: 220,
    xpReward: 100,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    description: 'Идеальная вводная программа со своим весом для новичков. Укрепляет связочный аппарат, плечи, пресс и ноги правильной биомеханикой.',
    exercises: [
      {
        id: 'bc1',
        name: 'Классические отжимания от пола',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Грудь, трицепс, кор',
        tip: 'Локти под 45° к корпусу, тело держи прямой натянутой струной.'
      },
      {
        id: 'bc2',
        name: 'Воздушные приседания (Air Squats)',
        sets: 3,
        reps: '15 повторений',
        restSeconds: 60,
        muscle: 'Квадрицепсы, ягодицы',
        tip: 'Пятки плотно прижаты к полу, колени не своди внутрь.'
      },
      {
        id: 'bc3',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 3,
        reps: '25 повторений',
        restSeconds: 45,
        muscle: 'Пресс, плечи, кардио',
        tip: 'Держи ровный спринтерский темп, таз не задирай выше плеч.'
      },
      {
        id: 'bc4',
        name: 'Планка с наклоном вперед (Planche Lean)',
        sets: 3,
        reps: '20 секунд',
        restSeconds: 60,
        muscle: 'Передние дельты, кор',
        tip: 'Округляй лопатки куполом и легко накатывайся плечами вперед.'
      }
    ]
  },
  {
    id: 'w-circuit-fatloss',
    title: 'Круговая тренировка: Total Fat Burn',
    subtitle: 'Адаптивная циклическая сессия для сушки и тонуса',
    goalTag: 'lose_weight',
    category: 'Круговой тренинг',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 30,
    caloriesBurned: 300,
    xpReward: 110,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    description: 'Легкие и эффективные интервалы для безопасного разгона метаболизма и сжигания лишних калорий без травматичных нагрузок.',
    exercises: [
      {
        id: 'c1',
        name: 'Воздушные приседания (Air Squats)',
        sets: 3,
        reps: '20 повторений',
        restSeconds: 30,
        muscle: 'Ноги, ягодицы',
        tip: 'Спина ровная, глубокий вдох на спуске.'
      },
      {
        id: 'c2',
        name: 'Классические отжимания от пола',
        sets: 3,
        reps: '10 повторений',
        restSeconds: 30,
        muscle: 'Грудь, плечи',
        tip: 'Если тяжело, можно выполнить часть повторений с колен.'
      },
      {
        id: 'c3',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 3,
        reps: '30 секунд',
        restSeconds: 30,
        muscle: 'Кор, выносливость',
        tip: 'Ритмичное дыхание через нос.'
      }
    ]
  },

  // ===================== СРЕДНИЙ УРОВЕНЬ =====================
  {
    id: 'w-lsit',
    title: 'Калистеника: Прогрессия L-Sit (Уголок)',
    subtitle: 'Мощный кор, компрессия и дельты со своим весом',
    goalTag: 'gain_muscle',
    category: 'Калистеника & Сила',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 35,
    caloriesBurned: 240,
    xpReward: 120,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Пошаговая методика освоения идеального L-sit на полу и брусьях. Развивает феноменальную силу пресса и стабильность плеч.',
    exercises: [
      {
        id: 'e1',
        name: 'L-Sit (Уголок на брусьях / полу)',
        sets: 4,
        reps: '15-20 секунд',
        restSeconds: 60,
        muscle: 'Кор, пресс, квадрицепсы',
        tip: 'Опускай плечи вниз, носки вытягивай в струну вперед.'
      },
      {
        id: 'e2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '12 повторений',
        restSeconds: 75,
        muscle: 'Грудные, трицепс',
        tip: 'Наклоняй корпус слегка вперед, сгибай локти до 90°.'
      },
      {
        id: 'e3',
        name: 'Алмазные отжимания (Diamond Push-ups)',
        sets: 3,
        reps: '15 повторений',
        restSeconds: 60,
        muscle: 'Трицепс, центр груди',
        tip: 'Пальцы в ромб под центром груди, локти вдоль ребер.'
      }
    ]
  },
  {
    id: 'w-street-hypertrophy',
    title: 'Воркаут & Масса: Тяга и Жим со своим весом',
    subtitle: 'Широкая спина и мощная грудь на турнике и брусьях',
    goalTag: 'gain_muscle',
    category: 'Силовой воркаут',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 50,
    caloriesBurned: 380,
    xpReward: 140,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Классический воркаут-комплекс для набора мышечной массы верхней части тела: спины, грудных и рук.',
    exercises: [
      {
        id: 'sh1',
        name: 'Подтягивания широким хватом с паузой',
        sets: 4,
        reps: '8-10 повторений',
        restSeconds: 90,
        muscle: 'Широчайшие, бицепс',
        tip: 'Тянись грудью к перекладине, фиксация 1 сек вверху.'
      },
      {
        id: 'sh2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '12-15 повторений',
        restSeconds: 75,
        muscle: 'Грудные, трицепс',
        tip: 'Подконтрольный спуск за 2 секунды.'
      },
      {
        id: 'sh3',
        name: 'Алмазные отжимания (Diamond Push-ups)',
        sets: 3,
        reps: '15 повторений',
        restSeconds: 60,
        muscle: 'Трицепс, грудь',
        tip: 'Локти не разводи в стороны.'
      }
    ]
  },
  {
    id: 'w-hiit-burn',
    title: 'HIIT: Взрывной Жиросжигатель 360°',
    subtitle: 'Высокоинтенсивный интервальный тренинг',
    goalTag: 'lose_weight',
    category: 'HIIT & Кардио',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 30,
    caloriesBurned: 390,
    xpReward: 130,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    description: 'Интервалы 40 секунд работы / 20 секунд отдыха. Максимальный разгон метаболизма и повышенный расход калорий.',
    exercises: [
      {
        id: 'h1',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 4,
        reps: '40 сек работы',
        restSeconds: 20,
        muscle: 'Пресс, плечи, бедра',
        tip: 'Удерживай максимальный скоростной каденс.'
      },
      {
        id: 'h2',
        name: 'Воздушные приседания (Air Squats)',
        sets: 4,
        reps: '40 сек работы',
        restSeconds: 20,
        muscle: 'Ноги, взрывная сила',
        tip: 'Глубокий сед, мощный подъем.'
      },
      {
        id: 'h3',
        name: 'Классические отжимания от пола',
        sets: 4,
        reps: '40 сек работы',
        restSeconds: 20,
        muscle: 'Грудь, трицепс',
        tip: 'Спина прямая, резкий выдох при жиме.'
      }
    ]
  },

  // ===================== ПРОДВИНУТЫЙ УРОВЕНЬ =====================
  {
    id: 'w-planche',
    title: 'Калистеника: Прогрессия Tuck Planche (Горизонт)',
    subtitle: 'Элитный гимнастический элемент силы плеч',
    goalTag: 'gain_muscle',
    category: 'Калистеника & Сила',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 45,
    caloriesBurned: 310,
    xpReward: 160,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Фундаментальная подготовка связок и плеч к горизонту на паралетсах и полу. Протокол включает протракцию лопаток и жесткую статику.',
    exercises: [
      {
        id: 'p1',
        name: 'Tuck Planche (Горизонт в группировке)',
        sets: 5,
        reps: '10-15 секунд',
        restSeconds: 90,
        muscle: 'Передние дельты, бицепс, кор',
        tip: 'Таз на уровне плеч. Колени плотно к груди, локти прямые как струны.'
      },
      {
        id: 'p2',
        name: 'Планка с наклоном вперед (Planche Lean)',
        sets: 4,
        reps: '25-30 секунд',
        restSeconds: 60,
        muscle: 'Передняя дельта, связки локтя',
        tip: 'Округляй верх спины куполом, плечи смещены далеко вперед за кисти.'
      },
      {
        id: 'p3',
        name: 'L-Sit (Уголок на брусьях / полу)',
        sets: 4,
        reps: '20 секунд',
        restSeconds: 60,
        muscle: 'Кор, пресс, квадрицепсы',
        tip: 'Прямые ноги параллельны полу, активная депрессия лопаток.'
      }
    ]
  },
  {
    id: 'w-muscleup-elite',
    title: 'Калистеника Pro: Выходы силой & Планш (Muscle-Up)',
    subtitle: 'Элитная взрывная тяга и элементы высокого уровня',
    goalTag: 'gain_muscle',
    category: 'Элитная калистеника',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 50,
    caloriesBurned: 400,
    xpReward: 180,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Программа для опытных атлетов: взрывные выходы силой на две руки, прогрессии горизонта и глубокие отжимания на брусьях.',
    exercises: [
      {
        id: 'm1',
        name: 'Выход силой на две руки (Muscle-Up)',
        sets: 4,
        reps: '4-6 повторений',
        restSeconds: 120,
        muscle: 'Широчайшие, грудь, взрывная сила',
        tip: 'Взрывная дугообразная тяга к солнечному сплетению с синхронным перекатом локтей.'
      },
      {
        id: 'm2',
        name: 'Tuck Planche (Горизонт в группировке)',
        sets: 4,
        reps: '12 секунд',
        restSeconds: 90,
        muscle: 'Дельты, бицепс, кор',
        tip: 'Руки заблокированы прямо, купол лопатками.'
      },
      {
        id: 'm3',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '18-20 повторений',
        restSeconds: 75,
        muscle: 'Грудь, трицепс',
        tip: 'Глубокая амплитуда с паузой внизу.'
      },
      {
        id: 'm4',
        name: 'L-Sit (Уголок на брусьях / полу)',
        sets: 3,
        reps: '25 секунд',
        restSeconds: 60,
        muscle: 'Пресс, кор',
        tip: 'Удерживай строгую параллель.'
      }
    ]
  },
  {
    id: 'w-tabata-speed',
    title: 'Табата Протокол: 20/10 Fat Shredder',
    subtitle: 'Ультра-интенсивные интервалы предельной мощности',
    goalTag: 'lose_weight',
    category: 'Табата',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 25,
    caloriesBurned: 340,
    xpReward: 140,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80',
    description: 'Научно доказанный метод Идзуми Табаты: 20 секунд предельной мощности, 10 секунд отдыха для опытных спортсменов.',
    exercises: [
      {
        id: 't1',
        name: 'Воздушные приседания (Air Squats)',
        sets: 8,
        reps: '20 сек работа / 10 сек отдых',
        restSeconds: 60,
        muscle: 'Ноги, взрывная сила',
        tip: 'Выдавай максимальное число чистых повторов.'
      },
      {
        id: 't2',
        name: 'Классические отжимания от пола',
        sets: 8,
        reps: '20 сек работа / 10 сек отдых',
        restSeconds: 60,
        muscle: 'Грудь, выносливость',
        tip: 'Держи темп до последней секунды интервала.'
      }
    ]
  }
];
