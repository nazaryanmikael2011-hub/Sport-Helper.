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
      (query.includes('скалолаз') && ex.id === 'ex-mountain-climbers')
  );
  return match || mockExercisesDatabase[0];
};
