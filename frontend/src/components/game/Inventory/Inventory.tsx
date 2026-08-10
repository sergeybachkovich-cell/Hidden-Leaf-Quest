"use client";
import { useState } from "react";
import styles from "./Inventory.module.scss";
import { ITEMS_DB, UserInventoryRecord } from "@/shared/data/items";

interface InventoryProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  inventoryRecords: UserInventoryRecord[];
}

export const Inventory = ({ disabled, isOpen, onClose, inventoryRecords }: InventoryProps) => {
  if (disabled || !isOpen) return null;

  const { invOverlay, invWrapper, invHeader, invTitle, closeBtn, invGrid, invCell, itemIcon, itemCount, infoBox, infoTitle, infoDesc } = styles;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const cells = Array(12).fill(null);
  inventoryRecords.forEach((record) => {
    if (record.slotIndex >= 0 && record.slotIndex < 12) {
      cells[record.slotIndex] = record;
    }
  });

  const selectedItemData = selectedItemId ? ITEMS_DB[selectedItemId] : null;
  const selectedRecord = inventoryRecords.find((r) => r.itemId === selectedItemId);

  return (
    <div className={invOverlay}>
      <div className={invWrapper}>
        <div className={invHeader}>
          <span className={invTitle}>🎒 Снаряжение шиноби</span>
          <button className={closeBtn} onClick={onClose}>❌</button>
        </div>
        <div className={invGrid}>
          {cells.map((record, index) => {
            const itemData = record ? ITEMS_DB[record.itemId] : null;
            return (
              <div key={index} className={invCell} onClick={() => record && setSelectedItemId(record.itemId)}>
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
            <span className={infoTitle}>{selectedItemData.name}</span>
            <p className={infoDesc}>{selectedItemData.description}</p>
          </div>
        ) : (
          <div className={infoBox}>
            <p className={infoDesc}>Выберите предмет для просмотра описания</p>
          </div>
        )}
      </div>
    </div>
  );
};