'use client';
import styles from './Input.module.scss';

interface InputProps {
    /** Текст-подсказка внутри пустого поля */
    placeholder?: string;
    /** Текущее текстовое значение поля */
    value: string;
    /** Обработчик изменения текста пользователем */
    onChange: (value: string) => void;
    /** Тип поля ввода (например: text, password, number) */
    type?: 'text' | 'password' | 'number';
    /** Текст ошибки для валидации. Если передан, поле подсветится красным */
    error?: string;
};

/**
 * Универсальное поле ввода интерфейса Hidden Leaf Quest.
 * Поддерживает автоматическое camelCase-стилирование и вывод ошибок.
 */
// export function Input (props: InputProps) {
export const Input = ({ 
    placeholder, value, onChange, type = 'text', error
}: InputProps) => { // ..PS тоже самое что и ^
    // const text = props.text;
    // const { text } = props;  ..PS тоже самое что и ^
    // const nameClass = styles.nameClass;
    const { inputContainer, inputField, inputError, fieldInvalid } = styles; // ..PS тоже самое что и ^
    
    // Если есть ошибка, динамически добавляем класс ошибки к полю ввода
    const inputClass = error ? `${inputField} ${fieldInvalid}` : inputField;

    return (
        <div className={inputContainer}>
            <input
                type={type}
                className={inputClass}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
             />
             {error && <span className={inputError}>{error}</span>} {/* условный рендеринг если есть error */}
        </div>
    );
}