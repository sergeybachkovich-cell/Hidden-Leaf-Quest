'use client';

import styles from './ActionDock.module.scss';
import { Button } from '@/components/ui/Button/Button';

export const ActionDock = () => {
    const {
        actionDock,
    } = styles;
    return (
        <div className={actionDock}>
            <Button variant='primary'>Заглянуть в оружейную</Button>
            <Button variant='primary'>Взять миссию у Хокаге</Button>
        </div>
    );
}