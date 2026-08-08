'use client';

import styles from './page.module.scss';

export default function Home() {
  const { 
    gameLayout, playerStatusBar, avatarPlaceholder, playerInfo,
    playerName, playerRank, playerWallet, currency, locationViewport,
    locationBgContainer, locationBgImg, characterSpriteContainer,
    characterImg, locationTextBox, locationTitle, locationDescribtion,
    actionDock, btnAction,
  } = styles;
  
  return (
    <main className={gameLayout}>
      {/* 1. Панель статуса шиноби */}
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

      {/* 2. Главное окно локации */}
      <div className={locationViewport}>
        {/* Контейнер для фонового изображения локации */}
        <div className={locationBgContainer}>
          <img src={undefined} alt="*КАРТИНКА ЛОКАЦИИ*" className={locationBgImg} />
        </div>

        {/* Контейнер для спрайта персонажа (NPC или героя) */}
        <div className={characterSpriteContainer}>
          <img src={undefined} alt="КАРТИНКА ПЕРСОНАЖА" className={characterImg} />
        </div>

        <div className={locationTextBox}>
          <h2 className={locationTitle}>Главные ворота Конохи</h2>
          <p className={locationDescribtion}>
            Перед вами раскинулась Деревня, Скрытая в Листве. Солнце освещает Лики Хокаге, высеченные на скале. 
            Чунины на посту внимательно осматривают каждого входящего. Атмосфера спокойная, но за пределами ворот вас ждут великие дела.
          </p>
        </div>
      </div>

      {/* 3. Нижняя панель */}
      <div className={actionDock}>
        <button className={btnAction}>Заглянуть в оружейную</button>
        <button className={btnAction}>Взять миссию у Хокаге</button>
      </div>
    </main>
  );
}
