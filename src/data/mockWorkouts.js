export const mockWorkouts = [
  // =========================================================================
  // 1. ДОМА (HOME) - СО СВОИМ ВЕСОМ, ГАНТЕЛЯМИ, РЕЗИНКАМИ, СКАКАЛКОЙ
  // =========================================================================
  {
    id: 'w-beginner-calisthenics',
    title: 'Старт в калистенике: Базовая сила и суставы',
    subtitle: 'Классические отжимания, приседания и укрепление кора',
    location: 'home',
    requiredEquipment: [],
    goalTag: 'gain_muscle',
    category: 'Базовый воркаут',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 30,
    caloriesBurned: 220,
    xpReward: 100,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
    description: 'Идеальная вводная программа со своим весом для дома. Укрепляет связочный аппарат, плечи, пресс и ноги правильной биомеханикой.',
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
    location: 'home',
    requiredEquipment: [],
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

  {
    id: 'w-home-dumbbells',
    title: 'Домашний рельеф и сила с гантелями',
    subtitle: 'Базовые жимы, приседания с весом и пампинг дельт',
    location: 'home',
    requiredEquipment: ['dumbbells'],
    goalTag: 'gain_muscle',
    category: 'Свободные веса',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 40,
    caloriesBurned: 360,
    xpReward: 150,
    accentColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    description: 'Комплекс со свободными весами для плотной проработки мышечного рельефа дома: жимы над головой, гоблет-приседания и стабилизаторы.',
    exercises: [
      {
        id: 'hd1',
        name: 'Жим гантелей стоя на плечи',
        sets: 4,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Дельты, плечи, трицепс',
        tip: 'Корпус жесткий, не прогибайся в пояснице.'
      },
      {
        id: 'hd2',
        name: 'Приседания с гантелью (Goblet Squat)',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 60,
        muscle: 'Квадрицепсы, ягодичные',
        tip: 'Гантель прижата к груди, колени разводи по сторонам.'
      },
      {
        id: 'hd3',
        name: 'Классические отжимания от пола',
        sets: 3,
        reps: '15 повторений',
        restSeconds: 45,
        muscle: 'Грудные мышцы, трицепс',
        tip: 'Медленный спуск, взрывной подъем.'
      }
    ]
  },

  {
    id: 'w-home-resistance-bands',
    title: 'Функциональный комплекс с фитнес-резинками',
    subtitle: 'Анатомическая тяга, активация лопаток и пампинг',
    location: 'home',
    requiredEquipment: ['resistance_bands'],
    goalTag: 'gain_muscle',
    category: 'Фитнес-резинки',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 35,
    caloriesBurned: 260,
    xpReward: 120,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Безопасная нагрузка с эластичным сопротивлением: идеальна для здоровья суставов, королевской осанки и упругости мышц.',
    exercises: [
      {
        id: 'hr1',
        name: 'Тяга резинки к поясу сидя',
        sets: 4,
        reps: '18 повторений',
        restSeconds: 45,
        muscle: 'Широчайшие мышцы спины',
        tip: 'Своди лопатки в пиковой точке и удерживай паузу 1 секунду.'
      },
      {
        id: 'hr2',
        name: 'Воздушные приседания (Air Squats)',
        sets: 3,
        reps: '20 повторений',
        restSeconds: 45,
        muscle: 'Ноги, ягодицы',
        tip: 'Надень резинку чуть выше колен для двойной активации средней ягодичной.'
      },
      {
        id: 'hr3',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 3,
        reps: '30 секунд',
        restSeconds: 45,
        muscle: 'Кор, плечи',
        tip: 'Держи ровный темп.'
      }
    ]
  },

  {
    id: 'w-yoga-flow',
    title: 'Утренняя Йога: Подвижность & Суставы',
    subtitle: 'Асаны Сурья Намаскар, Воин II и Собака мордой вниз',
    location: 'home',
    requiredEquipment: [],
    goalTag: 'gain_muscle',
    category: 'Йога',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 25,
    caloriesBurned: 180,
    xpReward: 90,
    accentColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    description: 'Осознанный комплекс хатха-йоги для раскрытия тазобедренных суставов, вытяжения позвоночника и снятия мышечных зажимов.',
    exercises: [
      {
        id: 'yg1',
        name: 'Сурья Намаскар (Приветствие Солнцу)',
        sets: 3,
        reps: '5 циклов',
        restSeconds: 30,
        muscle: 'Все тело, позвоночник, кардио',
        tip: 'Синхронизируй каждое движение с глубоким носовым вдохом и выдохом.'
      },
      {
        id: 'yg2',
        name: 'Поза Воина II (Вирабхадрасана II)',
        sets: 2,
        reps: '45 секунд на сторону',
        restSeconds: 30,
        muscle: 'Бедра, ягодицы, плечевой пояс',
        tip: 'Колено передней ноги согнуто ровно под 90°, руки вытянуты параллельно полу.'
      },
      {
        id: 'yg3',
        name: 'Собака мордой вниз (Адхо Мукха Шванасана)',
        sets: 3,
        reps: '60 секунд',
        restSeconds: 30,
        muscle: 'Задняя поверхность бедра, плечи',
        tip: 'Толкай таз вверх и назад, спина прямая, пятки плавно тяни к коврику.'
      }
    ]
  },

  {
    id: 'w-boxing-fundamentals',
    title: 'Школа Бокса: Постановка удара и скакалка',
    subtitle: 'Классический челнок, джеб, кросс и уклоны',
    location: 'home',
    requiredEquipment: ['jump_rope'],
    goalTag: 'lose_weight',
    category: 'Бокс',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 35,
    caloriesBurned: 380,
    xpReward: 140,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
    description: 'Интенсивная боксерская сессия: постановка прямых ударов передней и задней рукой, маятниковая защита и прыжки на скакалке.',
    exercises: [
      {
        id: 'bx1',
        name: 'Джеб (Прямой удар передней рукой)',
        sets: 4,
        reps: '20 ударов',
        restSeconds: 45,
        muscle: 'Передняя дельта, широчайшие, трицепс',
        tip: 'Выбрасывай кулак резко как хлыст, доворачивая кисть горизонтально.'
      },
      {
        id: 'bx2',
        name: 'Кросс (Прямой удар сильной рукой)',
        sets: 4,
        reps: '15 ударов',
        restSeconds: 45,
        muscle: 'Ягодицы, косые мышцы пресса, плечи',
        tip: 'Удар начинается со стопы: проворачивай носок и бедро вперед.'
      },
      {
        id: 'bx3',
        name: 'Маятник и нырки (Защита от ударов)',
        sets: 3,
        reps: '45 секунд',
        restSeconds: 45,
        muscle: 'Квадрицепсы, мышцы кора',
        tip: 'Не наклоняй спину, уклоны выполняются сгибанием коленей.'
      }
    ]
  },

  {
    id: 'w-karate-do',
    title: 'Карате-До: Сила ударов и стойки (Кихон)',
    subtitle: 'Ой-Дзуки, Маэ-Гери и круговой Маваши-Гери',
    location: 'home',
    requiredEquipment: [],
    goalTag: 'gain_muscle',
    category: 'Карате',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 35,
    caloriesBurned: 320,
    xpReward: 135,
    accentColor: '#E11D48',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
    description: 'Традиционная боевая биомеханика: акцентированный реверс бедер (Хикитэ), прямолинейная пробивная мощь кулака и хлесткие удары ногами.',
    exercises: [
      {
        id: 'kt1',
        name: 'Ой-Дзуки (Удар кулаком с выпадом)',
        sets: 4,
        reps: '16 ударов',
        restSeconds: 45,
        muscle: 'Грудь, кор, бедра, дельты',
        tip: 'Синхронизируй касание кулака мишени с фиксацией стопы в стойке Дзэнкуцу-дати.'
      },
      {
        id: 'kt2',
        name: 'Маэ-Гери (Прямой удар ногой)',
        sets: 3,
        reps: '12 повторений на ногу',
        restSeconds: 45,
        muscle: 'Сгибатели бедра, квадрицепсы, пресс',
        tip: 'Сначала подними колено к груди, затем резко выброси стопу подушечками пальцев вперед.'
      },
      {
        id: 'kt3',
        name: 'Маваши-Гери (Круговой удар ногой)',
        sets: 3,
        reps: '10 повторений на ногу',
        restSeconds: 60,
        muscle: 'Косые мышцы, ягодицы, баланс',
        tip: 'Опорную стопу разворачивай наружу минимум на 135°, раскрывая таз.'
      }
    ]
  },

  {
    id: 'w-hiit-burn',
    title: 'HIIT Взрыв: Скакалка и скорость',
    subtitle: 'Кардио интервалы для максимального сжигания жира',
    location: 'home',
    requiredEquipment: ['jump_rope'],
    goalTag: 'lose_weight',
    category: 'HIIT & Кардио',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 25,
    caloriesBurned: 340,
    xpReward: 130,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    description: 'Короткие интервалы максимальной мощности со скакалкой для ускорения обмена веществ и сохранения мышечной массы.',
    exercises: [
      {
        id: 'h1',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 4,
        reps: '40 секунд',
        restSeconds: 20,
        muscle: 'Пресс, плечи',
        tip: 'Максимальный темп, колени тяни к груди.'
      },
      {
        id: 'h2',
        name: 'Воздушные приседания (Air Squats)',
        sets: 4,
        reps: '25 повторений',
        restSeconds: 30,
        muscle: 'Ноги, ягодицы',
        tip: 'Взрывной подъем, не задерживайся внизу.'
      },
      {
        id: 'h3',
        name: 'Классические отжимания от пола',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 30,
        muscle: 'Грудь, руки',
        tip: 'Строгая техника на фоне усталости.'
      }
    ]
  },

  {
    id: 'w-tabata-speed',
    title: 'Табата 4-минутный огонь: Предел ЧСС',
    subtitle: '20 сек спринт / 10 сек отдых х 8 раундов',
    location: 'home',
    requiredEquipment: [],
    goalTag: 'lose_weight',
    category: 'Интервальный тренинг',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 20,
    caloriesBurned: 300,
    xpReward: 160,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Сверхвысокая плотность нагрузки: 8 интервалов на пределе возможностей для рекордного расхода гликогена.',
    exercises: [
      {
        id: 't1',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 4,
        reps: '20 сек спринт',
        restSeconds: 10,
        muscle: 'Кор, выносливость',
        tip: 'Отдавай все силы в каждом раунде.'
      },
      {
        id: 't2',
        name: 'Воздушные приседания (Air Squats)',
        sets: 4,
        reps: '20 сек темп',
        restSeconds: 10,
        muscle: 'Квадрицепсы',
        tip: 'Не сбавляй частоту повторений.'
      }
    ]
  },

  // =========================================================================
  // 2. НА УЛИЦЕ / ВОРКАУТ (STREET) - ТУРНИК, БРУСЬЯ, СПРИНТ, СТРИТЛИФТИНГ
  // =========================================================================
  {
    id: 'w-street-calisthenics-base',
    title: 'Уличный воркаут: Базовый турник и брусья',
    subtitle: 'Фундаментальная подготовка для уличных площадок',
    location: 'street',
    requiredEquipment: ['pullup_bar'],
    goalTag: 'gain_muscle',
    category: 'Уличный воркаут',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 35,
    caloriesBurned: 280,
    xpReward: 125,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    description: 'Начальная уличная тренировка на спортивной площадке: австралийские подтягивания на низком турнике, упоры на брусьях и приседы.',
    exercises: [
      {
        id: 'stb1',
        name: 'Подтягивания на перекладине (Pull-Ups)',
        sets: 3,
        reps: '6-8 повторений',
        restSeconds: 90,
        muscle: 'Широчайшие, бицепс',
        tip: 'Подбородок уверенно над перекладиной, без рывка ногами.'
      },
      {
        id: 'stb2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 3,
        reps: '8-10 повторений',
        restSeconds: 90,
        muscle: 'Грудные, трицепс',
        tip: 'Опускайся до угла 90° в локтях.'
      },
      {
        id: 'stb3',
        name: 'Воздушные приседания (Air Squats)',
        sets: 3,
        reps: '20 повторений',
        restSeconds: 60,
        muscle: 'Ноги, ягодицы',
        tip: 'Спина прямая, колени смотрят по носкам.'
      }
    ]
  },

  {
    id: 'w-street-hypertrophy',
    title: 'Воркаут Гипертрофия: Подтягивания & Брусья',
    subtitle: 'Классический уличный сплит на широкую спину и мощную грудь',
    location: 'street',
    requiredEquipment: ['pullup_bar'],
    goalTag: 'gain_muscle',
    category: 'Уличный воркаут',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 40,
    caloriesBurned: 350,
    xpReward: 140,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Золотой стандарт калистеники: глубокие отжимания на параллельных брусьях и подтягивания широким хватом для мышечного объема.',
    exercises: [
      {
        id: 'sh1',
        name: 'Подтягивания на перекладине (Pull-Ups)',
        sets: 4,
        reps: '10 повторений',
        restSeconds: 90,
        muscle: 'Широчайшие, бицепс, трапеция',
        tip: 'Подбородок четко над перекладиной, пауза в нижней точке.'
      },
      {
        id: 'sh2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 90,
        muscle: 'Низ груди, трицепс',
        tip: 'Слегка наклони корпус вперед для акцента на грудные.'
      },
      {
        id: 'sh3',
        name: 'Классические отжимания от пола',
        sets: 3,
        reps: '20 повторений',
        restSeconds: 60,
        muscle: 'Грудь, передняя дельта',
        tip: 'Добей волокна пампингом в финале сессии.'
      }
    ]
  },

  {
    id: 'w-lsit',
    title: 'Прокачка пресса и уголок L-Sit на брусьях',
    subtitle: 'Статический элемент: пресс, квадрицепсы и предплечья',
    location: 'street',
    requiredEquipment: ['pullup_bar'],
    goalTag: 'calisthenics_strength',
    category: 'Статика & Кор',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 35,
    caloriesBurned: 260,
    xpReward: 120,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    description: 'Развитие компрессионной силы пресса и удержание ног под углом 90 градусов. Ключевой элемент для прогресса в калистенике.',
    exercises: [
      {
        id: 'e1',
        name: 'Уголок L-Sit на параллельных брусьях',
        sets: 4,
        reps: '15-20 секунд',
        restSeconds: 75,
        muscle: 'Прямая мышца живота, квадрицепсы',
        tip: 'Носки тяни от себя, колени держи сомкнутыми в замок.'
      },
      {
        id: 'e2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Трицепс, грудные мышцы',
        tip: 'Опускайся плавно, выжимай тело мощно.'
      },
      {
        id: 'e3',
        name: 'Планка с наклоном вперед (Planche Lean)',
        sets: 3,
        reps: '25 секунд',
        restSeconds: 60,
        muscle: 'Передние дельты, верх пресса',
        tip: 'Скругляй лопатки куполом, таз подобран.'
      }
    ]
  },

  {
    id: 'w-planche',
    title: 'Горизонт (Planche): Подводящие прогрессии',
    subtitle: 'Tuck Planche, накат плеч и укрепление сухожилий бицепса',
    location: 'street',
    requiredEquipment: [],
    goalTag: 'calisthenics_strength',
    category: 'Элементы калистеники',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 45,
    caloriesBurned: 320,
    xpReward: 200,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    description: 'Продвинутая сессия по освоению одного из самых впечатляющих статических элементов уличной гимнастики.',
    exercises: [
      {
        id: 'p1',
        name: 'Закрытый горизонт (Tuck Planche)',
        sets: 5,
        reps: '10-15 секунд',
        restSeconds: 90,
        muscle: 'Передние дельты, зубчатые мышцы, кор',
        tip: 'Колени плотно к груди, руки строго прямые как стальные колонны.'
      },
      {
        id: 'p2',
        name: 'Планка с наклоном вперед (Planche Lean)',
        sets: 4,
        reps: '30 секунд',
        restSeconds: 75,
        muscle: 'Передняя дельта, предплечья',
        tip: 'Плечи максимально далеко за линию запястий.'
      },
      {
        id: 'p3',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 90,
        muscle: 'Трицепс, плечевой пояс',
        tip: 'С сильной паузой в верхней точке.'
      }
    ]
  },

  {
    id: 'w-muscleup-elite',
    title: 'Выход силой (Muscle-Up) на перекладине',
    subtitle: 'Взрывная вертикальная тяга и транзишн в упор',
    location: 'street',
    requiredEquipment: ['pullup_bar'],
    goalTag: 'calisthenics_strength',
    category: 'Элитный воркаут',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 45,
    caloriesBurned: 400,
    xpReward: 220,
    accentColor: '#00FF85',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Мастерский уровень: скоростно-силовая координация для взрывного заброса тела над турником в один темп.',
    exercises: [
      {
        id: 'm1',
        name: 'Выход силой на турнике (Muscle-Up)',
        sets: 5,
        reps: '4-6 повторений',
        restSeconds: 120,
        muscle: 'Взрывная спина, трицепс, кор',
        tip: 'Тяни к животу по дуге, синхронно перекатывай оба локтя.'
      },
      {
        id: 'm2',
        name: 'Подтягивания на перекладине (Pull-Ups)',
        sets: 4,
        reps: '12 повторений',
        restSeconds: 90,
        muscle: 'Широчайшие, бицепс',
        tip: 'Взрывной подъем до груди.'
      },
      {
        id: 'm3',
        name: 'Отжимания на брусьях (Dips)',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 75,
        muscle: 'Трицепс, грудные',
        tip: 'Полная амплитуда с фиксацией.'
      },
      {
        id: 'm4',
        name: 'Уголок L-Sit на параллельных брусьях',
        sets: 3,
        reps: '20 секунд',
        restSeconds: 60,
        muscle: 'Мышцы пресса, квадрицепсы',
        tip: 'Прямые ноги параллельно земле.'
      }
    ]
  },

  {
    id: 'w-street-sprint-burn',
    title: 'Уличный кроссфит & Взрывной спринт',
    subtitle: 'Спринтерские интервалы, прыжки и мощный кор',
    location: 'street',
    requiredEquipment: [],
    goalTag: 'lose_weight',
    category: 'Уличный кроссфит',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 35,
    caloriesBurned: 390,
    xpReward: 155,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80',
    description: 'Уличная сессия на свежем воздухе без инвентаря: беговые спринты, взрывные приседы и планка на траве.',
    exercises: [
      {
        id: 'ss1',
        name: 'Воздушные приседания (Air Squats)',
        sets: 4,
        reps: '25 повторений',
        restSeconds: 30,
        muscle: 'Квадрицепсы, ягодицы',
        tip: 'Взрывное выпрыгивание вверх.'
      },
      {
        id: 'ss2',
        name: 'Скалолаз (Mountain Climbers)',
        sets: 4,
        reps: '45 секунд',
        restSeconds: 30,
        muscle: 'Мышцы кора, кардио',
        tip: 'Максимальный спринтерский темп.'
      },
      {
        id: 'ss3',
        name: 'Классические отжимания от пола',
        sets: 4,
        reps: '15 повторений',
        restSeconds: 45,
        muscle: 'Грудные, плечи',
        tip: 'Чистая амплитуда до травы.'
      }
    ]
  },

  // =========================================================================
  // 3. В ТРЕНАЖЕРНОМ ЗАЛЕ (GYM) - ШТАНГИ, ТРЕНАЖЕРЫ, БЛОКИ, КРОССОВЕР
  // =========================================================================
  {
    id: 'w-gym-starter',
    title: 'Зал: Вводный Full Body для новичков',
    subtitle: 'Базовые тренажеры, безопасная траектория и тонус',
    location: 'gym',
    requiredEquipment: ['gym_machines'],
    goalTag: 'gain_muscle',
    category: 'Тренажерный зал',
    levelKey: 'beginner',
    level: 'Начинающий',
    durationMin: 45,
    caloriesBurned: 320,
    xpReward: 130,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Идеальное начало в зале: безопасная фиксация суставов в тренажерах, подготовка связок и обучение базовой технике тяг и жимов.',
    exercises: [
      {
        id: 'gstr1',
        name: 'Тяга верхнего блока к груди',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Широчайшие мышцы спины',
        tip: 'Тяни рукоять локтями к ключицам, не отклоняйся сильно назад.'
      },
      {
        id: 'gstr2',
        name: 'Приседания с гантелью (Goblet Squat)',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Бедра, ягодицы',
        tip: 'Гантель держи у груди, таз уводи назад.'
      },
      {
        id: 'gstr3',
        name: 'Классические отжимания от пола',
        sets: 3,
        reps: '10 повторений',
        restSeconds: 60,
        muscle: 'Грудные, плечи',
        tip: 'Держи тело ровной натянутой струной.'
      }
    ]
  },

  {
    id: 'w-gym-chest-bench',
    title: 'Зал: Базовый жим штанги и объемная грудь',
    subtitle: 'Тяжелый жим лежа, наклонная скамья и брусья',
    location: 'gym',
    requiredEquipment: ['gym_machines'],
    goalTag: 'gain_muscle',
    category: 'Тренажерный зал',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 50,
    caloriesBurned: 420,
    xpReward: 160,
    accentColor: '#FF5E00',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Классический жимовой день: построение плотной мускулатуры груди, увеличение силовых показателей в жиме лежа и трицепс.',
    exercises: [
      {
        id: 'gc1',
        name: 'Классический жим штанги лежа',
        sets: 4,
        reps: '10 повторений',
        restSeconds: 90,
        muscle: 'Большая грудная, трицепс, дельты',
        tip: 'Лопатки сведены, гриф опускай подконтрольно к низу груди.'
      },
      {
        id: 'gc2',
        name: 'Отжимания на брусьях (Dips)',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 75,
        muscle: 'Низ груди, трицепс',
        tip: 'Наклон корпуса вперед на 20-30 градусов.'
      },
      {
        id: 'gc3',
        name: 'Жим гантелей стоя на плечи',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 60,
        muscle: 'Передняя и средняя дельта',
        tip: 'Выжимай вес вверх плавно без рывка тазом.'
      }
    ]
  },

  {
    id: 'w-gym-back-hypertrophy',
    title: 'Зал: Тяга верхнего блока и V-образная спина',
    subtitle: 'Широчайшие, трапеции, задняя дельта и мощный хват',
    location: 'gym',
    requiredEquipment: ['gym_machines'],
    goalTag: 'gain_muscle',
    category: 'Тренажерный зал',
    levelKey: 'intermediate',
    level: 'Средний',
    durationMin: 50,
    caloriesBurned: 440,
    xpReward: 165,
    accentColor: '#38BDF8',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    description: 'Глубокая проработка мышц спины: верхняя тяга широким хватом, подтягивания с собственным весом и пампинг широчайших.',
    exercises: [
      {
        id: 'gb1',
        name: 'Тяга верхнего блока к груди',
        sets: 4,
        reps: '12 повторений',
        restSeconds: 75,
        muscle: 'Широчайшие мышцы, круглые мышцы',
        tip: 'Своди лопатки в нижней точке, чувствуй сокращение спины.'
      },
      {
        id: 'gb2',
        name: 'Подтягивания на перекладине (Pull-Ups)',
        sets: 3,
        reps: '8-10 повторений',
        restSeconds: 90,
        muscle: 'Широчайшие, бицепс',
        tip: 'Полный вытяг внизу, без раскачки.'
      },
      {
        id: 'gb3',
        name: 'Тяга резинки к поясу сидя',
        sets: 3,
        reps: '15 повторений',
        restSeconds: 60,
        muscle: 'Ромбовидные, задняя дельта',
        tip: 'Локти веди вдоль туловища.'
      }
    ]
  },

  {
    id: 'w-gym-legs-power',
    title: 'Зал: День ног и тяжелые приседания со штангой',
    subtitle: 'Квадрицепсы, ягодичные, задняя поверхность бедра',
    location: 'gym',
    requiredEquipment: ['gym_machines'],
    goalTag: 'gain_muscle',
    category: 'Тренажерный зал',
    levelKey: 'advanced',
    level: 'Продвинутый',
    durationMin: 55,
    caloriesBurned: 520,
    xpReward: 210,
    accentColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Главный силовой день: тяжелые приседы со штангой на спине, развитие мощных квадрицепсов и анаболический стимул всего тела.',
    exercises: [
      {
        id: 'gl1',
        name: 'Приседания со штангой на плечах',
        sets: 4,
        reps: '8 повторений',
        restSeconds: 120,
        muscle: 'Квадрицепсы, большая ягодичная',
        tip: 'Глубокий вдох в живот, упор строго через пятки.'
      },
      {
        id: 'gl2',
        name: 'Приседания с гантелью (Goblet Squat)',
        sets: 3,
        reps: '12 повторений',
        restSeconds: 75,
        muscle: 'Квадрицепсы, кор',
        tip: 'Добивай объем седа с акцентом на квадрицепс.'
      },
      {
        id: 'gl3',
        name: 'Воздушные приседания (Air Squats)',
        sets: 3,
        reps: '25 повторений',
        restSeconds: 45,
        muscle: 'Ягодицы, выносливость',
        tip: 'Финальный метаболический пампинг.'
      }
    ]
  }
];
