export interface LocationSceneText {
  title: string;
  description: string;
  bgImage?: string;
  characterImage?: string;
  mainButtonText: string;
  mainButtonCommand: string;
  extraButtonText?: string;
  extraButtonCommand?: string;
}

// Гарантирую наличие всех трех локаций
export const LOCATIONS_DATA: Record<'gates' | 'armory' | 'hokage', LocationSceneText> = {
  gates: {
    title: 'Главные ворота Конохи',
    description: 'Перед вами раскинулась Деревня, Скрытая в Листве. Солнце освещает Лики Хокаге, высеченные на скале. Чунины на посту внимательно осматривают каждого входящего.',
    bgImage: '/images/bg/gates.webp',
    characterImage: undefined,
    mainButtonText: '🕵️‍♂️ Осмотреться у ворот',
    mainButtonCommand: 'look_around',
    extraButtonText: '⚔️ Заглянуть в оружейную',
    extraButtonCommand: 'armory'
  },
  armory: {
    title: 'Оружейная лавка Тен-Тен',
    description: 'Стены лавки увешаны свитками призыва, кунаями и редкими катанами. Хозяйка дружелюбно улыбается вам из-за прилавка, готовая предложить лучшее снаряжение для миссий.',
    bgImage: '/images/bg/armory.webp',
    characterImage: '/images/sprites/tenten.webp',
    mainButtonText: '🛒 Купить кунай (50 Рё)',
    mainButtonCommand: 'buy_kunai',
    extraButtonText: '🚪 Вернуться к воротам',
    extraButtonCommand: 'gates'
  },
  // Добавил локацию Хокаге
  hokage: {
    title: 'Резиденция Хокаге',
    description: 'В кабинете пахнет старыми свитками и табачным дымом. Седьмой Хокаге внимательно изучает карту текущих угроз. Здесь вы можете взять контракт на миссию ранга S.',
    bgImage: '/images/bg/hokage.webp',
    characterImage: '/images/sprites/naruto_hokage.png',
    mainButtonText: '📜 Взять миссию (Ранг S)',
    mainButtonCommand: 'take_mission',
    extraButtonText: '🚪 Вернуться к воротам',
    extraButtonCommand: 'gates'
  }
};

