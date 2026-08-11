"use client";
import { useState } from "react";
import styles from "./Inventory.module.scss";
import { ITEMS_DB } from "@/shared/data/items";

interface InventoryProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  inventoryRecords: any[];
  setInventoryRecords?: (records: any[]) => void;
}

export const Inventory = ({ disabled, isOpen, onClose, inventoryRecords, setInventoryRecords }: any) => {
  if (disabled || !isOpen) return null;

  const { invOverlay, invWrapper, invHeader, invTitle, closeBtn, invGrid, invCell, itemIcon, itemCount, infoBox, infoTitle, infoDesc } = styles;
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const cells = Array(12).fill(null);
  // ИСПРАВЛЕНИЕ 1: добавлен тип : any
  inventoryRecords.forEach((r: any) => {
    if (r && r.slotIndex >= 0 && r.slotIndex < 12) cells[r.slotIndex] = r;
  });

  const handleCellClick = (index: number) => {
    const currentItem = cells[index];

    if (activeSlot === null) {
      if (currentItem) setActiveSlot(index);
    } else {
      if (activeSlot === index) {
        if (currentItem && setInventoryRecords) {
          if (currentItem.itemId === "kunai") {
            alert("🎯 Вы метнули кунай!");
          } else {
            alert("🎒 Использован предмет: " + (ITEMS_DB as any)[currentItem.itemId].name);
          }
          
          // ИСПРАВЛЕНИЕ 2: добавлен тип (r: any)
          let updated = inventoryRecords.map((r: any) => {
            if (r && r.slotIndex === index) {
              return r.count > 1 ? { ...r, count: r.count - 1 } : null;
            }
            return r;
          }).filter(Boolean);
          setInventoryRecords(updated);
        }
        setActiveSlot(null);
      } else {
        if (setInventoryRecords) {
          // ИСПРАВЛЕНИЕ 3: добавлен тип (r: any)
          let updated = inventoryRecords.map((r: any) => {
            if (r && r.slotIndex === activeSlot) {
              return { ...r, slotIndex: index };
            }
            return r;
          });
          setInventoryRecords(updated);
        }
        setActiveSlot(null);
      }
    }
  };

  const selectedRecord = activeSlot !== null ? cells[activeSlot] : null;
  const selectedItemData = selectedRecord ? (ITEMS_DB as any)[selectedRecord.itemId] : null;

  return (
    <div className={invOverlay}>
      <div className={invWrapper}>
        <div className={invHeader}>
          <span className={invTitle}>🎒 Снаряжение шиноби</span>
          <button className={closeBtn} onClick={onClose}>❌</button>
        </div>
        <div className={invGrid}>
          {cells.map((record, index) => {
            const itemData = record ? (ITEMS_DB as any)[record.itemId] : null;
            const isSelected = activeSlot === index;
            return (
              <div 
                key={index} 
                className={invCell} 
                onClick={() => handleCellClick(index)}
                style={isSelected ? { border: "2px solid #ff6b00", background: "rgba(255, 107, 0, 0.1)" } : {}}
              > 
                {itemData && record && (
                  <div className={itemIcon}>
                    {itemData.icon}
                    <span className={itemCount}>x{record.count}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {selectedItemData && selectedRecord ? (
          <div className={infoBox}>
            <span className={infoTitle}>{selectedItemData.name} (Выбран)</span>
            <p className={infoDesc}>{selectedItemData.description}</p>
          </div>
        ) : (
          <div className={infoBox}>
            <p className={infoDesc}>Кликните по предмету, чтобы выбрать его. Повторный клик — использовать. Клик по пустой ячейке — переместить.</p>
          </div>
        )}
      </div>
    </div>
  );
};
