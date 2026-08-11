'use client';
import { useState } from 'react';
import styles from './PlayerProfile.module.scss';

interface PlayerProfileProps {};
export const PlayerProfile = (props: PlayerProfileProps) => {
    const {} = styles;
    const [isOpen, setIsOpen] = useState(false);
    let visible: 'visible' | 'hidden' = isOpen ? 'visible' : 'hidden';
    return ( 
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Профиль</button>
            <div style={{visibility: visible}}>
                
            </div>
        </div>
    );
};