import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void; // Принимаю клик
  style?: React.CSSProperties;
}

export const Button = ({ children, variant = "primary", onClick, style }: ButtonProps) => {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;
  const className = `${styles.btnAction} ${variantClass}`;

  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};