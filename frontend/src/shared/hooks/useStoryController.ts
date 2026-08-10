import { useState } from 'react';

export const useGameController = () => {
  // --- 1. ВСЕ НАШИ ИГРОВЫЕ СТЭЙТЫ (СОСТОЯНИЯ) ---
  const [currentLocKey, setCurrentLocKey] = useState<'gates' | 'armory' | 'hokage'>('gates');
  const [playerBalance, setPlayerBalance] = useState(150);
  const [hasKunai, setHasKunai] = useState(false);
  const [hasMission, setHasMission] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(true);
  
  // 💡 ИСПРАВЛЕНО: Добавили стейт карты внутрь хука, чтобы он жил здесь
  const [isMapOpen, setIsMapOpen] = useState(false);

  // --- 2. КАТЕГОРИЯ: НАВИГАЦИЯ (Перемещение) ---
  const handleNavigation = (target: 'gates' | 'armory' | 'hokage') => {
    setCurrentLocKey(target);
    setIsEventOpen(true); 
    setIsMapOpen(false); // Автоматически закрываем карту, когда прибыли на место
  };

  // --- 3. КАТЕГОРИЯ: МАГАЗИН (Экономика) ---
  const handleShopPurchase = (itemId: 'buy_kunai') => {
    if (itemId === 'buy_kunai') {
      if (playerBalance >= 50 && !hasKunai) {
        setPlayerBalance((prev) => prev - 50);
        setHasKunai(true);
        alert('Кунай добавлен в снаряжение!');
      } else {
        alert('Ошибка покупки: проверьте баланс или сумку.');
      }
    }
  };

  // --- 4. КАТЕГОРИЯ: СЮЖЕТ И КВЕСТЫ ---
  const handleStoryProgress = (actionId: string) => {
    if (actionId === 'take_mission') {
      setHasMission(true);
      alert('Контракт миссии ранга S подписан!');
    }
  };

  // --- 5. ЦЕНТРАЛЬНЫЙ ДИСПЕТЧЕР ---
  const handleActionClick = (target: string) => {
    // Если игрок кликает на "Осмотреться", мы просто закрываем окно диалога
    if (target === 'look_around' || target === 'close_event') {
      setIsEventOpen(false);
      return;
    }
    
    if (target === 'close_event') {
      setIsEventOpen(false);
      return;
    }

    if (target === 'gates' || target === 'armory' || target === 'hokage') {
      handleNavigation(target);
    } else if (target.startsWith('buy_')) {
      handleShopPurchase(target as 'buy_kunai');
    } else {
      handleStoryProgress(target);
    }
  };

  // 💡 ИСПРАВЛЕНО: Теперь хук честно отдает наружу ВСЕ переменные, нужные для page.tsx
  return {
    currentLocKey,
    playerBalance,
    hasKunai,
    hasMission,
    isEventOpen,
    isMapOpen,        // <- ДОБАВИЛИ
    setIsMapOpen,     // <- ДОБАВИЛИ
    handleActionClick,
  };
};
