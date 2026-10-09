/**
 * Sport-Helper Health & Fitness Math Utilities
 */

// BMR via Mifflin-St Jeor equation (adapted safely for ages 5+)
export const calculateBMR = ({ weight, height, age, gender = 'male' }) => {
  const w = parseFloat(weight) || 75;
  const h = parseFloat(height) || 178;
  const a = Math.max(5, parseFloat(age) || 20);

  if (gender === 'female') {
    return Math.max(800, Math.round(10 * w + 6.25 * h - 5 * a - 161));
  }
  return Math.max(900, Math.round(10 * w + 6.25 * h - 5 * a + 5));
};

// Calculate daily targets based on user metrics and goal
export const calculateDailyTargets = ({ weight, height, age, gender = 'male', goal = 'lose_weight', activityLevel = 1.4 }) => {
  const bmr = calculateBMR({ weight, height, age, gender });
  const tdee = Math.round(bmr * (parseFloat(activityLevel) || 1.4));
  const w = parseFloat(weight) || 75;

  let targetCalories = tdee;
  let proteinRatio = 2.0; // g per kg
  let fatRatio = 0.9;     // g per kg

  if (goal === 'lose_weight') {
    // 20% deficit for sustainable fat loss
    targetCalories = Math.max(1400, Math.round(tdee * 0.8));
    proteinRatio = 2.2; // Protect muscle in deficit
    fatRatio = 0.8;
  } else if (goal === 'gain_muscle') {
    // 12-15% surplus for lean mass & hypertrophy
    targetCalories = Math.round(tdee * 1.15);
    proteinRatio = 2.2;
    fatRatio = 1.0;
  } else if (goal === 'calisthenics_strength') {
    // Athletic strength ratio: lean mass and relative power for L-sit & Planche
    targetCalories = Math.round(tdee * 1.06);
    proteinRatio = 2.3;
    fatRatio = 0.9;
  } else {
    // Maintenance
    targetCalories = tdee;
    proteinRatio = 1.8;
    fatRatio = 0.9;
  }

  const targetProteinGrams = Math.round(w * proteinRatio);
  const targetFatGrams = Math.round(w * fatRatio);
  
  // 1g Protein = 4 kcal, 1g Fat = 9 kcal, 1g Carbs = 4 kcal
  const proteinKcal = targetProteinGrams * 4;
  const fatKcal = targetFatGrams * 9;
  const remainingKcal = Math.max(200, targetCalories - (proteinKcal + fatKcal));
  const targetCarbsGrams = Math.round(remainingKcal / 4);

  return {
    calories: targetCalories,
    protein: targetProteinGrams,
    fats: targetFatGrams,
    carbs: targetCarbsGrams,
    bmr,
    tdee,
  };
};

// BMI Calculation
export const calculateBMI = (weight, height) => {
  const hMeters = (parseFloat(height) || 178) / 100;
  const wKg = parseFloat(weight) || 75;
  const bmi = +(wKg / (hMeters * hMeters)).toFixed(1);

  let label = 'Норма';
  let color = '#00FF85'; // neon green

  if (bmi < 18.5) {
    label = 'Дефицит веса';
    color = '#38BDF8';
  } else if (bmi >= 25 && bmi < 29.9) {
    label = 'Избыточный вес';
    color = '#F59E0B';
  } else if (bmi >= 30) {
    label = 'Ожирение';
    color = '#EF4444';
  }

  return { bmi, label, color };
};

// XP & Level calculations
export const calculateLevel = (totalXp = 0) => {
  // Level threshold: Level 1: 0, Level 2: 250, Level 3: 650, etc.
  // Formula: level = Math.floor(Math.sqrt(xp / 75)) + 1
  const level = Math.max(1, Math.floor(Math.sqrt(totalXp / 80)) + 1);
  const currentLevelBaseXp = Math.round(Math.pow(level - 1, 2) * 80);
  const nextLevelXp = Math.round(Math.pow(level, 2) * 80);
  const xpNeeded = nextLevelXp - currentLevelBaseXp;
  const xpCurrentInLevel = Math.max(0, totalXp - currentLevelBaseXp);
  const progressPercent = Math.min(100, Math.round((xpCurrentInLevel / (xpNeeded || 1)) * 100));

  const rankTitles = [
    'Новичок',
    'Начинающий атлет',
    'Энергичный',
    'Железный дух',
    'Продвинутый воркаутер',
    'Силовой атлет',
    'Мастер формы',
    'Гладиатор зала',
    'Кибер-атлет',
    'Легенда спорта'
  ];
  const title = rankTitles[Math.min(rankTitles.length - 1, level - 1)];

  return {
    level,
    title,
    currentLevelBaseXp,
    nextLevelXp,
    xpCurrentInLevel,
    xpNeeded,
    progressPercent,
  };
};

/**
 * Оценка физической подготовки на основе 5 силовых нормативов:
 * 1. Отжимания (pushups)
 * 2. Подтягивания (pullups)
 * 3. Приседания (squats)
 * 4. Скручивания на пресс (crunches)
 * 5. Отжимания на брусьях (dips)
 */
export const calculateFitnessLevelFromTest = ({ pushups = 0, pullups = 0, squats = 0, crunches = 0, dips = 0 }) => {
  const p = Number(pushups) || 0;
  const u = Number(pullups) || 0;
  const s = Number(squats) || 0;
  const c = Number(crunches) || 0;
  const d = Number(dips) || 0;

  // Оценка отжиманий: <12 => 1, 12-28 => 2, 29+ => 3
  const pushupScore = p < 12 ? 1 : p < 28 ? 2 : 3;
  // Оценка подтягиваний: <4 => 1, 4-10 => 2, 11+ => 3
  const pullupScore = u < 4 ? 1 : u < 11 ? 2 : 3;
  // Оценка приседаний: <20 => 1, 20-39 => 2, 40+ => 3
  const squatScore = s < 20 ? 1 : s < 40 ? 2 : 3;
  // Оценка скручиваний: <15 => 1, 15-29 => 2, 30+ => 3
  const crunchScore = c < 15 ? 1 : c < 30 ? 2 : 3;
  // Оценка отжиманий на брусьях: <4 => 1, 4-11 => 2, 12+ => 3
  const dipScore = d < 4 ? 1 : d < 12 ? 2 : 3;

  const totalPoints = pushupScore + pullupScore + squatScore + crunchScore + dipScore; // 5..15

  if (totalPoints <= 8) {
    return {
      levelKey: 'beginner',
      levelName: 'Начинающий',
      color: '#38BDF8',
      points: totalPoints,
      maxPoints: 15,
      description: 'Идеальный старт: правильная техника, укрепление связочного аппарата и базовые упражнения со своим весом.'
    };
  } else if (totalPoints <= 12) {
    return {
      levelKey: 'intermediate',
      levelName: 'Средний',
      color: '#00FF85',
      points: totalPoints,
      maxPoints: 15,
      description: 'Уверенная база: развитая выносливость, готовность к освоению гимнастических прогрессий (L-sit) и силовому воркауту.'
    };
  } else {
    return {
      levelKey: 'advanced',
      levelName: 'Продвинутый',
      color: '#FF5E00',
      points: totalPoints,
      maxPoints: 15,
      description: 'Элитный уровень: высокая мышечная сила, готовность к элементам калистеники (Tuck Planche, выходы силой) и предельным нагрузкам.'
    };
  }
};
