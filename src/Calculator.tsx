import { useTranslation } from 'react-i18next';
import { useBatteryTimeCalculator } from './useBatteryTimeCalculator';

const Calculator = () => {
  const { output, voltContext, watContext, percentage } = useBatteryTimeCalculator();

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
        max={54}
        min={44}
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
    </div>
  );
};

export default Calculator;
