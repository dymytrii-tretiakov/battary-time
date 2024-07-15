import { useTranslation } from 'react-i18next';
import cls from 'classnames';
import { useBatteryTimeCalculator } from '../hooks/useBatteryTimeCalculator';
import { useRef } from 'react';
import Guide from './Guide';
import { GuideOverviewProps } from './GuideOverview';

const Calculator = () => {
  const {
    output,
    voltContext,
    watContext,
    percentage,
    settingsMinVoltage,
    settingsMaxVoltage,
    volError,
    watError
  } = useBatteryTimeCalculator();

  const handleTimeClick = () => {
    new Audio('./audio/ticking.mp3').play();
  };

  const { t } = useTranslation();

  // Guide
  const volInputRef = useRef<HTMLInputElement>(null);
  const watInputRef = useRef<HTMLInputElement>(null);

  const guides: Omit<GuideOverviewProps, 'onNext'>[] = [
    {
      element: volInputRef,
      text: t('guide.voltage')
    },
    {
      element: watInputRef,
      text: t('guide.wat')
    }
  ];

  const localStorageKey: string = 'enableCalculatorGuide';
  const showGuide: boolean =
    localStorage.getItem(localStorageKey) === null ||
    localStorage.getItem(localStorageKey) === 'true';

  return (
    <div className="container">
      <div className="time" onClick={handleTimeClick}>
        {output}
      </div>
      <div
        className={cls('percentage', {
          error: percentage < 15,
          warning: percentage >= 15 && percentage < 50,
          success: percentage >= 50
        })}
      >
        {percentage}%
      </div>
      <label className={cls({ error: volError })} htmlFor="voltage">
        {t('main.batteryVoltage')}
      </label>
      <input
        className={cls({ error: volError })}
        inputMode="decimal"
        type="number"
        name="voltage"
        value={voltContext.value || ''}
        onChange={voltContext.onChange}
        enterKeyHint="next"
        max={settingsMaxVoltage}
        min={settingsMinVoltage}
        onKeyUp={voltContext.keyUp}
        ref={volInputRef}
      />
      {volError && <div className="error-message">{volError}</div>}
      <label htmlFor="wat" className={cls({ error: watError })}>
        {t('main.wat')}
      </label>
      <input
        className={cls({ error: watError })}
        inputMode="numeric"
        type="number"
        name="wat"
        value={watContext.value || ''}
        onChange={watContext.onChange}
        min={0}
        max={2500}
        enterKeyHint="done"
        onKeyUp={watContext.keyUp}
        ref={watInputRef}
      />
      {watError && <div className="error-message">{watError}</div>}
      <div className="version">{'v1.2.0'}</div>
      <Guide guides={guides} showGuide={showGuide} localStorageKey={localStorageKey} />
    </div>
  );
};

export default Calculator;
