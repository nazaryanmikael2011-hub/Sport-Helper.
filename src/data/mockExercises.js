/**
 * Sport-Helper Exercises Database
 * Categorized by fitness level:
 * - beginner ('Начинающий')
 * - intermediate ('Средний')
 * - advanced ('Продвинутый')
 * 
 * Each exercise includes step-by-step 2-3 visual photo phases (Start -> Movement -> Peak Contraction)
 * replacing legacy unreliable video players.
 */

export const mockExercisesDatabase = [
  // ===================== НАЧИНАЮЩИЙ УРОВЕНЬ =====================
  {
    id: 'ex-pushups-classic',
    name: 'Классические отжимания от пола',
    category: 'Базовый жим & Грудь',
    levelKey: 'beginner',
    level: 'Начинающий',
    isStatic: false,
    targetValue: 15,
    targetUnit: 'раз',
    accentColor: '#00FF85',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Грудные мышцы', 'Трицепс', 'Передняя дельта', 'Мышцы кора'],
    overview: 'Фундаментальное базовое движение для развития силы верхней части тела, плечевого пояса и стабильности корпуса.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Исходное положение (Упор лежа)',
        description: 'Ладони шире плеч, пальцы направлены вперед. Тело вытянуто в прямую струну: ягодицы сжаты, пресс напряжен, таз не провисает.',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Исходный+упор+лежа'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Опускание',
        title: 'Фаза движения (Эксцентрика)',
        description: 'На плавном вдохе подконтрольно опуститесь вниз, удерживая угол локтей 45° относительно туловища. Не разводите локти перпендикулярно.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Опускание+к+полу'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Пик',
        title: 'Пиковое сокращение грудных мышц',
        description: 'Коснитесь грудью пола (1–2 см) и мощным выдохом выжмите тело обратно вверх до полного разгибания локтей и сведения лопаток.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Пиковый+жим+и+фиксация'
      }
    ],
    techniqueSteps: [
      'Примите упор лежа на полу: ладони под проекцией плечевых суставов или чуть шире.',
      'Напрягите мышцы пресса и сожмите ягодицы, зафиксировав нейтральное положение позвоночника.',
      'На вдохе опуститесь вниз до угла 90° в локтях или легкого касания грудью пола.',
      'На акцентированном выдохе мощным усилием груди и трицепсов вернитесь в исходную точку.'
    ],
    commonMistakes: [
      'Прогиб в поясничном отделе из-за расслабленного пресса.',
      'Разведение локтей перпендикулярно корпусу (буквой "Т"), что травмирует плечи.'
    ],
    breathingTip: 'Вдох при опускании тела вниз, мощный резкий выдох при подъеме наверх.'
  },

  {
    id: 'ex-squats',
    name: 'Воздушные приседания (Air Squats)',
    category: 'Базовые ноги & Ягодицы',
    levelKey: 'beginner',
    level: 'Начинающий',
    isStatic: false,
    targetValue: 20,
    targetUnit: 'раз',
    accentColor: '#38BDF8',
    gradient: 'from-sky-950 via-sky-500/20 to-[#0A0A0C]',
    muscleTags: ['Квадрицепсы', 'Большая ягодичная', 'Подколенные сухожилия', 'Кор'],
    overview: 'Ключевое движение для укрепления ног, коленных суставов и формирования рельефных бедер без осевой нагрузки.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Исходное положение (Стойка)',
        description: 'Стопы на ширине плеч, носки слегка развернуты наружу (15–20°). Грудь раскрыта, взгляд направлен перед собой, руки перед грудью.',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+1:+Исходная+стойка'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Сед',
        title: 'Фаза опускания таза (Эксцентрика)',
        description: 'Отводите таз назад и плавно сгибайте колени. Колени двигаются строго в проекции носков, пятки прижаты к полу, спина прямая.',
        image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Опускание+в+сед'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Пик',
        title: 'Глубокий сед и выталкивание',
        description: 'Опуститесь до параллели бедер полу (или чуть ниже). Сделайте микропаузу и мощно вытолкнитесь пятками вверх, сжимая ягодицы.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Параллель+и+подъем'
      }
    ],
    techniqueSteps: [
      'Поставьте стопы на ширине плеч, вес тела распределен по всей стопе с акцентом на пятки.',
      'На вдохе опускайтесь вниз, отводя таз назад, как будто садитесь на невидимый стул.',
      'Достигните параллели бедра полу, не отрывая пятки и не сводя колени внутрь.',
      'На выдохе распрямите ноги и сожмите ягодицы в верхней точке.'
    ],
    commonMistakes: [
      'Сведение коленей внутрь при подъеме.',
      'Отрыв пяток от пола и перенос веса на носки.'
    ],
    breathingTip: 'Вдох при движении вниз, мощный выдох при распрямлении ног.'
  },

  {
    id: 'ex-mountain-climbers',
    name: 'Скалолаз (Mountain Climbers)',
    category: 'HIIT & Кор',
    levelKey: 'beginner',
    level: 'Начинающий',
    isStatic: false,
    targetValue: 30,
    targetUnit: 'раз',
    accentColor: '#00FF85',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Кор', 'Плечи', 'Сгибатели бедра', 'Икры', 'Кардио'],
    overview: 'Динамическая планка на скорость для сжигания подкожного жира и развития стабильности мышц кора.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Планка на прямых руках',
        description: 'Ладони четко под плечами, кисти упираются в пол. Корпус зафиксирован в форме натянутой струны.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Планка+на+руках'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Вынос',
        title: 'Подтягивание колена к груди',
        description: 'Взрывным движением подтяните правое колено к центру грудной клетки, не задирая таз вверх.',
        image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Колено+к+груди'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Смена',
        title: 'Скоростная циклическая смена ног',
        description: 'Прыжком верните правую ногу назад и одновременно вынесите вперед левое колено. Сохраняйте быстрый спринтерский темп.',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Быстрая+смена+ног'
      }
    ],
    techniqueSteps: [
      'Встаньте в упор лежа на прямых руках.',
      'Поочередно подтягивайте колени к груди в быстром темпе.',
      'Удерживайте таз на одной линии со спиной, избегайте раскачки.',
      'Дышите ритмично без задержек дыхания.'
    ],
    commonMistakes: [
      'Задирание таза вверх горкой.',
      'Потеря контроля над шеей (не заламывайте голову назад).'
    ],
    breathingTip: 'Равномерный вдох на каждые два шага, выдох на следующие два.'
  },

  // ===================== СРЕДНИЙ УРОВЕНЬ =====================
  {
    id: 'ex-lsit',
    name: 'L-Sit (Уголок на брусьях / полу)',
    category: 'Калистеника & Кор',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: true,
    targetValue: 20,
    targetUnit: 'сек',
    accentColor: '#00FF85',
    gradient: 'from-emerald-950 via-[#10B981]/20 to-[#0A0A0C]',
    muscleTags: ['Кор', 'Пресс', 'Трицепс', 'Передние дельты', 'Квадрицепсы'],
    overview: 'Фундаментальный гимнастический элемент для развития компрессионной силы пресса, депрессии лопаток и железного хвата.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Упор на брусьях (Депрессия лопаток)',
        description: 'Руки заблокированы прямо в локтях. Вытолкните плечи вниз с максимальной силой (депрессия лопаток), удлиняя шею.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Активный+упор'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Подъем',
        title: 'Подъем прямых ног (Компрессия)',
        description: 'Силой нижнего пресса и квадрицепсов поднимите прямые сомкнутые ноги до горизонтали (угол 90° в тазу).',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Подъем+ног+до+90'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Фиксация',
        title: 'Статическое удержание L-формы',
        description: 'Заблокируйте колени, натяните носки вперед («струна»). Удерживайте параллель пола, дыша через нос.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Фиксация+L-Sit'
      }
    ],
    techniqueSteps: [
      'Займите исходное положение в упоре на прямых руках на брусьях, паралетсах или полу.',
      'Опустите плечи вниз с максимальной силой (шея свободная, плечи не касаются ушей).',
      'Напрягите мышцы кора, поднимите прямые сомкнутые ноги до уровня параллели полу.',
      'Натяните носки вперед, колени держите прямо, удерживайте таймер без рывков.'
    ],
    commonMistakes: [
      'Сгибание коленей из-за закрепощенного подколенного сухожилия.',
      'Провал плеч вверх к ушам.'
    ],
    breathingTip: 'Короткие ритмичные вдохи через нос и выдохи сквозь зубы.'
  },

  {
    id: 'ex-pullups',
    name: 'Подтягивания широким хватом с паузой',
    category: 'Базовый воркаут',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 12,
    targetUnit: 'раз',
    accentColor: '#38BDF8',
    gradient: 'from-sky-950 via-sky-500/20 to-[#0A0A0C]',
    muscleTags: ['Широчайшие спины', 'Бицепс', 'Трапеции', 'Предплечья'],
    overview: 'Королевское упражнение для развития V-образного силуэта спины, силы предплечий и мощной вертикальной тяги.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Вис и активная ретракция лопаток',
        description: 'Хват шире плеч. Начните движение из прямого виса: опустите лопатки вниз и сведите их вместе до сгибания рук.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+1:+Активный+вис'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Тяга',
        title: 'Тяга грудью к перекладине',
        description: 'Мощным движением тяните локти вниз и слегка назад. Грудь раскрывается навстречу турнику.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Тяга+грудью+к+турнику'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Пик',
        title: 'Пиковая пауза подбородка над турником',
        description: 'Зафиксируйте подбородок над перекладиной с паузой на 1 секунду, максимально прожимая широчайшие мышцы.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Пиковая+фиксация'
      }
    ],
    techniqueSteps: [
      'Возьмитесь за перекладину хватом шире плеч.',
      'Начните тягу со сведения лопаток без рывка ногами.',
      'Подтяните грудную клетку к перекладине, направляя локти вниз.',
      'Плавно опуститесь вниз за 2 секунды до полного выпрямления рук.'
    ],
    commonMistakes: [
      'Раскачка ногами (киппинг).',
      'Неполное опускание в нижней точке.'
    ],
    breathingTip: 'Вдох в висе, резкий акцентированный выдох при движении вверх.'
  },

  {
    id: 'ex-dips',
    name: 'Отжимания на брусьях (Dips)',
    category: 'Силовой воркаут',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 15,
    targetUnit: 'раз',
    accentColor: '#00FF85',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Грудные мышцы', 'Трицепс', 'Передние дельты', 'Кор'],
    overview: 'Базовое движение со своим весом для построения массивного низа груди и трицепсов.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Исходное положение на брусьях',
        description: 'Упор на прямых руках, взгляд вперед. Корпус слегка наклонен вперед (15–20°) для акцента на грудные мышцы.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Упор+на+брусьях'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Опускание',
        title: 'Глубокое подконтрольное опускание',
        description: 'На вдохе опускайтесь вниз, сгибая локти до прямого угла 90°. Локти держите ближе к корпусу.',
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Опускание+до+90'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Пик',
        title: 'Мощный жим наверх',
        description: 'На выдохе мощным усилием груди и трицепсов выжмите себя обратно вверх до полного выпрямления рук.',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Верхняя+точка'
      }
    ],
    techniqueSteps: [
      'Займите положение упора на брусьях на прямых руках.',
      'Наклоните корпус слегка вперед.',
      'На вдохе опуститесь до угла 90° в локтях.',
      'На выдохе выжмите тело вверх, зафиксировав верхнюю точку.'
    ],
    commonMistakes: [
      'Чрезмерно широкое разведение локтей в стороны.',
      'Резкие рывки и падение без контроля связок.'
    ],
    breathingTip: 'Вдох при опускании, выдох при жиме наверх.'
  },

  {
    id: 'ex-diamond-pushups',
    name: 'Алмазные отжимания (Diamond Push-ups)',
    category: 'Гипертрофия трицепса',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 18,
    targetUnit: 'раз',
    accentColor: '#FF5E00',
    gradient: 'from-amber-950 via-[#FF5E00]/20 to-[#0A0A0C]',
    muscleTags: ['Трицепс', 'Центр груди', 'Передние дельты', 'Пресс'],
    overview: 'Изолирующий акцент на медиальную и латеральную головки трицепса со своим весом.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Смыкание кистей в форме ромба',
        description: 'Упор лежа, пальцы рук сомкнуты в форме "алмаза" строго под центром грудной клетки.',
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+1:+Алмазный+упор'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Опускание',
        title: 'Касание грудью кистей',
        description: 'Локти прижаты к телу, опуститесь грудью прямо к сомкнутым ладоням.',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Касание+груди'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Пик',
        title: 'Пиковое распрямление трицепса',
        description: 'Вытолкните корпус вверх до максимального сжатия трехглавой мышцы плеча.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+3:+Пик+трицепса'
      }
    ],
    techniqueSteps: [
      'Соедините указательные и большие пальцы под центром груди.',
      'На вдохе опуститесь грудью к пальцам, локти вдоль ребер.',
      'На выдохе выжмите себя наверх силой трицепса.'
    ],
    commonMistakes: [
      'Разведение локтей в стороны от корпуса.',
      'Провисание таза.'
    ],
    breathingTip: 'Вдох при опускании, выдох при подъеме.'
  },

  // ===================== ПРОДВИНУТЫЙ УРОВЕНЬ =====================
  {
    id: 'ex-tuck-planche',
    name: 'Tuck Planche (Горизонт в группировке)',
    category: 'Калистеника & Сила плеч',
    levelKey: 'advanced',
    level: 'Продвинутый',
    isStatic: true,
    targetValue: 15,
    targetUnit: 'сек',
    accentColor: '#FF5E00',
    gradient: 'from-orange-950 via-[#FF5E00]/25 to-[#0A0A0C]',
    muscleTags: ['Передние дельты', 'Бицепс', 'Зубчатые мышцы', 'Кор', 'Запястья'],
    overview: 'Элитный гимнастический элемент силы плечевого пояса на пути к полному горизонту (Full Planche).',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Протракция лопаток и наклон плеч',
        description: 'Ладони на паралетсах или полу, кисти развернуты на 30–45°. Округлите верх спины куполом (протракция) и наклоните плечи вперед за запястья.',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+1:+Протракция+и+наклон'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Отрыв',
        title: 'Подтягивание коленей к груди и отрыв',
        description: 'Подтяните колени плотно к ребрам, оторвите стопы от земли. Руки абсолютно прямые в локтях (lockout).',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Колени+к+груди'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Горизонт',
        title: 'Удержание таза на уровне плеч',
        description: 'Выровняйте таз на одну горизонтальную линию с плечами. Держите сильнейшее давление в упор, удерживая таймер.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+3:+Tuck+Planche+удержание'
      }
    ],
    techniqueSteps: [
      'Поставьте ладони на ширине плеч, слегка развернув кисти наружу.',
      'Округлите верх спины ("купол"), вытолкнув лопатки вверх.',
      'Наклонитесь плечами вперед за проекцию кистей.',
      'Подтяните колени к груди, оторвите стопы и поднимите таз на уровень плеч.'
    ],
    commonMistakes: [
      'Микросгибание локтей — снимает нагрузку с передних дельт и связок.',
      'Таз ниже уровня плеч.'
    ],
    breathingTip: 'Спокойное диафрагмальное дыхание без паники.'
  },

  {
    id: 'ex-muscleup',
    name: 'Выход силой на две руки (Muscle-Up)',
    category: 'Элитная калистеника',
    levelKey: 'advanced',
    level: 'Продвинутый',
    isStatic: false,
    targetValue: 6,
    targetUnit: 'раз',
    accentColor: '#FF5E00',
    gradient: 'from-orange-950 via-[#FF5E00]/25 to-[#0A0A0C]',
    muscleTags: ['Широчайшие', 'Грудь', 'Трицепс', 'Взрывная сила', 'Плечи'],
    overview: 'Вершина уличного воркаута: объединение взрывного высокого подтягивания, глубокого переката кистей и жима над турником.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Тяга',
        title: 'Взрывное подтягивание к солнечному сплетению',
        description: 'Глубокий хват (False Grip). Взрывным движением подтяните тело так, чтобы перекладина оказалась на уровне низа груди.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+1:+Взрывная+тяга+к+животу'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Перекат',
        title: 'Транзишн (Перекат корпуса над турником)',
        description: 'Быстро перенесите плечи и грудь над перекладиной, синхронно проворачивая локти вверх.',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Перекат+над+перекладиной'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Жим',
        title: 'Жим над перекладиной в полный упор',
        description: 'Из глубокого нижнего упора выжмите корпус вверх до полного выпрямления рук над турником.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+3:+Выход+в+полный+упор'
      }
    ],
    techniqueSteps: [
      'Возьмитесь за турник закрытым глубоким хватом.',
      'Сделайте взрывную мощную тягу не вверх, а по дуге к пупку.',
      'Синхронно перебросьте оба локтя над турником.',
      'Выжмите тело в упор на прямых руках.'
    ],
    commonMistakes: [
      'Выход на одну руку "сквозняком" (опасно для связок локтя и плеча).',
      'Слишком слабый подъем в первой фазе тяги.'
    ],
    breathingTip: 'Вдох перед рывком, форсированный выдох при перекате и жиме.'
  },

  {
    id: 'ex-planche-lean',
    name: 'Планка с наклоном вперед (Planche Lean)',
    category: 'Подготовка к горизонту',
    levelKey: 'advanced',
    level: 'Продвинутый',
    isStatic: true,
    targetValue: 30,
    targetUnit: 'сек',
    accentColor: '#00FF85',
    gradient: 'from-teal-950 via-[#14F195]/20 to-[#0A0A0C]',
    muscleTags: ['Передние дельты', 'Кор', 'Зубчатые мышцы', 'Предплечья'],
    overview: 'Базовое статическое упражнение для укрепления дистальных сухожилий бицепса и передних дельт перед изучением планша.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Старт',
        title: 'Упор лежа с протракцией лопаток',
        description: 'Ладони на полу развернуты наружу. Вытолкните верх спины вверх, подобрав таз под себя (Hollow Body).',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Hollow+Body+упор'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Накат',
        title: 'Максимальный накат вперед на носках',
        description: 'Сместите плечи на 10–15 см за проекцию запястий вперед. Сожмите квадрицепсы и ягодицы.',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Накат+плечами+вперед'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Удержание',
        title: 'Статическое давление в пол',
        description: 'Удерживайте пиковый угол наклона, непрерывно вдавливая ладони в поверхность пола.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Статическая+фиксация'
      }
    ],
    techniqueSteps: [
      'Примите упор лежа на прямых руках, кисти развернуты наружу.',
      'Максимально округлите лопатки (протракция), сожмите ягодицы.',
      'Накатитесь корпусом вперед на носках, сместив плечи за проекцию кистей.',
      'Удерживайте форму на протяжении заданного времени.'
    ],
    commonMistakes: [
      'Прогиб в пояснице.',
      'Расслабление лопаток.'
    ],
    breathingTip: 'Ровное глубокое дыхание без задержек.'
  },

  // ===================== ЙОГА (YOGA FLOW) =====================
  {
    id: 'ex-yoga-surya',
    name: 'Сурья Намаскар (Приветствие Солнцу)',
    category: 'Йога & Мобильность',
    levelKey: 'beginner',
    level: 'Все уровни',
    isStatic: false,
    targetValue: 6,
    targetUnit: 'кругов',
    accentColor: '#10B981',
    gradient: 'from-emerald-950 via-teal-500/20 to-[#0A0A0C]',
    muscleTags: ['Позвоночник', 'Задняя поверхность бедра', 'Плечевой пояс', 'Дыхание'],
    overview: 'Фундаментальная динамическая виньяса для пробуждения тела, раскрытия грудного отдела и синхронизации дыхания с движением.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Пранамасана',
        title: 'Молитвенная поза стоя (Тадасана)',
        description: 'Стопы вместе, ладони соединены у груди (Анджали Мудра). Вытяните макушку вверх, копчик направлен вниз, глубокий спокойный вдох.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/10B981?text=Фаза+1:+Тадасана'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Хаста Уттанасана',
        title: 'Прогиб с поднятыми руками',
        description: 'На глубоком вдохе поднимите руки вверх, вытягивая боковые поверхности корпуса, и сделайте мягкий прогиб назад без залома в пояснице.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Вытяжение+вверх'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Уттанасана',
        title: 'Глубокий наклон вперед к стопам',
        description: 'На длинном выдохе наклонитесь от тазобедренных суставов, расслабляя шею и направляя живот к бедрам. Ладони касаются коврика рядом со стопами.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+3:+Наклон+к+стопам'
      }
    ],
    techniqueSteps: [
      'Встаньте в начале коврика, выровняйте осанку и закройте глаза на 2 цикла дыхания.',
      'На вдохе потянитесь руками в небо, раскрывая ребра.',
      'На выдохе мягко сложитесь пополам с прямой спиной.',
      'Синхронизируйте каждое движение с естественным потоком воздуха через нос.'
    ],
    commonMistakes: [
      'Залом шеи назад при прогибе.',
      'Скругление спины горбом в наклоне вместо сгибания в тазобедренных суставах.'
    ],
    breathingTip: 'Дыхание Удджайи: мягкое ровное шипение в горле, вдох на раскрытии, выдох на наклоне.'
  },

  {
    id: 'ex-yoga-warrior',
    name: 'Поза Воина II (Вирабхадрасана II)',
    category: 'Йога & Баланс',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: true,
    targetValue: 45,
    targetUnit: 'сек',
    accentColor: '#00FF85',
    gradient: 'from-emerald-950 via-[#00FF85]/20 to-[#0A0A0C]',
    muscleTags: ['Квадрицепсы', 'Раскрытие таза', 'Дельты', 'Концентрация'],
    overview: 'Мощная силовая асана для укрепления ног, раскрытия тазобедренных суставов и воспитания несгибаемой внутренней стойкости.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Широкая стойка',
        title: 'Постановка ног и раскрытие таза',
        description: 'Расставьте стопы на расстояние около 120 см. Передняя стопа смотрит строго вперед, задняя развернута под углом 90° к ней.',
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+1:+Стойка+Воина'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Выпад 90°',
        title: 'Угол в переднем колене и натяжение рук',
        description: 'Согните переднее колено до прямого угла 90°, колено строго над пяткой. Разведите руки параллельно полу ладонями вниз.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Выпад+и+раскрытие'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Дришти',
        title: 'Фокус взгляда через пальцы передней руки',
        description: 'Опустите плечи от ушей, направьте взгляд вдаль поверх кончиков пальцев ведущей руки. Дышите глубоко и неподвижно.',
        image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Фокус+Дришти'
      }
    ],
    techniqueSteps: [
      'Сделайте глубокий выпад, не позволяя переднему колену заваливаться внутрь.',
      'Раскройте грудь и вытяните руки в противоположные стороны, растягивая ключицы.',
      'Внешний край задней стопы плотно прижимайте к коврику.',
      'Зафиксируйте позу на 45 секунд, затем повторите на другую сторону.'
    ],
    commonMistakes: [
      'Завал переднего колена внутрь, создающий опасную нагрузку на связки.',
      'Поднятие плеч к ушам от напряжения.'
    ],
    breathingTip: 'Глубокий вдох в область солнечного сплетения, устойчивый заземляющий выдох.'
  },

  {
    id: 'ex-yoga-downward-dog',
    name: 'Собака мордой вниз (Адхо Мукха Шванасана)',
    category: 'Йога & Растяжка',
    levelKey: 'beginner',
    level: 'Все уровни',
    isStatic: true,
    targetValue: 60,
    targetUnit: 'сек',
    accentColor: '#38BDF8',
    gradient: 'from-sky-950 via-sky-500/20 to-[#0A0A0C]',
    muscleTags: ['Икроножные', 'Бицепс бедра', 'Спина', 'Плечи'],
    overview: 'Главная компенсирующая асана: удлиняет позвоночный столб, снимает компрессию с поясницы и растягивает всю заднюю линию тела.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Упор на четвереньках',
        title: 'Расстановка ладоней и подворот носков',
        description: 'Пальцы рук широко расправлены, средний палец смотрит вперед. Ладони плотно впечатаны в коврик, носки упираются в пол.',
        image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+1:+База+ладоней'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Выталкивание таза',
        title: 'Подъем седалищных костей вверх и назад',
        description: 'Оторвите колени от пола, направляя седалищные бугры в потолок. Образуйте четкую треугольную горку корпусом и ногами.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Выталкивание+таза'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Прямая спина',
        title: 'Удлинение позвоночника и опускание пяток',
        description: 'Провалите грудной отдел по направлению к бедрам, шея абсолютно расслаблена. Пятки мягко тянутся к коврику.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/10B981?text=Фаза+3:+Удлинение+спины'
      }
    ],
    techniqueSteps: [
      'Отталкивайтесь от ладоней, словно пытаетесь отодвинуть коврик от себя.',
      'Если задняя поверхность бедер жесткая, согните колени, сохранив прямую линию от запястий до копчика.',
      'Голову не запрокидывайте — взгляд между стоп или на пупок.'
    ],
    commonMistakes: [
      'Перенос веса на руки и скругление поясницы.',
      'Зажим шеи плечами.'
    ],
    breathingTip: 'Длинный плавный выдох через нос с расслаблением диафрагмы.'
  },

  // ===================== БОКС (BOXING STRIKES & FOOTWORK) =====================
  {
    id: 'ex-box-jab',
    name: 'Боксерская стойка и Джеб (Левый прямой удар)',
    category: 'Бокс & Ударная техника',
    levelKey: 'beginner',
    level: 'Все уровни',
    isStatic: false,
    targetValue: 30,
    targetUnit: 'ударов',
    accentColor: '#FF5E00',
    gradient: 'from-orange-950 via-[#FF5E00]/20 to-[#0A0A0C]',
    muscleTags: ['Передняя дельта', 'Трицепс', 'Икры', 'Координация'],
    overview: 'Самый частый и быстрый удар в боксе. Служит для контроля дистанции, сбива атак оппонента и раскрытия для нокаутирующего удара.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Боевая стойка',
        title: 'Классическая боксерская стойка',
        description: 'Левое плечо и нога впереди, локти прижаты к ребрам, подбородок прижат к груди, правая перчатка страхует челюсть.',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+1:+Боевая+стойка'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Выброс руки',
        title: 'Взрывной импульс и вкручивание кулака',
        description: 'Левая рука молниеносно выбрасывается по прямой траектории. В конечной трети кулак доворачивается горизонтально костяшками пальцев.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+2:+Выброс+джеба'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Плечо у подбородка',
        title: 'Пиковая точка удара и возврат по той же траектории',
        description: 'Левое плечо закрывает челюсть от встречного удара, вес на обеих ногах. Мгновенный отдерг руки обратно в глухую защиту.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+3:+Защита+и+возврат'
      }
    ],
    techniqueSteps: [
      'Начните удар с легкого шага или толчка передней ноги.',
      'Выпрямляйте руку строго по прямой линии без замаха локтя в сторону.',
      'В момент касания сожмите кулак максимально плотно.',
      'Сразу верните руку к подбородку — рука не должна "падать" вниз.'
    ],
    commonMistakes: [
      'Опускание правой защитной руки при ударе левой.',
      'Замах локтем наружу (сигнал сопернику о начале удара).'
    ],
    breathingTip: 'Резкий короткий выдох через сжатые зубы ("Тсс!") строго в момент удара.'
  },

  {
    id: 'ex-box-cross',
    name: 'Кросс (Правый прямой с доворотом бедра)',
    category: 'Бокс & Сила удара',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 25,
    targetUnit: 'ударов',
    accentColor: '#EF4444',
    gradient: 'from-red-950 via-red-500/20 to-[#0A0A0C]',
    muscleTags: ['Широчайшие', 'Косые мышцы пресса', 'Ягодицы', 'Плечо'],
    overview: 'Самый мощный прямой силовой удар в арсенале боксера. Сила генерируется толчком задней ноги и мощным разворотом таза.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Заряд ноги',
        title: 'Толчок носком задней ноги',
        description: 'Правая пятка отрывается от пола, импульс движения передается от икроножной мышцы в колено и тазобедренный сустав.',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/EF4444?text=Фаза+1:+Толчок+ноги'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Доворот корпуса',
        title: 'Скручивание таза и вынос правого плеча',
        description: 'Корпус разворачивается на 45–60°, правое плечо выносится вперед, левая перчатка плотно закрывает челюсть и печень.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+2:+Разворот+таза'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Сокрушительный контакт',
        title: 'Полное вкручивание кулака в цель',
        description: 'Кулак горизонтален, плечо надежно защищает правую часть подбородка. Центр тяжести остается по центру, баланс не потерян.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+3:+Фокус+удара'
      }
    ],
    techniqueSteps: [
      'Вкручивайте стопу правой ноги в пол, словно тушите окурок.',
      'Передайте вращательный момент через косые мышцы в плечевой пояс.',
      'Рука летит по кратчайшей траектории от скулы до цели.',
      'Быстрый возврат в боевую стойку без заваливания вперед.'
    ],
    commonMistakes: [
      'Провал центром тяжести вперед за переднее колено.',
      'Опускание левой руки от лица во время нанесения удара.'
    ],
    breathingTip: 'Громкий акцентированный выдох в кульминации вращения.'
  },

  {
    id: 'ex-box-slip-roll',
    name: 'Боксерский маятник и уклоны (Slip & Weave)',
    category: 'Бокс & Защита',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 40,
    targetUnit: 'уклонов',
    accentColor: '#38BDF8',
    gradient: 'from-sky-950 via-sky-500/20 to-[#0A0A0C]',
    muscleTags: ['Мышцы кора', 'Квадрицепсы', 'Косые мышцы', 'Реакция'],
    overview: 'Основа элитной боксерской защиты. Уклон от прямых ударов со смещением головы с линии атаки и подготовка контратаки.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Стойка',
        title: 'Исходная центральная позиция',
        description: 'Колени мягко пружинят, корпус немного скруглен, глаза неотрывно следят за уровнем глаз и плеч спарринг-партнера.',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+1:+Баланс'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Слив влево',
        title: 'Смещение головы с линии удара влево',
        description: 'Мягкий наклон в талии со сгибанием левого колена. Голова смещается всего на 10–15 см — ровно столько, чтобы пропустить удар.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Уклон+влево'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Нырок под рукой',
        title: 'Маятниковый полукруг под боковым ударом',
        description: 'Присядьте на ногах и опишите головой букву "U", выходя на другую сторону с заряженным для контратаки хуком.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Нырок'
      }
    ],
    techniqueSteps: [
      'Уклоняйтесь за счет сгибания коленей и скручивания пресса, а не за счет наклона спины.',
      'Руки всегда защищают подбородок и височную зону.',
      'Не опускайте глаза в пол — всегда смотрите на соперника.'
    ],
    commonMistakes: [
      'Сгибание в пояснице с опусканием головы вниз (потеря контроля пространства).',
      'Слишком широкое амплитудное движение, замедляющее контратаку.'
    ],
    breathingTip: 'Короткие ритмичные вдохи и выдохи на каждом покачивании.'
  },

  // ===================== КАРАТЕ (KARATE-DO KIHON & KICKS) =====================
  {
    id: 'ex-karate-oi-zuki',
    name: 'Стойка Дзенкуцу-дачи и удар Ой-Дзуки (Oi Zuki)',
    category: 'Карате & Кихон',
    levelKey: 'beginner',
    level: 'Все уровни',
    isStatic: false,
    targetValue: 24,
    targetUnit: 'ударов',
    accentColor: '#DC2626',
    gradient: 'from-red-950 via-rose-500/20 to-[#0A0A0C]',
    muscleTags: ['Квадрицепсы', 'Широчайшие спины', 'Киме (концентрация)', 'Кор'],
    overview: 'Фундаментальный прямой удар рукой с шагом в глубокую стойку. Основа традиционного карате-до школы Сетокан.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Камаэ & Хикитэ',
        title: 'Позиция замаха и исходная стойка',
        description: 'Бьющая рука отведена к плавающим ребрам ладонью вверх (Хикитэ), противоположная рука вытянута вперед для контроля противника.',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/DC2626?text=Фаза+1:+Хикитэ'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Шаг Дзенкуцу',
        title: 'Скользящий шаг вперед с понижением центра тяжести',
        description: 'Нога плавно скользит по полу полукругом. 60% веса переходит на согнутую переднюю ногу, колено над пальцами ног, задняя нога прямая.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+2:+Шаг+вперед'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Киме & Киаи',
        title: 'Момент максимальной концентрации силы',
        description: 'Кулак с вращением на 180° вонзается в цель (Сейкен). Одновременная фиксация всех мышц тела на долю секунды с выкриком Киаи!',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+3:+Киме'
      }
    ],
    techniqueSteps: [
      'Перемещайтесь без подпрыгиваний, удерживая уровень таза строго на одной высоте.',
      'Синхронизируйте приземление стопы с финальным вращением кулака.',
      'Вторая рука резко отдергивается назад к поясу, создавая реактивный момент пары сил.'
    ],
    commonMistakes: [
      'Отрыв пятки задней ноги от татами.',
      'Поднятие плеча в момент удара.'
    ],
    breathingTip: 'Выдох Киаи ("Эй-я!") в момент контакта для максимальной жесткости каркаса тела.'
  },

  {
    id: 'ex-karate-mae-geri',
    name: 'Взрывной удар ногой вперед (Маэ-Гери / Mae Geri)',
    category: 'Карате & Удары ногами',
    levelKey: 'intermediate',
    level: 'Средний',
    isStatic: false,
    targetValue: 20,
    targetUnit: 'ударов',
    accentColor: '#EA580C',
    gradient: 'from-orange-950 via-amber-500/20 to-[#0A0A0C]',
    muscleTags: ['Сгибатели бедра', 'Пресс', 'Икроножные', 'Баланс'],
    overview: 'Базовый сокрушительный удар подушечками пальцев стопы (Коси) в корпус или солнечное сплетение противника.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Вынос колена',
        title: 'Высокий подъем колена (Каэ-Агэ)',
        description: 'Колено бьющей ноги резко поднимается к груди. Стопа натянута, пальцы загнуты на себя для обнажения подушечки стопы (Коси).',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/EA580C?text=Фаза+1:+Подъем+колена'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Хлест вперед',
        title: 'Взрывное выпрямление голени с посылом таза',
        description: 'Таз подается вперед, нога выстреливает как хлыст по прямой линии в цель. Опорная нога слегка присогнута для устойчивости.',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Хлест+вперед'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Хики-Аси',
        title: 'Мгновенный возврат голени назад',
        description: 'После удара нога мгновенно сгибается обратно в колене, чтобы противник не успел захватить ее, и возвращается в стойку.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/38BDF8?text=Фаза+3:+Возврат+ноги'
      }
    ],
    techniqueSteps: [
      'Удар наносится подушечкой стопы, пальцы ног обязательно задраны наверх!',
      'Не отклоняйте корпус назад — удерживайте вертикальную ось баланса.',
      'Быстрый отдерг ноги (Хики-аси) не менее важен, чем сам выброс.'
    ],
    commonMistakes: [
      'Удар расслабленными пальцами ноги, что грозит переломом пальцев.',
      'Падение вперед после нанесения удара без контроля возврата.'
    ],
    breathingTip: 'Короткий резкий выдох при хлестком распрямлении ноги.'
  },

  {
    id: 'ex-karate-mawashi',
    name: 'Круговой удар ногой с доворотом таза (Маваши-Гери)',
    category: 'Карате & Техника ног',
    levelKey: 'advanced',
    level: 'Продвинутый',
    isStatic: false,
    targetValue: 20,
    targetUnit: 'ударов',
    accentColor: '#F59E0B',
    gradient: 'from-amber-950 via-yellow-500/20 to-[#0A0A0C]',
    muscleTags: ['Ягодичные', 'Косые мышцы', 'Раскрытие таза', 'Икры'],
    overview: 'Зрелищный и мощный круговой удар подъемом стопы или голенью по дуговой траектории в корпус или голову противника.',
    phases: [
      {
        phaseNumber: 1,
        badge: 'Фаза 1: Боковой вынос',
        title: 'Вынос согнутого колена в горизонтальную плоскость',
        description: 'Бьющая нога поднимается сбоку, бедро параллельно полу. Опорная нога начинает разворачиваться пяткой к цели на 180°.',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/F59E0B?text=Фаза+1:+Боковой+вынос'
      },
      {
        phaseNumber: 2,
        badge: 'Фаза 2: Хлест по дуге',
        title: 'Вращение таза и разгибание голени по кругу',
        description: 'Таз максимально вкручивается вперед, голень хлестко распрямляется по дуге. Удар наносится подъемом стопы (Хайсоку).',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/00FF85?text=Фаза+2:+Круговой+хлест'
      },
      {
        phaseNumber: 3,
        badge: 'Фаза 3: Контроль приземления',
        title: 'Фиксация и контролируемый возврат в Камаэ',
        description: 'Возврат пятки к ягодице и аккуратная постановка ноги на пол без потери равновесия, руки перед собой в защите.',
        image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
        fallbackPlaceholder: 'https://placehold.co/800x450/121217/FF5E00?text=Фаза+3:+Возврат+в+стойку'
      }
    ],
    techniqueSteps: [
      'Разворачивайте опорную стопу минимум на 135–180 градусов для свободного раскрытия таза.',
      'Ударная траектория должна быть горизонтальной или слегка нисходящей.',
      'Руки удерживайте у лица, не размахивайте ими для равновесия.'
    ],
    commonMistakes: [
      'Удар с неразвернутой опорной стопой (ведет к травме колена опорной ноги).',
      'Заваливание плеч назад от цели.'
    ],
    breathingTip: 'Выдох на взрывном раскрытии голени в наивысшей точке дуги.'
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
      (query.includes('отжимания') && ex.id === 'ex-pushups-classic') ||
      (query.includes('приседан') && ex.id === 'ex-squats') ||
      (query.includes('брусь') && ex.id === 'ex-dips') ||
      (query.includes('подтягиван') && ex.id === 'ex-pullups') ||
      (query.includes('выход') && ex.id === 'ex-muscleup') ||
      (query.includes('muscle') && ex.id === 'ex-muscleup') ||
      (query.includes('скалолаз') && ex.id === 'ex-mountain-climbers') ||
      (query.includes('сурья') && ex.id === 'ex-yoga-surya') ||
      (query.includes('воин') && ex.id === 'ex-yoga-warrior') ||
      (query.includes('собака') && ex.id === 'ex-yoga-downward-dog') ||
      (query.includes('йога') && ex.id === 'ex-yoga-surya') ||
      (query.includes('джеб') && ex.id === 'ex-box-jab') ||
      (query.includes('бокс') && ex.id === 'ex-box-jab') ||
      (query.includes('кросс') && ex.id === 'ex-box-cross') ||
      (query.includes('маятник') && ex.id === 'ex-box-slip-roll') ||
      (query.includes('дзуки') && ex.id === 'ex-karate-oi-zuki') ||
      (query.includes('маэ') && ex.id === 'ex-karate-mae-geri') ||
      (query.includes('маваши') && ex.id === 'ex-karate-mawashi') ||
      (query.includes('карате') && ex.id === 'ex-karate-oi-zuki')
  );
  return match || mockExercisesDatabase[0];
};
