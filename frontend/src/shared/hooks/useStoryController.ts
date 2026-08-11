import { useState } from 'react';
import STORY_QUESTS from '@/shared/data/quests.json';

export interface QuestStep {
  id: number;
  location: string;
  title: string;
  text: string;
  buttonText: string;
  requiredJutsu?: string;
}

export const useGameController = () => {
  const [currentLocKey, setCurrentLocKey] = useState<string>('gates');
  const [playerBalance, setPlayerBalance] = useState(0);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [inventoryRecords, setInventoryRecords] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('Игрок');
  const [unlockedJutsu, setUnlockedJutsu] = useState<string[]>([]);
  const [playerRank, setPlayerRank] = useState<string>('Академик');

  const currentQuest = STORY_QUESTS[currentQuestIndex] || null;
  const isQuestHere = !!(currentQuest && currentQuest.location === currentLocKey);

  const handleNavigation = (target: string) => {
    setCurrentLocKey(target);
  };

  const addOrStackItem = (itemId: string) => {
    setInventoryRecords(prev => {
      const existing = prev.find(r => !!(r && r.itemId === itemId));
      if (existing) {
        return prev.map(r => !!(r && r.itemId === itemId) ? { ...r, count: r.count + 1 } : r);
      }
      let freeSlot = 0;
      for (let i = 0; i < 12; i++) {
        if (!prev.some(r => !!(r && r.slotIndex === i))) {
          freeSlot = i;
          break;
        }
      }
      return [...prev, { itemId, slotIndex: freeSlot, count: 1 }];
    });
  };

  const handleCastJutsu = (jutsuId: string) => {
    if (currentQuestIndex === 4 && jutsuId === 'kawarimi') {
      alert('🎯 Идеально! Вы использовали Замещение! Манекен Тен-Тен ударил по куску дерева, а вы зашли ему за спину.');
      setCurrentQuestIndex(5);
      setUnlockedJutsu(['kawarimi', 'bunshin']);
      setPlayerRank('Генин (Лвл 1)');
    } else {
      alert('Вы сконцентрировали чакру, но сейчас эта техника бесполезна.');
    }
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
      if (currentQuestIndex === 4) {
        alert('Сначала защититесь от атаки манекена, использовав Каварими но Дзюцу из панели ⚡!');
        return;
      }
      
      if (currentQuestIndex === 0) {
        if (!playerName.trim() || playerName === 'Игрок' || playerName === '') {
          alert('Пожалуйста, впишите свое имя в свиток регистрации шиноби!');
          return;
        }
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
          handleNavigation('academy');
        }
      } else if (currentQuestIndex === 3) {
        setUnlockedJutsu(['kawarimi']);
        setCurrentQuestIndex(4);
      } else if (currentQuestIndex === 5) {
        setCurrentQuestIndex(6);
        handleNavigation('uchiha_district');
      } else if (currentQuestIndex === 6) {
        setCurrentQuestIndex(7);
        handleNavigation('minato_house');
      } else if (currentQuestIndex === 7) {
        setCurrentQuestIndex(8);
        handleNavigation('kakashi_house');
      } else if (currentQuestIndex === 8) {
        setCurrentQuestIndex(9);
        handleNavigation('naruto_apartment');
      } else if (currentQuestIndex === 9) {
        setCurrentQuestIndex(10);
        handleNavigation('gates');
      } else if (currentQuestIndex === 10) {
        setCurrentQuestIndex(11);
        handleNavigation('gates');
        alert('Поздравляем! День Рождения успешно отпразднован, пролог игры завершен!');
      }
      return;
    }

    const allowed = ['gates', 'armory', 'hokage', 'academy', 'senju_mansion', 'uchiha_district', 'minato_house', 'naruto_apartment', 'kakashi_house'];
    if (allowed.includes(target)) {
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
    setPlayerName,
    unlockedJutsu,
    handleCastJutsu,
    playerRank
  };
};
