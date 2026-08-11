'use client';

import { useState } from 'react';
import styles from './TravelMaP.module.scss';
import { Button } from '../../ui/Button/Button';

interface MapLocationItem {
  name: string;
  icon: string;
  target: string;
  bgModifier?: string;
}

interface TravelMapProps {
  /** Предохранитель сюжета: если true, значок карты полностью скрывается */
  disabled: boolean;
  /** Функция-обработчик перемещения шиноби */
  onTravel: (target: string) => void;
  /** Список локаций для отрисовки */
  locations: MapLocationItem[];
}

/**
 * Автономный компонент интерактивной карты Конохи.
 * Управляет своим состоянием, рендерит парящий значок и сетку зданий.
 */
export const TravelMap = ({ disabled, onTravel, locations }: TravelMapProps) => {
  const { 
    mapOverlay, mapWrapper, mapTitle, mapBuildingsGrid, 
    buildingCard, buildingImageDummy, buildingName, mapIconButtonWrapper 
  } = styles;

  // Храню стейт открытия
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  // Прячу карту в диалогах
  if (disabled) return null;

  return (
    <>
      {/* 🗺️ ФАЗА 1: Карта развернута — показываем сетку зданий */}
      {isMapExpanded && (
        <div className={mapOverlay}>
          <div className={mapWrapper}>
            <span className={mapTitle}>🗺️ Карта Деревни Скрытой в Листве</span>
            
            <div className={mapBuildingsGrid}>
              {locations.map((loc, index) => {
                const bgClass = loc.bgModifier ? `${buildingImageDummy} ${styles[loc.bgModifier]}` : buildingImageDummy;

                return (
                  <div 
                    key={index} 
                    className={buildingCard} 
                    onClick={() => {
                      onTravel(loc.target);
                      setIsMapExpanded(false); // Сворачиваю после клика
                    }}
                  >
                    <div className={bgClass}>{loc.icon}</div>
                    <span className={buildingName}>{loc.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 💡 ФАЗА 2: Парящий круглый значок карты */}
      <div className={mapIconButtonWrapper}>
        <Button variant="primary" onClick={() => setIsMapExpanded(!isMapExpanded)}>
          {isMapExpanded ? '❌' : '🗺️'}
        </Button>
      </div>
    </>
  );
};
