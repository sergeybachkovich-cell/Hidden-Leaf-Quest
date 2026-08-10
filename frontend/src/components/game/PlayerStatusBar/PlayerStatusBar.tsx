import style from "./PlayerStatusBar.module.scss";

interface PlayerStatusBarProps {
  name: string;
  rank: string;
  balance: number;
  locationName: string;
}

export const PlayerStatusBar = ({ name, rank, balance, locationName }: PlayerStatusBarProps) => {
  const { playerStatusBar, avatarPlaceholder, playerInfo, playerName, playerRank, playerWallet, currency } = style;

  return (
    <div className={playerStatusBar}>
      <div className={avatarPlaceholder}>🍃</div>
      <div className={playerInfo}>
        <span className={playerName}>{name}</span>
        <span className={playerRank}>{rank}</span>
      </div>
      <div style={{ flexGrow: 1, textAlign: "center", fontSize: "13px", fontWeight: 600, color: "var(--color-primary)" }}>
        📍 {locationName}
      </div>
      <div className={playerWallet}>
        <span>Баланс: <strong className={currency}>{balance}Рё</strong></span>
      </div>
    </div>
  );
};