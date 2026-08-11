"use client";
import { useState } from "react";
import { LOCATIONS_DATA } from "@/shared/data/locations";
import { useGameController } from "@/shared/hooks/useStoryController";
import { EventWindow } from "@/components/game/EventWindow/EventWindow";
import { LocationViewport } from "@/components/game/LocationViewport/LocationViewport";
import { PlayerStatusBar } from "@/components/game/PlayerStatusBar/PlayerStatusBar";
import { Inventory } from "@/components/game/Inventory/Inventory";
import { JutsuPanel } from "@/components/game/JutsuPanel/JutsuPanel";
import { TravelMap } from "@/components/game/TravelMap/TravelMap";

export default function Home() {
  const { currentLocKey, playerBalance, isInventoryOpen, setIsInventoryOpen, inventoryRecords, setInventoryRecords, handleActionClick, currentQuest, isQuestHere, unlockedJutsu, handleCastJutsu, playerName, setPlayerName, playerRank } = useGameController();
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isJutsuOpen, setIsJutsuOpen] = useState(false);
  const sceneText = LOCATIONS_DATA[currentLocKey] || LOCATIONS_DATA["gates"];

  const isRepeatShop = !isQuestHere && currentLocKey === "armory";
  
  // 💡 Проверяем, идет ли сейчас первый квест регистрации имени
  const isNameSelectionRequired = currentQuest && currentQuest.id === 0;

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
    } else {
      if (isDescriptionVisible) {
        mainBtnText = "↩️ Назад в меню";
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
    setIsJutsuOpen(false);
    handleActionClick(target);
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>
      {/* Фон и спрайты отрисовываем всегда */}
      <LocationViewport scrBg={sceneText.bgImage} scrPers={sceneText.characterImage} characterStyle={sceneText.characterStyle} />
      
      {/* 📜 1. СВИДОР РЕГИСТРАЦИИ (Авторизация): Показываем по центру экрана, если имя еще не введено */}
      {isNameSelectionRequired && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: "450px", background: "rgba(20, 24, 28, 0.98)", padding: "24px", borderRadius: "12px", border: "2px solid #ff6b00", boxShadow: "0 8px 32px rgba(0,0,0,0.8)", fontFamily: "sans-serif", color: "#fff", zIndex: 40, textAlign: "center" }}>
          <h2 style={{ color: "#ff6b00", margin: "0 0 10px 0", fontSize: "22px" }}>{currentQuest.title}</h2>
          <p style={{ fontSize: "14px", color: "#ccc", marginBottom: "20px", lineHeight: "1.5" }}>{currentQuest.text}</p>
          
          <label style={{ display: "block", color: "#ff6b00", fontWeight: "bold", fontSize: "14px", marginBottom: "8px", textAlign: "left" }}>📜 Свиток регистрации шиноби:</label>
          <input 
            type="text" 
            value={playerName === "Игрок" ? "" : playerName} 
            onChange={(e) => setPlayerName(e.target.value)} 
            placeholder="Впишите ваше имя..." 
            style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: "6px", border: "1px solid #ff6b00", background: "#13171a", color: "#fff", fontSize: "16px", fontWeight: "bold", outline: "none", marginBottom: "20px", textAlign: "center" }} 
          />
          
          {/* Кнопка подтверждения, которая отправляет экшен и проверяет валидацию имени в хуке */}
          <button onClick={() => handleModalClick("close_event")} style={{ width: "100%", padding: "14px", background: "#ff6b00", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)" }}>
            {currentQuest.buttonText}
          </button>
        </div>
      )}

      {/* 🔐 2. ИГРОВОЙ ИНТЕРФЕЙС: Полностью скрываем и изолируем, пока идет регистрация */}
      {!isNameSelectionRequired && (
        <>
          {/* Верхний статус-бар */}
          <PlayerStatusBar name={playerName} rank={playerRank} balance={playerBalance} locationName={sceneText.title} />
          
          {/* Нижнее квестовое окно диалогов */}
          <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: "640px", zIndex: 30 }}>
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
          </div>
          
          {/* Карта перемещений */}
          <TravelMap disabled={false} onTravel={handleGlobalTravel} locations={[
            { name: "Ворота", icon: "🚪", target: "gates", bgModifier: "gatesBg" },
            { name: "Лавка", icon: "⚔️", target: "armory", bgModifier: "armoryBg" },
            { name: "Хокаге", icon: "🏢", target: "hokage", bgModifier: "hokageBg" },
            { name: "Академия", icon: "🏫", target: "academy", bgModifier: "academyBg" },
            { name: "Сенджу", icon: "🏡", target: "senju_mansion", bgModifier: "senjuBg" },
            { name: "Учиха", icon: "🔺", target: "uchiha_district", bgModifier: "uchihaBg" },
            { name: "Минато", icon: "🏠", target: "minato_house", bgModifier: "minatoBg" },
            { name: "Наруто", icon: "📦", target: "naruto_apartment", bgModifier: "narutoBg" },
            { name: "Какаши", icon: "⚔️", target: "kakashi_house", bgModifier: "kakashiBg" }
          ]} />
          
          {/* Рюкзак и Панель техник */}
          <Inventory disabled={false} isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} inventoryRecords={inventoryRecords} setInventoryRecords={setInventoryRecords} />
          <JutsuPanel isOpen={isJutsuOpen} unlockedJutsu={unlockedJutsu} onCast={handleCastJutsu} />

          {/* Плавающие кнопки открытия рюкзака/дзюцу */}
          <div style={{ position: "absolute", bottom: "25px", right: "100px", zIndex: 40, display: "flex", gap: "12px" }}>
            <button style={{ width: "56px", height: "56px", borderRadius: "50%", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, background: "#1f2428", border: "2px solid #ff6b00", color: "#fff", cursor: "pointer", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" }} onClick={() => setIsJutsuOpen(!isJutsuOpen)}>{isJutsuOpen ? "❌" : "⚡"}</button>
            <button style={{ width: "56px", height: "56px", borderRadius: "50%", fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, border: "none", background: "#ff6b00", color: "#fff", cursor: "pointer", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" }} onClick={() => { setIsInventoryOpen(!isInventoryOpen); setIsJutsuOpen(false); }}>{isInventoryOpen ? "❌" : "🎒"}</button>
          </div>
        </>
      )}
    </main>
  );
}
