'use client';

import styles from './TravelMaP.module.scss'

interface TravelMapProps {
  /** Флаг состояния: открыта сейчас карта или скрыта */
  isOpen: boolean;
  /** Функция-обработчик для перемещения шиноби в выбранное здание */
  onTravel: (target: 'gates' | 'armory' | 'hokage') => void;
}

/**
 * Игровой компонент интерактивной карты Конохи.
 * Отображает графические кликабельные зоны зданий и управляется флагом isOpen.
 */
export const TravelMap = ({ isOpen, onTravel }: TravelMapProps) => {
  const { mapOverlay, mapWrapper, mapTitle, mapBuildingsGrid, buildingCard, buildingImageDummy, buildingName } = styles;

  // Если заглушка флага равна false — полностью скрываем карту из разметки
  if (!isOpen) return null;

  return (
    <div className={mapOverlay}>
      <div className={mapWrapper}>
        <span className={mapTitle}>🗺️ Карта Деревни Скрытой в Листве</span>
        
        <div className={mapBuildingsGrid}>
          {/* Здание 1: Главные ворота */}
          <div className={buildingCard} onClick={() => onTravel('gates')}>
            <div className={`${buildingImageDummy} ${styles.gatesBg}`}>🚪</div>
            <span className={buildingName}>Главные ворота</span>
          </div>

          {/* Здание 2: Оружейная */}
          <div className={buildingCard} onClick={() => onTravel('armory')}>
            <div className={`${buildingImageDummy} ${styles.armoryBg}`}>⚔️</div>
            <span className={buildingName}>Лавка Тен-Тен</span>
          </div>

          {/* Здание 3: Резиденция */}
          <div className={buildingCard} onClick={() => onTravel('hokage')}>
            <div className={`${buildingImageDummy} ${styles.hokageBg}`}>🏢</div>
            <span className={buildingName}>Офис Хокаге</span>
          </div>
        </div>
      </div>
    </div>
  );
};