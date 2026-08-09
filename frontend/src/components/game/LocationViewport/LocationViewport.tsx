import styles from './LocationViewport.module.scss';

interface LocationViewportProps {
  title: string;
  description: string;
}

export const LocationViewport = ({ title, description }: LocationViewportProps) => {
  const {
    locationViewport,
    locationBgContainer,
    locationBgImg,
    characterSpriteContainer,
    characterImg,
    locationTextBox,
    locationTitle,
    locationDescribtion
  } = styles;

  return (
    <div className={locationViewport}>
      <div className={locationBgContainer}>
        <img src={undefined} alt="*КАРТИНКА ЛОКАЦИИ*" className={locationBgImg} />
      </div>

      <div className={characterSpriteContainer}>
        <img src={undefined} alt="КАРТИНКА ПЕРСОНАЖА" className={characterImg} />
      </div>

      <div className={locationTextBox}>
        <h2 className={locationTitle}>{title}</h2>
        <p className={locationDescribtion}>{description}</p>
      </div>
    </div>
  );
};
