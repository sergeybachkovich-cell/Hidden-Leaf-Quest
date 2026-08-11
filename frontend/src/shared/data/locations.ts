export interface LocationSceneText {
  title: string;
  description: string;
  bgImage?: string;
  characterImage?: string;
}

export const LOCATIONS_DATA: Record<string, LocationSceneText> = {
  gates: {
    title: 'Главные ворота Конохи',
    description: 'Перед вами раскинулась Деревня, Скрытая в Листве. Из-за аномалии Свитка Времени здесь кипит невероятная жизнь.',
    bgImage: '/images/bg/gates.webp',
    characterImage: undefined
  },
  armory: {
    title: 'Оружейная лавка Тен-Тен',
    description: 'Стены лавки увешаны свитками призыва, кунаями и редкими катанами. Хозяйка дружелюбно улыбается вам.',
    bgImage: '/images/bg/armory.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  hokage: {
    title: 'Резиденция Хокаге',
    description: 'В просторном круглом кабинете Седьмой Хокаге и Минато изучают карты аномалий чакры в деревне.',
    bgImage: '/images/bg/hokage.webp',
    characterImage: '/images/sprites/naruto_hokage.png'
  },
  academy: {
    title: 'Академия Ниндзя',
    description: 'Святая святых, где юное поколение Конохи изучает базовые ниндзюцу и готовится сдать экзамен на Генина.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  senju_mansion: {
    title: 'Дом 1-го Хокаге',
    description: 'Традиционное поместье Сенджу. На татами Мито Узумаки (80 лет) дает мудрые советы Хашираме и Наваки.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  uchiha_district: {
    title: 'Квартал клана Учиха',
    description: 'Величественные улочки с гербами-веерами. На полигоне Итачи, Саске, Шисуи и Изуми устроили совместную тренировку.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  minato_house: {
    title: 'Дом Минато и Кушины',
    description: 'Светлый, уютный дом молодой семьи Узумаки, куда часто залетают погреться тринадцатилетние Обито и Рин.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  naruto_apartment: {
    title: 'Дом Узумаки Наруто',
    description: 'Холостяцкая квартирка Наруто (15 лет), заваленная коробками из-под рамена, куда он сбегает от контроля родителей.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  },
  kakashi_house: {
    title: 'Дом Какаши Хатаке',
    description: 'Аскетичное жилище Хатаке. Сакумо Белый Клык чистит свой клинок, пока молодой Какаши и Ямато пьют чай.',
    bgImage: '/images/bg/gates.webp',
    characterImage: '/images/sprites/tenten.webp'
  }
};