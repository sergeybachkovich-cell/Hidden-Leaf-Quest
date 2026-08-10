'use client';
import styles from './EventWindow.module.scss';
import { Button } from '@/components/ui/Button/Button';

// Описываю структуру кнопки
interface EventAction {
    /** Текст на кнопке */
    text: string;
    /** Технический идентификатор действия для обработчика */
    target: string;
}

interface EventWindowProps {
    /** Заголовок происходящего события или имя говорящего */
    title: string;
    /** Текст описания ситуации / диалога */
    description: string;
    /** Главный обработчик: принимает target кликнутой кнопки */
    onActionClick: (target: string) => void;
    /** Главная кнопка действия (обязательная) */
    primaryAction: EventAction;
    /** Кнопка 2 (опционально) */
    action2?: EventAction;
    /** Кнопка 3 (опционально) */
    action3?: EventAction;
    /** Кнопка 4 (опционально) */
    action4?: EventAction;
    /** Кнопка 5 (опционально) - левая нижняя кнопка перелистывания */
    actionPrev?: EventAction;
    /** Кнопка 6 (опционально) - правая нижняя кнопка перелистывания*/
    actionNext?: EventAction;
};

/**
 * Монолитное окно Событий (Текстовое описание и кнопки для выбора с одной обязательной и 5 опциональными).
 */
export const EventWindow = ({
    title, description, onActionClick, primaryAction,
    action2, action3, action4, actionPrev, actionNext
}: EventWindowProps) => {
    const { eventWindow, eventTitle, eventDescription, eventActionGrid, } = styles;

    return (
        <div className={eventWindow}>
            <h2 className={eventTitle}>{title}</h2>
            <p className={eventDescription}>{description}</p>

            {/* Основная вертикальная сетка кнопок */}
            <div className={eventActionGrid}>
                {/* Обязательная кнопка */}
                <Button variant='primary' onClick={() => onActionClick(primaryAction.target)}>{primaryAction.text}</Button>

                {/* Опциональные кнопки */}
                {action2 && ( <Button variant='secondary' onClick={() => onActionClick(action2.target)}>{action2.text}</Button> )}
                {action3 && ( <Button variant='secondary' onClick={() => onActionClick(action3.target)}>{action3.text}</Button> )}
                {action4 && ( <Button variant='secondary' onClick={() => onActionClick(action4.target)}>{action4.text}</Button> )}

                {/* Кнопки навигации*/}
                {actionPrev? (<Button variant='secondary' onClick={() => onActionClick(actionPrev.target)}>{actionPrev.text}</Button>) : ( <div /> )}
                {actionNext? (<Button variant='secondary' onClick={() => onActionClick(actionNext.target)}>{actionNext.text}</Button>) : ( <div /> )}
            </div>
        </div>
    )
}