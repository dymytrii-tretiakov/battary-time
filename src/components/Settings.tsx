import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { CSSTransition } from 'react-transition-group';
import rightArrow from '../assets/images/right-arrow.svg';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

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

  const { t } = useTranslation();

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
            <h2>{t('settings.title')}</h2>
            <button onClick={closeSettings} className="close-settings settings-button">
              <img src={rightArrow} alt="Close settings" className="settings-icon" />
            </button>
          </div>
          <label htmlFor="">{t('settings.language')}</label>
          <LanguageSelector />
          <label htmlFor="minVoltage">{t('settings.minVoltage')}</label>
          <input
            type="number"
            id="minVoltage"
            inputMode='numeric'
            value={minVoltage || ''}
            onChange={e => setMinVoltage(Number(e.target.value))}
          />
          <label htmlFor="maxVoltage">{t('settings.maxVoltage')}</label>
          <input
            type="number"
            id="maxVoltage"
            inputMode='numeric'
            value={maxVoltage || ''}
            onChange={e => setMaxVoltage(Number(e.target.value))}
          />

          <label htmlFor="batteryCapacity">{t('settings.batteryCapacity')}</label>
          <input
            type="number"
            id="batteryCapacity"
            inputMode='numeric'
            value={batteryCapacity || ''}
            onChange={e => setBatteryCapacity(Number(e.target.value))}
          />

          <label htmlFor="voltageSystem">{t('settings.systemVoltage')}</label>
          <input
            type="number"
            id="voltageSystem"
            inputMode='numeric'
            value={voltageSystem || ''}
            onChange={e => setVoltageSystem(Number(e.target.value))}
          />
        </div>
      </CSSTransition>
    </>
  );
};

export default Settings;
