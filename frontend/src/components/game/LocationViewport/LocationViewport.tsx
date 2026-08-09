import styles from './LocationViewport.module.scss';

export const LocationViewport = () => {
    const {
        locationViewport, locationBgContainer, characterSpriteContainer,
        locationTextBox, locationTitle, locationDescribtion, locationBgImg,
        characterImg
    } = styles;
    
    return (
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
    );
}