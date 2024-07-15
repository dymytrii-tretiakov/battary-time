import { ChangeEvent, useState, useEffect, KeyboardEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/settingsStore';

interface InputContext {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface BatteryCalculator {
  output: string;
  voltContext: InputContext;
  watContext: InputContext;
  percentage: number;
  settingsMinVoltage: number;
  settingsMaxVoltage: number;
  volError: string;
  watError: string;
}

export const useBatteryTimeCalculator = (): BatteryCalculator => {
  const { t, i18n } = useTranslation();

  const {
    minVoltage: settingsMinVoltage,
    maxVoltage: settingsMaxVoltage,
    batteryCapacity: settingsBatteryCapacity,
    voltageSystem: settingsVoltageSystem
  } = useSettingsStore();

  const [volt, setVolt] = useState<number>(Number(settingsMaxVoltage) || 0);
  const [wat, setWat] = useState<number>(0);
  const [output, setOutput] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);
  const [volError, setVolError] = useState<string>('');
  const [watError, setWatError] = useState<string>('');

  const voltContext: InputContext = {
    value: volt,
    onChange: e => {
      setVolt(Number(e.target.value));
    },
    keyUp: e => {
      if (e.key === 'Enter') {
        const nextInput = e.currentTarget.nextElementSibling
          ?.nextElementSibling as HTMLInputElement;
        console.log(nextInput);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const watContext: InputContext = {
    value: wat,
    onChange: e => {
      setWat(Number(e.target.value));
    },
    keyUp: e => {
      if (e.key === 'Enter') {
        e.currentTarget.blur();
      }
    }
  };

  const calculateBatteryPercentage = useCallback(
    (currentVoltage: number): number => {
      const maxVoltage = Number(settingsMaxVoltage) || 52;
      const minVoltage = Number(settingsMinVoltage || 44);
      const voltageRange = maxVoltage - minVoltage;

      // Calculate percentage based on voltage range
      const percentage = ((currentVoltage - minVoltage) / voltageRange) * 100;

      // Clamp percentage to range [0, 100]
      return Math.ceil(Math.max(0, Math.min(100, percentage)));
    },
    [settingsMaxVoltage, settingsMinVoltage]
  );

  const getHoursWord = useCallback(
    (hours: number): string => {
      const hoursCases = [t('calculator.hours1'), t('calculator.hours2'), t('calculator.hours3')];
      if (hours % 10 === 1 && hours % 100 !== 11) return hoursCases[1];
      if (hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20))
        return hoursCases[2];
      return hoursCases[0];
    },
    [t]
  );

  const getMinutesWord = useCallback(
    (minutes: number): string => {
      const minutesCases = [
        t('calculator.minutes1'),
        t('calculator.minutes2'),
        t('calculator.minutes3')
      ];
      if (minutes % 10 === 1 && minutes % 100 !== 11) return minutesCases[0];
      if (minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20))
        return minutesCases[1];
      return minutesCases[2];
    },
    [t]
  );

  const calculateRemainingTime = useCallback(
    (currentVoltage: number, powerConsumption: number): void => {
      if (!currentVoltage || !powerConsumption) {
        setOutput(t('calculator.empty'));
        return;
      }

      if (currentVoltage > settingsMaxVoltage) {
        setOutput(t('calculator.maxError', { value: settingsMaxVoltage }));
        return;
      }

      if (currentVoltage < settingsMinVoltage) {
        setOutput(t('calculator.minError', { value: settingsMinVoltage }));
        return;
      }

      if (powerConsumption < 0) {
        setOutput(t('calculator.lessZeroError'));
        return;
      }

      const nominalVoltage = (Number(settingsMinVoltage) + Number(settingsMaxVoltage)) / 2;
      const batteryCapacityWh = Number(settingsBatteryCapacity) * nominalVoltage;
      const currentEnergy =
        ((currentVoltage - Number(settingsMinVoltage)) /
          (Number(settingsMaxVoltage) - Number(settingsMinVoltage))) *
        batteryCapacityWh;
      const timeLeft = currentEnergy / powerConsumption;

      const hours = Math.floor(timeLeft);
      const minutes = Math.round((timeLeft - hours) * 60);

      setPercentage(calculateBatteryPercentage(currentVoltage));

      if (timeLeft < 0.1) {
        setOutput(t('calculator.notBatteryError'));
        return;
      }

      setOutput(`${hours} ${getHoursWord(hours)} ${minutes} ${getMinutesWord(minutes)}`);
    },
    [
      calculateBatteryPercentage,
      getHoursWord,
      getMinutesWord,
      settingsBatteryCapacity,
      settingsMaxVoltage,
      settingsMinVoltage,
      t
    ]
  );

  useEffect(() => {
    calculateRemainingTime(volt, wat);
  }, [
    volt,
    wat,
    i18n.language,
    settingsMinVoltage,
    settingsMaxVoltage,
    settingsBatteryCapacity,
    settingsVoltageSystem,
    calculateRemainingTime
  ]);

  useEffect(() => {
    if (volt < Number(settingsMinVoltage)) {
      setVolError(t('calculator.minError', { value: settingsMinVoltage }));
    } else if (volt > Number(settingsMaxVoltage)) {
      setVolError(t('calculator.maxError', { value: settingsMaxVoltage }));
    } else {
      setVolError('');
    }

    if (wat < 0) {
      setWatError(t('calculator.lessZeroError'));
    } else {
      setWatError('');
    }
  }, [volt, settingsMinVoltage, settingsMaxVoltage, wat, t]);

  return {
    output,
    voltContext,
    watContext,
    percentage,
    settingsMinVoltage,
    settingsMaxVoltage,
    volError,
    watError
  };
};
