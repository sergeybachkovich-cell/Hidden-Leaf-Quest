import style from './PlayerStatusBar.module.scss';

// Описываем, какие входные данные обязана принимать панель статуса
interface PlayerStatusBarProps {
  name: string;
  rank: string;
  balance: number;
}

export const PlayerStatusBar = ({ name, rank, balance }: PlayerStatusBarProps) => {
    const {
        playerStatusBar, avatarPlaceholder, playerInfo, playerName,
        playerRank, playerWallet, currency
    } = style;
    
    return (
        <div className={playerStatusBar}>
        <div className={avatarPlaceholder}>🍃</div>
        <div className={playerInfo}>
          <span className={playerName}>{name}</span>
          <span className={playerRank}>{rank}</span>
        </div>
        <div className={playerWallet}>
          <span>Баланс: <strong className={currency}>{balance}Рё</strong></span>
        </div>
      </div>
    );
};
