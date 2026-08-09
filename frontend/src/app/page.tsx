'use client';
import styles from './page.module.scss';
import { PlayerStatusBar } from '@/components/game/PlayerStatusBar/PlayerStatusBar';
import { LocationViewport } from '@/components/game/LocationViewport/LocationViewport';
import { ActionDock } from '@/components/game/ActionDock/ActionDock';

export default function Home() {
  const { gameLayout } = styles;
  
  return (
    <main className={gameLayout}>
      {/* 1. Панель статуса шиноби */}
      <PlayerStatusBar />

      {/* 2. Главное окно локации */}
      <LocationViewport />

      {/* 3. Нижняя панель */}
      <ActionDock />

      
    </main>
  );
};