import styles from './LocationViewport.module.scss';

interface LocationViewportProps {
  /** Путь к картинке-фону локации */
  scrBg?: string;
  /** Путь к картинке персонажа */
  scrPers?: string;
}

export const LocationViewport = (props: LocationViewportProps) => {
  const bg = props.scrBg || undefined,
        person = props.scrPers || undefined;

  const {
    locationViewport,
    locationBgContainer,
    locationBgImg,
    characterSpriteContainer,
    characterImg,
  } = styles;

  return (
    <div className={locationViewport}>
      {/* Контейнер для арта локации */}
      <div className={locationBgContainer}>
        <img src={bg} alt="*КАРТИНКА ЛОКАЦИИ*" className={locationBgImg} />
      </div>

      {/* Контейнер для PNG спрайта персонажа (с кем идет диалог) */}
      <div className={characterSpriteContainer}>
        <img src={person} alt="КАРТИНКА ПЕРСОНАЖА" className={characterImg} />
      </div>

    </div>
  );
};
