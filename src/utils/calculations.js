/**
 * Sport-Helper Health & Fitness Math Utilities
 */

// BMR via Mifflin-St Jeor equation
export const calculateBMR = ({ weight, height, age, gender = 'male' }) => {
  const w = parseFloat(weight) || 75;
  const h = parseFloat(height) || 178;
  const a = parseFloat(age) || 25;

  if (gender === 'female') {
    return Math.round(10 * w + 6.25 * h - 5 * a - 161);
  }
  return Math.round(10 * w + 6.25 * h - 5 * a + 5);
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
