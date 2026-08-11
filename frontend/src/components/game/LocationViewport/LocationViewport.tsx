import styles from "./LocationViewport.module.scss";

interface LocationViewportProps {
  scrBg?: string;
  scrPers?: string;
  characterStyle?: React.CSSProperties; 
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
        {/* 💡 Рендерим картинку только если есть путь, и убираем текст из alt */}
        {bg && <img src={bg} alt="" className={locationBgImg} />}
      </div>

      {/* Контейнер для PNG спрайта персонажа */}
      <div className={characterSpriteContainer}>
        {/* 💡 Рендерим спрайт только если он передан, alt пустой */}
        {person && <img src={person} alt="" className={characterImg} />}
      </div>
    </div>
  );
};