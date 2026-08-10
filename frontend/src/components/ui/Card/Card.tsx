'use client';
import React from 'react';
import styles from './Card.module.scss';
interface CardProps {
    /** Внутреннее содержимое карточки (текст, компоненты, кнопки) */
    children: React.ReactNode;
    /** Включает эффект интерактивности и приподнимания при наведении курсора */
    hoverable?: boolean;
};

/**
 * Универсальный контейнер-карточка интерфейса Hidden Leaf Quest.
 * Используется для обрамления товаров, квестов и элементов инвентаря.
 */
export const Card = (props: CardProps) => {
    const { children, hoverable = false } = props;
    const { card, cardHoverable, } = styles;

    // Включаю анимацию по ховеру
    const cardClass = hoverable ? `${card} ${cardHoverable}` : card;

    return (
        <div className={cardClass}>
            {children}
        </div>
    );
};