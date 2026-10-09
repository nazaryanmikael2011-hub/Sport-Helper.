export const mockExercisesDatabase = [
  {
    id: 'ex-lsit',
    name: 'L-Sit (Уголок на брусьях / полу)',
    category: 'Калистеника & Кор',
    isStatic: true,
    targetValue: 20,
    targetUnit: 'сек',
    difficulty: 'Средний',
    accentColor: '#00FF85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-950 via-[#10B981]/20 to-[#0A0A0C]',
    muscleTags: ['Кор', 'Пресс', 'Трицепс', 'Передние дельты', 'Квадрицепсы'],
    overview: 'Фундаментальный гимнастический элемент для развития компрессионной силы пресса, активной депрессии лопаток и железного хвата.',
    techniqueSteps: [
      'Займите исходное положение в упоре на прямых руках на паралетсах, брусьях или ладонях на полу.',
      'Опустите плечи вниз с максимальной силой (активная депрессия лопаток) — шея длинная, уши не прижимаются к плечам.',
      'Напрягите мышцы кора, поднимите прямые сомкнутые ноги до уровня параллели полу (угол 90° в тазобедренном суставе).',
      'Натяните носки вперед («струна»), колени заблокированы прямо, держите ровное дыхание через нос без задержек.'
    ],
    commonMistakes: [
      'Сгибание коленей из-за недостаточной гибкости задней поверхности бедра.',
      'Провал плеч вверх к ушам (потеря активного упора).',
      'Задержка дыхания, ведущая к резкому повышению внутрибрюшного давления.'
    ],
    breathingTip: 'Короткие ритмичные вдохи через нос и выдохи сквозь зубы для стабилизации внутрибрюшного давления.'
  },
  {
    id: 'ex-tuck-planche',
    name: 'Tuck Planche (Горизонт в группировке)',
    category: 'Калистеника & Сила плеч',
    isStatic: true,
    targetValue: 15,
    targetUnit: 'сек',
    difficulty: 'Продвинутый',
    accentColor: '#FF5E00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-orange-950 via-[#FF5E00]/25 to-[#0A0A0C]',
    muscleTags: ['Передние дельты', 'Бицепс', 'Зубчатые мышцы', 'Кор', 'Запястья'],
    overview: 'Первый и ключевой шаг на пути к полному горизонту (Full Planche). Формирует исключительную жесткость плечевого пояса и связок локтей.',
    techniqueSteps: [
      'Поставьте ладони или паралетсы на ширине плеч, слегка развернув кисти наружу на 30–45° для комфорта запястий.',
      'Выполните максимальную протракцию лопаток — округлите верх спины («купол»), вытолкнув грудной отдел вверх.',
      'Сместите центр тяжести вперед, так чтобы плечи оказались существенно впереди кистей рук.',
      'Подтяните колени максимально близко к груди, оторвите стопы от пола и выровняйте таз на одну высоту с плечами.',
      'Руки держите абсолютно прямыми в локтях (lockout), сжимая бицепс и дельты.'
    ],
    commonMistakes: [
      'Микросгибание локтей — превращает элемент в обычный упор и снимает нагрузку со связок.',
      'Слишком низкий таз (ниже уровня плеч) или завал лопаток.',
      'Недостаточный наклон плеч вперед.'
    ],
    breathingTip: 'Глубокая концентрация, плавное диафрагмальное дыхание в верхние отделы легких.'
  },
  {
    id: 'ex-planche-lean',
    name: 'Планка с наклоном вперед (Planche Lean)',
    category: 'Подготовка к горизонту',
    isStatic: true,
    targetValue: 30,
    targetUnit: 'сек',
    difficulty: 'Новичок',
    accentColor: '#00FF85',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-950 via-[#14F195]/20 to-[#0A0A0C]',
    muscleTags: ['Передние дельты', 'Кор', 'Зубчатые мышцы', 'Предплечья'],
    overview: 'Базовое статическое упражнение для укрепления дистальных сухожилий бицепса и передних дельт перед изучением планша.',
    techniqueSteps: [
      'Примите упор лежа на полу на прямых руках, кисти развернуты наружу.',
      'Максимально вытолкните лопатки вверх (протракция), сожмите ягодицы и подверните таз под себя (задний наклон таза).',
      'Накатитесь корпусом вперед на носках, сместив плечи на 10-15 см за проекцию запястий.',
      'Удерживайте это положение со статическим давлением ладонями в пол.'
    ],
    commonMistakes: [
      'Прогиб в пояснице — необходимо удерживать форму «банан» (Hollow Body).',
      'Отказ от сжатия ягодиц.'
    ],
    breathingTip: 'Держите стабильное дыхание на фоне постоянного мышечного корсета.'
  },
  {
    id: 'ex-pullups',
    name: 'Подтягивания широким хватом с паузой',
    category: 'Базовый воркаут',
    isStatic: false,
    targetValue: 12,
    targetUnit: 'раз',
    difficulty: 'Средний',
    accentColor: '#38BDF8',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-sky-950 via-sky-500/20 to-[#0A0A0C]',
    muscleTags: ['Широчайшие спины', 'Бицепс', 'Трапеции', 'Предплечья', 'Брахиалис'],
    overview: 'Королевское упражнение для развития V-образного силуэта, плотности спины и мощной тяги.',
    techniqueSteps: [
      'Возьмитесь за перекладину хватом шире плеч, начните движение из мертвого виса с активным сведением лопаток.',
      'На мощном выдохе подтяните грудную клетку к перекладине, направляя локти вниз и слегка назад.',
      'В верхней точке зафиксируйте подбородок над перекладиной с паузой на 1 секунду.',
      'Подконтрольно и плавно опуститесь вниз за 2–3 секунды до полного выпрямления рук без рывков.'
    ],
    commonMistakes: [
      'Использование раскачки ногами (киппинг) вместо чистой мышечной тяги.',
      'Неполная амплитуда в нижней точке.'
    ],
    breathingTip: 'Вдох в нижней точке, мощный акцентированный выдох при тяге вверх.'
  },
  {
    id: 'ex-dips',
    name: 'Отжимания на брусьях (Dips)',
    category: 'Силовой воркаут',
    isStatic: false,
    targetValue: 15,
    targetUnit: 'раз',
    difficulty: 'Средний',
    accentColor: '#00FF85',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Грудные мышцы', 'Трицепс', 'Передние дельты', 'Кор'],
    overview: 'Ключевое базовое движение для нижней и средней части груди, а также массивных трехглавых мышц плеча.',
    techniqueSteps: [
      'Займите исходное положение на брусьях на прямых руках, взгляд направлен перед собой.',
      'Слегка наклоните корпус вперед (угол 15–20°) для переноса нагрузки на грудные мышцы.',
      'На вдохе опуститесь вниз, сгибая локти до угла 90° или чуть глубже (при хорошей мобильности плеч).',
      'Мощным жимом вернитесь в исходное положение, зафиксировав верхнюю точку.'
    ],
    commonMistakes: [
      'Чрезмерное разведение локтей в стороны (риск травмы плечевых суставов).',
      'Резкие падения вниз без мышечного контроля эксцентрики.'
    ],
    breathingTip: 'Плавный вдох при опускании, форсированный выдох при выталкивании вверх.'
  },
  {
    id: 'ex-diamond-pushups',
    name: 'Алмазные отжимания (Diamond Push-ups)',
    category: 'Гипертрофия трицепса',
    isStatic: false,
    targetValue: 20,
    targetUnit: 'раз',
    difficulty: 'Средний',
    accentColor: '#FF5E00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-950 via-[#FF5E00]/20 to-[#0A0A0C]',
    muscleTags: ['Трицепс', 'Центр груди', 'Передние дельты', 'Пресс'],
    overview: 'Изолирующий акцент на медиальную и латеральную головки трицепса со своим весом.',
    techniqueSteps: [
      'Примите упор лежа, соединив указательные и большие пальцы рук в форме ромба («алмаза») под центром груди.',
      'Тело натянуто в струну: пресс напряжен, ягодицы сжаты, стопы на ширине таза.',
      'На вдохе опускайтесь грудью к сомкнутым пальцам, удерживая локти прижатыми близко к корпусу.',
      'На выдохе выжмите тело наверх силой трицепсов до полного распрямления рук.'
    ],
    commonMistakes: [
      'Провисание в пояснице.',
      'Разведение локтей перпендикулярно телу.'
    ],
    breathingTip: 'Вдох при касании грудью рук, выдох при распрямлении.'
  },
  {
    id: 'ex-burpees',
    name: 'Бёрпи с прыжком и хлопком (Burpees)',
    category: 'HIIT & Жиросжигание',
    isStatic: false,
    targetValue: 25,
    targetUnit: 'раз',
    difficulty: 'Продвинутый',
    accentColor: '#FF5E00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-950 via-[#FF5E00]/25 to-[#0A0A0C]',
    muscleTags: ['Все тело', 'ССС', 'Квадрицепсы', 'Грудь', 'Выносливость'],
    overview: 'Максимальный метаболический отклик, взрывной подъем ЧСС и колоссальный расход калорий.',
    techniqueSteps: [
      'Из положения стоя опуститесь в глубокий присед и положите ладони на пол перед собой.',
      'Прыжком выбросьте ноги назад, перейдя в планку, и опустите все тело на пол, коснувшись грудью и бедрами покрытия.',
      'Отожмитесь от пола и прыжком подтяните колени к ладоням.',
      'Взрывным усилием выпрыгните вертикально вверх с хлопком руками над головой.'
    ],
    commonMistakes: [
      'Приземление на прямые неамортизирующие колени.',
      'Прогиб поясницы при выходе в планку.'
    ],
    breathingTip: 'Ритмичный выдох при каждом прыжке вверх, вдох при касании грудью пола.'
  },
  {
    id: 'ex-mountain-climbers',
    name: 'Скалолаз (Mountain Climbers)',
    category: 'HIIT & Кор',
    isStatic: false,
    targetValue: 35,
    targetUnit: 'раз',
    difficulty: 'Новичок',
    accentColor: '#00FF85',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Кор', 'Плечи', 'Сгибатели бедра', 'Икры', 'Кардио'],
    overview: 'Динамическая планка на скорость для сжигания подкожного жира и формирования рельефного пресса.',
    techniqueSteps: [
      'Займите позицию планки на прямых руках, ладони точно под плечевыми суставами.',
      'Не поднимая таз, поочередно подтягивайте правое и левое колено вперед к груди в спринтерском темпе.',
      'Вес тела распределен между руками и носками, взгляд направлен в пол перед собой.',
      'Удерживайте предельный темп на протяжении всего подхода.'
    ],
    commonMistakes: [
      'Задирание таза вверх домиком.',
      'Раскачивание корпуса из стороны в сторону.'
    ],
    breathingTip: 'Частое циклическое дыхание на каждые 2 шага.'
  },
  {
    id: 'ex-jump-rope',
    name: 'Скоростная скакалка (Speed Rope)',
    category: 'Кардио & Координация',
    isStatic: false,
    targetValue: 60,
    targetUnit: 'раз',
    difficulty: 'Средний',
    accentColor: '#38BDF8',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-sky-950 via-sky-400/20 to-[#0A0A0C]',
    muscleTags: ['Икроножные мышцы', 'Предплечья', 'Плечи', 'Координация', 'Кардио'],
    overview: 'Классическое боксерское упражнение для развития резкости, плотности икр и сжигания калорий.',
    techniqueSteps: [
      'Встаньте прямо, держите рукоятки скакалки расслабленными пальцами, локти прижаты к бокам.',
      'Вращайте трос исключительно за счет коротких движений кистей, а не всей рукой.',
      'Прыгайте на носках, отрываясь от пола не более чем на 2–3 см, колени мягкие.',
      'Держите равномерный скоростной каденс.'
    ],
    commonMistakes: [
      'Слишком высокие прыжки с сгибанием коленей назад.',
      'Вращение троса от плеча.'
    ],
    breathingTip: 'Равномерный вдох на 3 прыжка, равномерный выдох на 3 прыжка.'
  }
];

// Helper to find exercise by id or name
export const findExerciseData = (nameOrId) => {
  if (!nameOrId) return mockExercisesDatabase[0];
  const query = nameOrId.toLowerCase();
  const match = mockExercisesDatabase.find(
    (ex) =>
      ex.id.toLowerCase() === query ||
      ex.name.toLowerCase().includes(query) ||
      query.includes(ex.name.toLowerCase()) ||
      (query.includes('lsit') && ex.id === 'ex-lsit') ||
      (query.includes('уголок') && ex.id === 'ex-lsit') ||
      (query.includes('planche') && ex.id === 'ex-tuck-planche') ||
      (query.includes('горизонт') && ex.id === 'ex-tuck-planche') ||
      (query.includes('отжимания') && ex.id === 'ex-diamond-pushups') ||
      (query.includes('брусь') && ex.id === 'ex-dips') ||
      (query.includes('подтягиван') && ex.id === 'ex-pullups') ||
      (query.includes('бёрпи') && ex.id === 'ex-burpees') ||
      (query.includes('скалолаз') && ex.id === 'ex-mountain-climbers') ||
      (query.includes('скакалк') && ex.id === 'ex-jump-rope')
  );
  return match || mockExercisesDatabase[0];
};
