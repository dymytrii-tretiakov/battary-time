import { FC } from 'react';
import gearIcon from '../assets/images/gear.svg';

interface SettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="settings-button">
      <img src={gearIcon} alt="Settings" className="settings-icon" />
    </button>
  );
};

export default SettingsButton;
