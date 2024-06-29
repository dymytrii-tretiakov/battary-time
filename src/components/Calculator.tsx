import { useTranslation } from 'react-i18next';
import cls from 'classnames';
import { useBatteryTimeCalculator } from '../hooks/useBatteryTimeCalculator';

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

  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="time">{output}</div>
      <div className="percentage">{percentage}%</div>
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
      />
      {volError && <div className="error-message">{volError}</div>}
      <label htmlFor="wat" className={cls({ error: watError })}>
        {t('main.wat')}
      </label>
      <input
        className={cls({ error: watError })}
        inputMode="decimal"
        type="number"
        name="wat"
        value={watContext.value || ''}
        onChange={watContext.onChange}
        min={0}
        max={2500}
        enterKeyHint="done"
        onKeyUp={watContext.keyUp}
      />
      {watError && <div className="error-message">{watError}</div>}
      <div className="version">{'v1.1.1'}</div>
    </div>
  );
};

export default Calculator;
