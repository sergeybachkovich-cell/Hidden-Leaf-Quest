'use client';

import styles from './Button.module.scss';

interface ButtonProps {
    /** Текст или элементы, которые отображаются внутри кнопки */
    children: React.ReactNode;

    /** 
     * Стиль оформления кнопки. 
     * 'primary' — оранжевый, 'secondary' — прозрачный, 'danger' — красный 
     */
    variant?: 'primary' | 'secondary' | 'danger';

    /** Функция-обработчик клика по кнопке */
    onClick?: () => void; // 💡 ДОБАВИЛИ СТРОКУ
};

/**
 * Универсальная кнопка интерфейса Hidden Leaf Quest.
 * Поддерживает три встроенных стиля оформления через пропс variant.
 */

    // export const Button = (props: ButtonProps) => {
export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => { // PS.. тоже самое что и ^
    /* const children = props.children;
        const variant = props.variant; */
    // const {children, variant} = props; PS.. тоже самое что и ^

    // const btnAction = styles.btnAction;
    const { btnAction } = styles; // PS.. тоже самое что и ^
    const buttonClass = `${btnAction} ${styles[variant]}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};