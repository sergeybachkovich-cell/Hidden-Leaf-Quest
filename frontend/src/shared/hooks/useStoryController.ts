import { useState } from 'react';
import { INITIAL_INVENTORY_DATA } from '@/shared/data/items';

export interface QuestStep {
  id: number;
  location: 'gates' | 'armory' | 'hokage';
  title: string;
  text: string;
  buttonText: string;
}

const STORY_QUESTS: QuestStep[] = [
  {
    id: 0,
    location: 'gates',
    title: 'Прибытие в Коноху',
    text: 'Перед вами Главные ворота. Юная Тен-Тен проверяет свитки: "Привет! Из-за аномалии Свитка Времени все кланы объединились до начала войны. Саске еще в деревне, Учихи и Сенджу живы! Но Седьмой Хокаге ждет тебя в Резиденции. Поторопись!"',
    buttonText: 'Отправиться в Резиденцию'
  },
  {
    id: 1,
    location: 'hokage',
    title: 'Аудиенция у Седьмого',
    text: 'Наруто Узумаки улыбается из-за горы бумаг: "А, новый шиноби! Нам нужно удержать этот хрупкий мир. Вот тебе стартовые 150 Рё. Сходи в лавку к Тен-Тен, купи базовый кунай для тренировок с Саске и Итачи!"',
    buttonText: 'Взять Рё и пойти в лавку'
  },
  {
    id: 2,
    location: 'armory',
    title: 'Первое снаряжение',
    text: 'Тен-Тен за прилавком: "С возвращением! Базовый кунай высшего качества обойдется ровно в 50 Рё. Теперь ты официально готов к тренировкам в этой новой эпохе!"',
    buttonText: 'Купить Кунай и завершить квест'
  }
];

export const useGameController = () => {
  const [currentLocKey, setCurrentLocKey] = useState<'gates' | 'armory' | 'hokage'>('gates');
  const [playerBalance, setPlayerBalance] = useState(0);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [inventoryRecords, setInventoryRecords] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('Игрок');

  const currentQuest = STORY_QUESTS[currentQuestIndex] || null;
  const isQuestHere = currentQuest && currentQuest.location === currentLocKey;

  const handleNavigation = (target: 'gates' | 'armory' | 'hokage') => {
    setCurrentLocKey(target);
  };

  const addOrStackItem = (itemId: string) => {
    setInventoryRecords(prev => {
      const existing = prev.find(r => r && r.itemId === itemId);
      if (existing) {
        return prev.map(r => r && r.itemId === itemId ? { ...r, count: r.count + 1 } : r);
      }
      let freeSlot = 0;
      for (let i = 0; i < 12; i++) {
        if (!prev.some(r => r && r.slotIndex === i)) {
          freeSlot = i;
          break;
        }
      }
      return [...prev, { itemId, slotIndex: freeSlot, count: 1 }];
    });
  };

  const handleActionClick = (target: string) => {
    if (target === 'buy_kunai_repeat') {
      if (playerBalance >= 50) {
        setPlayerBalance(prev => prev - 50);
        addOrStackItem('kunai');
      } else {
        alert('Недостаточно Рё для покупки куная!');
      }
      return;
    }

    if (target === 'close_event') {
      if (currentQuestIndex === 0) {
        setCurrentQuestIndex(1);
        handleNavigation('hokage');
      } else if (currentQuestIndex === 1) {
        setPlayerBalance(150);
        setCurrentQuestIndex(2);
        handleNavigation('armory');
      } else if (currentQuestIndex === 2) {
        if (playerBalance >= 50) {
          setPlayerBalance(prev => prev - 50);
          addOrStackItem('kunai');
          setCurrentQuestIndex(3);
        }
      }
      return;
    }

    if (target === 'gates' || target === 'armory' || target === 'hokage') {
      handleNavigation(target);
    }
  };

  return {
    currentLocKey,
    playerBalance,
    isInventoryOpen,
    setIsInventoryOpen,
    inventoryRecords,
    setInventoryRecords,
    handleActionClick,
    currentQuest,
    isQuestHere,
    playerName,
    setPlayerName
  };
};