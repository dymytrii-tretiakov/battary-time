import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { CSSTransition } from 'react-transition-group';
import rightArrow from '../assets/images/right-arrow.svg';
import SettingsButton from './SettingsButton';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { GuideOverviewProps } from './GuideOverview';
import Guide from './Guide';
import '../assets/css/settings.css';

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

  // Guide
  const langRef = React.useRef<HTMLSelectElement>(null);
  const minVoltageRef = React.useRef<HTMLInputElement>(null);
  const maxVoltageRef = React.useRef<HTMLInputElement>(null);
  const batteryCapacityRef = React.useRef<HTMLInputElement>(null);
  const voltageSystemRef = React.useRef<HTMLInputElement>(null);

  const handelResetGuide = () => {
    localStorage.removeItem('enableSettingsGuide');
    localStorage.removeItem('enableCalculatorGuide');
    window.location.reload();
  };

  const localStorageKey: string = 'enableSettingsGuide';
  const showGuide: boolean =
    localStorage.getItem(localStorageKey) === null ||
    localStorage.getItem(localStorageKey) === 'true';

  const guides: Omit<GuideOverviewProps, 'onNext'>[] = [
    {
      element: langRef,
      text: t('settings.guide.language')
    },
    {
      element: minVoltageRef,
      text: t('settings.guide.minVoltage')
    },
    {
      element: maxVoltageRef,
      text: t('settings.guide.maxVoltage')
    },
    {
      element: batteryCapacityRef,
      text: t('settings.guide.batteryCapacity')
    },
    {
      element: voltageSystemRef,
      text: t('settings.guide.systemVoltage')
    }
  ];

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
          <div className="container settings-container">
            <div className="settings-header">
              <h2>{t('settings.title')}</h2>
              <button onClick={closeSettings} className="close-settings settings-button">
                <img src={rightArrow} alt="Close settings" className="settings-icon" />
              </button>
            </div>
            <label htmlFor="">{t('settings.language')}</label>
            <LanguageSelector ref={langRef} />
            <label htmlFor="minVoltage">{t('settings.minVoltage')}</label>
            <input
              type="number"
              id="minVoltage"
              inputMode="numeric"
              value={minVoltage || ''}
              onChange={e => setMinVoltage(Number(e.target.value))}
              ref={minVoltageRef}
            />
            <label htmlFor="maxVoltage">{t('settings.maxVoltage')}</label>
            <input
              type="number"
              id="maxVoltage"
              inputMode="numeric"
              value={maxVoltage || ''}
              onChange={e => setMaxVoltage(Number(e.target.value))}
              ref={maxVoltageRef}
            />

            <label htmlFor="batteryCapacity">{t('settings.batteryCapacity')}</label>
            <input
              type="number"
              id="batteryCapacity"
              inputMode="numeric"
              value={batteryCapacity || ''}
              onChange={e => setBatteryCapacity(Number(e.target.value))}
              ref={batteryCapacityRef}
            />

            <label htmlFor="voltageSystem">{t('settings.systemVoltage')}</label>
            <input
              type="number"
              id="voltageSystem"
              inputMode="numeric"
              value={voltageSystem || ''}
              onChange={e => setVoltageSystem(Number(e.target.value))}
              ref={voltageSystemRef}
            />
            <button onClick={handelResetGuide} className="button">
              {t('resetGuide')}
            </button>
          </div>
        <Guide guides={guides} showGuide={showGuide} localStorageKey={localStorageKey} />
        </div>
      </CSSTransition>
    </>
  );
};

export default Settings;
