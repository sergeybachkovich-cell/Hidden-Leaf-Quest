import styles from "./Input.module.scss";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export const Input = ({ type = "text", placeholder, value, onChange, error }: InputProps) => {
  const { inputContainer, inputField, inputError, fieldInvalid } = styles; // Вытаскиваю стили модулей

  return (
    <div className={inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputField} ${error ? fieldInvalid : ""}`}
      />
      {error && <span className={inputError}>{error}</span>} {/* Добавляю класс ошибки при сбое */}
    </div>
  );
};