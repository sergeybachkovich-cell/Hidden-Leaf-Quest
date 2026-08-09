'use client';

import { LOCATIONS_DATA } from '@/shared/data/locations';
import { useGameController } from '@/shared/hooks/useStoryController';
import { EventWindow } from '@/components/game/EventWindow/EventWindow';
import { LocationViewport } from '@/components/game/LocationViewport/LocationViewport';

export default function Home() {
  // 💡 ИДЕАЛЬНОЕ СОВПАДЕНИЕ: Все переменные успешно достаются из хука без паники TypeScript!
  const { 
    currentLocKey, 
    playerBalance, 
    isMapOpen, 
    isEventOpen, 
    setIsMapOpen, 
    handleActionClick 
  } = useGameController();

  const sceneText = LOCATIONS_DATA[currentLocKey];

  return (
    <main>
      {/* Графика получает картинки из базы */}
      <LocationViewport scrBg={sceneText.bgImage} scrPers={sceneText.characterImage} />
      
      {/* 5. Окно событий */}
      {isEventOpen && (
        <EventWindow 
          title={sceneText.title}
          description={sceneText.description}
          onActionClick={handleActionClick}
          primaryAction={{ 
            text: sceneText.mainButtonText, 
            target: sceneText.mainButtonCommand 
          }}
      
          action2={sceneText.extraButtonText && sceneText.extraButtonCommand ? { 
            text: sceneText.extraButtonText, 
            target: sceneText.extraButtonCommand 
          } : undefined}

          action3={undefined}
          action4={undefined}
          actionPrev={undefined}
          actionNext={undefined}
        />
      )}
    </main>
  );
}
