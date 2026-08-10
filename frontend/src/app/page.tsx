"use client";
import { LOCATIONS_DATA } from "@/shared/data/locations";
import { useGameController } from "@/shared/hooks/useStoryController";
import { EventWindow } from "@/components/game/EventWindow/EventWindow";
import { LocationViewport } from "@/components/game/LocationViewport/LocationViewport";
import { PlayerStatusBar } from "@/components/game/PlayerStatusBar/PlayerStatusBar";
import { Inventory } from "@/components/game/Inventory/Inventory";
import { TravelMap } from "@/components/game/TravelMap/TravelMap";

export default function Home() {
  const { currentLocKey, playerBalance, isEventOpen, isInventoryOpen, setIsInventoryOpen, inventoryRecords, handleActionClick } = useGameController();
  const sceneText = LOCATIONS_DATA[currentLocKey];

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>
      <LocationViewport scrBg={sceneText.bgImage} scrPers={sceneText.characterImage} />
      <PlayerStatusBar name="Наруто Узумаки" rank="Генин (Лвл 1)" balance={playerBalance} locationName={sceneText.title} />
      
      {isEventOpen && (
        <EventWindow title={sceneText.title} description={sceneText.description} onActionClick={handleActionClick} primaryAction={{ text: sceneText.mainButtonText, target: sceneText.mainButtonCommand }} action2={sceneText.extraButtonText && sceneText.extraButtonCommand ? { text: sceneText.extraButtonText, target: sceneText.extraButtonCommand } : undefined} action3={undefined} action4={undefined} actionPrev={undefined} actionNext={undefined} />
      )}
      
      <TravelMap disabled={false} onTravel={handleActionClick} locations={[
        { name: "Главные ворота", icon: "🚪", target: "gates", bgModifier: "gatesBg" },
        { name: "Лавка Тен-Тен", icon: "⚔️", target: "armory", bgModifier: "armoryBg" },
        { name: "Офис Хокаге", icon: "🏢", target: "hokage", bgModifier: "hokageBg" }
      ]} />
      
      <Inventory disabled={false} isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} inventoryRecords={inventoryRecords} />

      {/* ПАНЕЛЬ УПРАВЛЕНИЯ В УГЛУ: Доступна только в мирном режиме */}
      
        <div style={{ position: "absolute", bottom: "25px", right: "100px", zIndex: 40, display: "flex", gap: "12px" }}>
          {/* 💡 ИСПРАВЛЕНО: Задали ИДЕАЛЬНЫЙ КРУГ для значка рюкзака (borderRadius: 50%) */}
          <button style={{ width: "56px", height: "56px", borderRadius: "50%", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, border: "none", background: "#ff6b00", color: "#fff", cursor: "pointer", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" }} onClick={() => setIsInventoryOpen(!isInventoryOpen)}>
            {isInventoryOpen ? "❌" : "🎒"}
          </button>
        </div>
    </main>
  );
}