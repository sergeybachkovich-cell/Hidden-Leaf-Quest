import styles from './ActionDock.module.scss';
import { Button } from '../../ui/Button/Button';

interface ActionItem {
  text: string;
  target: string;
}

interface ActionDockProps {
  actions: ActionItem[];
  onActionClick: (target: string) => void;
}

export const ActionDock = ({ actions, onActionClick }: ActionDockProps) => {
  const { actionDock } = styles;

  return (
    <div className={actionDock}>
      {/* Динамически перебираем массив действий и выводим наши UI-кнопки */}
      {actions.map((action, index) => (
        <Button 
          key={index} 
          variant="secondary" 
          onClick={() => onActionClick(action.target)}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
};
