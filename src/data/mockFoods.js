/**
 * Calorie Load Indicator Helper (Система светофора):
 * - Зеленый: до 250 ккал (Низкая калорийность / Диетическое)
 * - Желтый: от 251 до 450 ккал (Средняя калорийность)
 * - Оранжевый: от 451 до 700 ккал (Высокая калорийность)
 * - Красный: свыше 700 ккал (Очень высокая калорийность / Фастфуд)
 */
export const getCalorieLoadInfo = (calories) => {
  const c = Math.round(calories || 0);
  if (c <= 250) {
    return {
      level: 'low',
      label: 'Диетическое',
      sublabel: 'Низкая нагрузка',
      color: '#10B981', // green
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.35)',
      dotClass: 'bg-emerald-500',
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      shadow: '0 0 10px rgba(16, 185, 129, 0.2)'
    };
  }
  if (c <= 450) {
    return {
      level: 'medium',
      label: 'Средняя',
      sublabel: 'Умеренная нагрузка',
      color: '#EAB308', // yellow
      bg: 'rgba(234, 179, 8, 0.15)',
      border: 'rgba(234, 179, 8, 0.35)',
      dotClass: 'bg-yellow-400',
      badgeClass: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
      shadow: '0 0 10px rgba(234, 179, 8, 0.2)'
    };
  }
  if (c <= 700) {
    return {
      level: 'high',
      label: 'Сытное',
      sublabel: 'Высокая нагрузка',
      color: '#F97316', // orange
      bg: 'rgba(249, 115, 22, 0.15)',
      border: 'rgba(249, 115, 22, 0.35)',
      dotClass: 'bg-orange-500',
      badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
      shadow: '0 0 10px rgba(249, 115, 22, 0.2)'
    };
  }
  return {
    level: 'extreme',
    label: 'Фастфуд / Читмил',
    sublabel: 'Очень высокая нагрузка',
    color: '#EF4444', // red
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.35)',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-500/15 text-red-400 border-red-500/30',
    shadow: '0 0 10px rgba(239, 68, 68, 0.2)'
  };
};

export const mockFoods = [
  // ===================== ЗАВТРАК =====================
  {
    id: 'f1',
    name: 'Овсяная каша на воде с ягодами',
    category: 'Завтрак',
    caloriesPer100g: 68,
    proteinPer100g: 2.5,
    fatsPer100g: 1.2,
    carbsPer100g: 12.0,
    defaultPortionGrams: 250,
    icon: '🥣',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },
  {
    id: 'f2',
    name: 'Яичница из 3 яиц с зеленью',
    category: 'Завтрак',
    caloriesPer100g: 155,
    proteinPer100g: 12.6,
    fatsPer100g: 11.5,
    carbsPer100g: 0.7,
    defaultPortionGrams: 180,
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },
  {
    id: 'f3',
    name: 'Тост с авокадо и семенами чиа',
    category: 'Завтрак',
    caloriesPer100g: 230,
    proteinPer100g: 6.2,
    fatsPer100g: 14.5,
    carbsPer100g: 18.0,
    defaultPortionGrams: 120,
    icon: '🥑',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },
  {
    id: 'f4',
    name: 'Творог 5% с черникой и медом',
    category: 'Завтрак',
    caloriesPer100g: 115,
    proteinPer100g: 16.0,
    fatsPer100g: 5.0,
    carbsPer100g: 5.8,
    defaultPortionGrams: 200,
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },
  {
    id: 'f5',
    name: 'Сырники запеченные со стевией',
    category: 'Завтрак',
    caloriesPer100g: 182,
    proteinPer100g: 17.5,
    fatsPer100g: 6.0,
    carbsPer100g: 14.0,
    defaultPortionGrams: 160,
    icon: '🥞',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },
  {
    id: 'f21',
    name: 'Панкейки с арахисовой пастой и бананом',
    category: 'Завтрак',
    caloriesPer100g: 275,
    proteinPer100g: 9.0,
    fatsPer100g: 12.0,
    carbsPer100g: 32.0,
    defaultPortionGrams: 200,
    icon: '🥞',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'breakfast'
  },

  // ===================== ОБЕД =====================
  {
    id: 'f6',
    name: 'Куриное филе на гриле с брокколи',
    category: 'Обед',
    caloriesPer100g: 135,
    proteinPer100g: 28.0,
    fatsPer100g: 2.2,
    carbsPer100g: 1.5,
    defaultPortionGrams: 200,
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f7',
    name: 'Бурый рис с овощами и зеленью',
    category: 'Обед',
    caloriesPer100g: 112,
    proteinPer100g: 2.6,
    fatsPer100g: 0.9,
    carbsPer100g: 23.5,
    defaultPortionGrams: 180,
    icon: '🍚',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f8',
    name: 'Гречневая каша ядрица с говядиной',
    category: 'Обед',
    caloriesPer100g: 145,
    proteinPer100g: 12.5,
    fatsPer100g: 5.2,
    carbsPer100g: 18.0,
    defaultPortionGrams: 220,
    icon: '🍲',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f9',
    name: 'Стейк из лосося на пару со спаржей',
    category: 'Обед',
    caloriesPer100g: 198,
    proteinPer100g: 21.0,
    fatsPer100g: 12.5,
    carbsPer100g: 0.8,
    defaultPortionGrams: 180,
    icon: '🐟',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f10',
    name: 'Говяжий стейк рибай на гриле',
    category: 'Обед',
    caloriesPer100g: 245,
    proteinPer100g: 25.0,
    fatsPer100g: 16.0,
    carbsPer100g: 0.0,
    defaultPortionGrams: 220,
    icon: '🥩',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f11',
    name: 'Греческий салат с сыром фета и оливками',
    category: 'Обед',
    caloriesPer100g: 95,
    proteinPer100g: 3.2,
    fatsPer100g: 7.8,
    carbsPer100g: 3.5,
    defaultPortionGrams: 200,
    icon: '🥗',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f22',
    name: 'Крем-суп из тыквы с семечками',
    category: 'Обед',
    caloriesPer100g: 65,
    proteinPer100g: 1.8,
    fatsPer100g: 3.2,
    carbsPer100g: 7.5,
    defaultPortionGrams: 280,
    icon: '🥣',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },

  // ===================== УЖИН =====================
  {
    id: 'f12',
    name: 'Филе индейки запеченное с розмарином',
    category: 'Ужин',
    caloriesPer100g: 125,
    proteinPer100g: 25.0,
    fatsPer100g: 2.2,
    carbsPer100g: 0.5,
    defaultPortionGrams: 180,
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f13',
    name: 'Салат со свежим тунцом и руколой',
    category: 'Ужин',
    caloriesPer100g: 88,
    proteinPer100g: 14.2,
    fatsPer100g: 2.4,
    carbsPer100g: 2.5,
    defaultPortionGrams: 220,
    icon: '🥗',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f14',
    name: 'Овощи на гриле (цукини, перец, баклажан)',
    category: 'Ужин',
    caloriesPer100g: 48,
    proteinPer100g: 1.5,
    fatsPer100g: 1.8,
    carbsPer100g: 6.5,
    defaultPortionGrams: 220,
    icon: '🥦',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f15',
    name: 'Королевские креветки гриль с чесноком',
    category: 'Ужин',
    caloriesPer100g: 99,
    proteinPer100g: 20.8,
    fatsPer100g: 1.1,
    carbsPer100g: 1.0,
    defaultPortionGrams: 170,
    icon: '🦐',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f23',
    name: 'Филе белой рыбы (треска) на пару',
    category: 'Ужин',
    caloriesPer100g: 82,
    proteinPer100g: 17.8,
    fatsPer100g: 0.7,
    carbsPer100g: 0.0,
    defaultPortionGrams: 200,
    icon: '🐟',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },

  // ===================== ПЕРЕКУС =====================
  {
    id: 'f16',
    name: 'Протеиновый батончик (шоколад-орех)',
    category: 'Перекус',
    caloriesPer100g: 340,
    proteinPer100g: 33.0,
    fatsPer100g: 10.0,
    carbsPer100g: 28.0,
    defaultPortionGrams: 60,
    icon: '🍫',
    image: 'https://images.unsplash.com/photo-1622484216805-4c6e3b5dfd47?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },
  {
    id: 'f17',
    name: 'Греческий йогурт натуральный 2%',
    category: 'Перекус',
    caloriesPer100g: 73,
    proteinPer100g: 10.0,
    fatsPer100g: 2.0,
    carbsPer100g: 3.6,
    defaultPortionGrams: 150,
    icon: '🍧',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },
  {
    id: 'f18',
    name: 'Горсть миндаля и кешью',
    category: 'Перекус',
    caloriesPer100g: 585,
    proteinPer100g: 20.0,
    fatsPer100g: 50.5,
    carbsPer100g: 14.0,
    defaultPortionGrams: 35,
    icon: '🥜',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },
  {
    id: 'f19',
    name: 'Зеленое яблоко Гренни Смит',
    category: 'Перекус',
    caloriesPer100g: 48,
    proteinPer100g: 0.4,
    fatsPer100g: 0.2,
    carbsPer100g: 11.5,
    defaultPortionGrams: 160,
    icon: '🍏',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },
  {
    id: 'f20',
    name: 'Сывороточный протеин на миндальном молоке',
    category: 'Перекус',
    caloriesPer100g: 65,
    proteinPer100g: 11.0,
    fatsPer100g: 1.4,
    carbsPer100g: 2.1,
    defaultPortionGrams: 300,
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },

  // ===================== ФАСТФУД & ЧИТМИЛ =====================
  {
    id: 'f24',
    name: 'Двойной чизбургер с мраморной говядиной',
    category: 'Фастфуд',
    caloriesPer100g: 285,
    proteinPer100g: 15.0,
    fatsPer100g: 16.5,
    carbsPer100g: 21.0,
    defaultPortionGrams: 280, // 798 kcal (Extreme Red)
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f25',
    name: 'Шаурма с сочной курицей и чесночным соусом',
    category: 'Фастфуд',
    caloriesPer100g: 210,
    proteinPer100g: 11.5,
    fatsPer100g: 10.8,
    carbsPer100g: 19.5,
    defaultPortionGrams: 350, // 735 kcal (Extreme Red)
    icon: '🌯',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'lunch'
  },
  {
    id: 'f26',
    name: 'Пицца Пепперони на тонком тесте (3 куска)',
    category: 'Фастфуд',
    caloriesPer100g: 260,
    proteinPer100g: 12.0,
    fatsPer100g: 11.0,
    carbsPer100g: 28.0,
    defaultPortionGrams: 250, // 650 kcal (High Orange)
    icon: '🍕',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f27',
    name: 'Картофель фри с сырным соусом',
    category: 'Фастфуд',
    caloriesPer100g: 312,
    proteinPer100g: 3.8,
    fatsPer100g: 15.5,
    carbsPer100g: 41.0,
    defaultPortionGrams: 160, // 499 kcal (High Orange)
    icon: '🍟',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  },
  {
    id: 'f28',
    name: 'Роллы Филадельфия с лососем и сыром',
    category: 'Фастфуд',
    caloriesPer100g: 175,
    proteinPer100g: 8.5,
    fatsPer100g: 7.2,
    carbsPer100g: 20.0,
    defaultPortionGrams: 260, // 455 kcal (High Orange)
    icon: '🍱',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'dinner'
  },
  {
    id: 'f29',
    name: 'Шоколадный пончик Донат с глазурью',
    category: 'Фастфуд',
    caloriesPer100g: 420,
    proteinPer100g: 5.0,
    fatsPer100g: 22.0,
    carbsPer100g: 51.0,
    defaultPortionGrams: 85, // 357 kcal (Medium Yellow)
    icon: '🍩',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
    popularMealType: 'snack'
  }
];
