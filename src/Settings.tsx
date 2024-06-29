import React from 'react';
import { useSettings } from './useSettings';
import { CSSTransition } from 'react-transition-group';
import rightArrow from './assets/right-arrow.svg';
import SettingsButton from './SettingsButton';

const Settings = () => {
  const {
    minVoltage,
    setMinVoltage,
    maxVoltage,
    setMaxVoltage,
    batteryCapacity,
    setBatteryCapacity,
    voltageSystem,
    setVoltageSystem,
    settingsVisible,
    closeSettings,
    openSettings
  } = useSettings();

  const nodeRef = React.useRef(null);

  return (
    <>
      <SettingsButton onClick={openSettings} />
      <CSSTransition
        nodeRef={nodeRef}
        in={settingsVisible}
        timeout={300}
        classNames="settings"
        unmountOnExit
      >
        <div ref={nodeRef} className="settings">
          <div className="settings-header">
            <h2>Настройки</h2>
            <button onClick={closeSettings} className="close-settings settings-button">
              <img src={rightArrow} alt="Close settings" className="settings-icon" />
            </button>
          </div>
          <label htmlFor="minVoltage">Минимальное напряжение (V)</label>
          <input
            type="number"
            id="minVoltage"
            value={minVoltage || ''}
            onChange={e => setMinVoltage(Number(e.target.value))}
          />
          <label htmlFor="maxVoltage">Максимальное напряжение (V)</label>
          <input
            type="number"
            id="maxVoltage"
            value={maxVoltage || ''}
            onChange={e => setMaxVoltage(Number(e.target.value))}
          />

          <label htmlFor="batteryCapacity">Емкость батарей (Ah)</label>
          <input
            type="number"
            id="batteryCapacity"
            value={batteryCapacity || ''}
            onChange={e => setBatteryCapacity(Number(e.target.value))}
          />

          <label htmlFor="voltageSystem">Напряжение системы (V)</label>
          <input
            type="number"
            id="voltageSystem"
            value={voltageSystem || ''}
            onChange={e => setVoltageSystem(Number(e.target.value))}
          />
        </div>
      </CSSTransition>
    </>
  );
};

export default Settings;
