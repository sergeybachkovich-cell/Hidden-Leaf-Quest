'use client';

import style from './PlayerStatusBar.module.scss';
export const PlayerStatusBar = () => {
    const {
        playerStatusBar, avatarPlaceholder, playerInfo, playerName,
        playerRank, playerWallet, currency
    } = style;

    return (
        <div className={playerStatusBar}>
        <div className={avatarPlaceholder}>🍃</div>
        <div className={playerInfo}>
          <span className={playerName}>Наруто Узумаки</span>
          <span className={playerRank}>Генин (Лвл 1)</span>
        </div>
        <div className={playerWallet}>
          <span>Баланс: <strong className={currency}>150Рё</strong></span>
        </div>
      </div>
    );
}