'use client';
import styles from './Badge.module.scss';

interface BadgeProps {
    /** Текст, который будет написан внутри метки (например: Ранг S) */
    children: React.ReactNode;
    /** Стиль оформления метки под разные задачи */
    variant?: 'primary' | 'danger' | 'muted';
};


/**
 * Универсальный компактный тег-метка для интерфейса Hidden Leaf Quest.
 * Применяется для категорий предметов, рангов миссий и статусов квестов.
 */
export const Badge = (props: BadgeProps) => {
    const { children, variant = 'primary' } = props;
    const { badge } = styles;

    // Собираю классы стилей
    const badgeClass = `${badge} ${styles[variant]}`;
    return (
        <span className={badgeClass}>
            {children}
        </span>
    );
};