"use client";
import { useState } from "react";
import { LOCATIONS_DATA } from "@/shared/data/locations";
import { useGameController } from "@/shared/hooks/useStoryController";
import { EventWindow } from "@/components/game/EventWindow/EventWindow";
import { LocationViewport } from "@/components/game/LocationViewport/LocationViewport";
import { PlayerStatusBar } from "@/components/game/PlayerStatusBar/PlayerStatusBar";
import { Inventory } from "@/components/game/Inventory/Inventory";
import { TravelMap } from "@/components/game/TravelMap/TravelMap";

export default function Home() {
  const { currentLocKey, playerBalance, isInventoryOpen, setIsInventoryOpen, inventoryRecords, setInventoryRecords, handleActionClick, currentQuest, isQuestHere } = useGameController();
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const sceneText = LOCATIONS_DATA[currentLocKey];

  const isRepeatShop = !isQuestHere && currentLocKey === "armory";
  const isRepeatHokage = !isQuestHere && currentLocKey === "hokage";

  let modalTitle = sceneText.title;
  let modalDesc = "Выберите интересующее вас действие:";
  let mainBtnText = "🕵️‍♂️ Осмотреться";
  let mainBtnTarget = "click_look";
  let extraAction = undefined;

  if (isQuestHere && currentQuest) {
    modalTitle = currentQuest.title;
    modalDesc = currentQuest.text;
    mainBtnText = currentQuest.buttonText;
    mainBtnTarget = "close_event";
  } else {
    if (isDescriptionVisible) {
      modalDesc = sceneText.description;
    }
    
    if (isRepeatShop) {
      mainBtnText = "🛒 Купить кунай (50 Рё)";
      mainBtnTarget = "buy_kunai_repeat";
      if (!isDescriptionVisible) {
        extraAction = { text: "🕵️‍♂️ Осмотреться", target: "click_look" };
      }
    } else if (isRepeatHokage) {
      mainBtnText = "📜 Взять миссию (Ранг S)";
      mainBtnTarget = "take_mission";
      if (!isDescriptionVisible) {
        extraAction = { text: "🕵️‍♂️ Осмотреться", target: "click_look" };
      }
    } else {
      if (isDescriptionVisible) {
        mainBtnText = "🔙 Назад в меню";
        mainBtnTarget = "click_back";
      }
    }
  }

  const handleModalClick = (target: string) => {
    if (target === "click_look") {
      setIsDescriptionVisible(true);
    } else if (target === "click_back") {
      setIsDescriptionVisible(false);
    } else {
      handleActionClick(target);
    }
  };

  const handleGlobalTravel = (target: string) => {
    setIsDescriptionVisible(false);
    handleActionClick(target);
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>
      <LocationViewport scrBg={sceneText.bgImage} scrPers={sceneText.characterImage} />
      <PlayerStatusBar name="Игрок" rank="Генин (Лвл 1)" balance={playerBalance} locationName={sceneText.title} />
      
      <EventWindow 
        title={modalTitle} 
        description={modalDesc} 
        onActionClick={handleModalClick} 
        primaryAction={{ text: mainBtnText, target: mainBtnTarget }} 
        action2={extraAction}
        action3={undefined}
        action4={undefined} 
        actionPrev={undefined} 
        actionNext={undefined} 
      />
      
      <TravelMap disabled={false} onTravel={handleGlobalTravel} locations={[
        { name: "Главные ворота", icon: "🚪", target: "gates", bgModifier: "gatesBg" },
        { name: "Лавка Тен-Тен", icon: "⚔️", target: "armory", bgModifier: "armoryBg" },
        { name: "Офис Хокаге", icon: "🏢", target: "hokage", bgModifier: "hokageBg" }
      ]} />
      
      <Inventory disabled={false} isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} inventoryRecords={inventoryRecords} setInventoryRecords={setInventoryRecords} />

      <div style={{ position: "absolute", bottom: "25px", right: "100px", zIndex: 40, display: "flex", gap: "12px" }}>
        <button style={{ width: "56px", height: "56px", borderRadius: "50%", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, border: "none", background: "#ff6b00", color: "#fff", cursor: "pointer", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" }} onClick={() => setIsInventoryOpen(!isInventoryOpen)}>
          {isInventoryOpen ? "❌" : "🎒"}
        </button>
      </div>
    </main>
  );
}