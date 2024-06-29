import { useTranslation } from 'react-i18next';
import { useBatteryTimeCalculator } from '../hooks/useBatteryTimeCalculator';

const Calculator = () => {
  const { output, voltContext, watContext, percentage, settingsMinVoltage, settingsMaxVoltage } =
    useBatteryTimeCalculator();

  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="time">{output}</div>
      <div className="percentage">{percentage}%</div>
      <label htmlFor="voltage">{t('main.batteryVoltage')}</label>
      <input
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
      <label htmlFor="wat">{t('main.wat')}</label>
      <input
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
      <div className="version">{'v1.1.0'}</div>
    </div>
  );
};

export default Calculator;
