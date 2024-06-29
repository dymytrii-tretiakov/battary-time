import { ChangeEvent, useState, useEffect, KeyboardEvent } from 'react';

interface InputContext {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface UseApp {
  output: string;
  voltContext: InputContext;
  watContext: InputContext;
  percentage: number;
}

export const useApp = (): UseApp => {
  const [volt, setVolt] = useState<number>(54);
  const [wat, setWat] = useState<number>(300);
  const [output, setOutput] = useState<string>('2 часа 12 минут');
  const [percentage, setPercentage] = useState<number>(0);

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

  const calculateBatteryPercentage = (currentVoltage: number): number => {
    const maxVoltage = 54;
    const minVoltage = 44;
    const voltageRange = maxVoltage - minVoltage;

    // Calculate percentage based on voltage range
    const percentage = ((currentVoltage - minVoltage) / voltageRange) * 100;

    // Clamp percentage to range [0, 100]
    return Math.ceil(Math.max(0, Math.min(100, percentage)));
  };

  const calculateRemainingTime = (currentVoltage: number, powerConsumption: number): void => {
    if (!currentVoltage || !powerConsumption) {
      setOutput('Введите значение потребления');
      return;
    }

    if (currentVoltage > 54) {
      setOutput('Максимальное напряжение 54В');
      return;
    }

    if (currentVoltage < 44) {
      setOutput('Минимальное напряжение 44В');
      return;
    }

    if (powerConsumption < 0) {
      setOutput('Потребление не может быть отрицательным');
      return;
    }

    const batteryCapacityWh = 200 * 48; // Assuming 1000 Wh capacity for calculation
    const percentage = calculateBatteryPercentage(currentVoltage);
    const remainingCapacityWh = (percentage / 100) * batteryCapacityWh;

    const remainingTimeHours = remainingCapacityWh / powerConsumption;

    const hours = Math.floor(remainingTimeHours);
    const minutes = Math.round((remainingTimeHours - hours) * 60);

    setPercentage(percentage);

    if (remainingTimeHours < 0.1) {
      setOutput('Заряд батареи исчерпан');
      return;
    }

    setOutput(`${hours} ${getHoursWord(hours)} ${minutes} ${getMinutesWord(minutes)}`);
  };

  const getHoursWord = (hours: number): string => {
    const hoursCases = ['часов', 'час', 'часа', 'часа'];
    if (hours % 10 === 1 && hours % 100 !== 11) return hoursCases[1];
    if (hours % 10 >= 2 && hours % 10 <= 4 && (hours % 100 < 10 || hours % 100 >= 20))
      return hoursCases[2];
    return hoursCases[0];
  };

  const getMinutesWord = (minutes: number): string => {
    const minutesCases = ['минута', 'минуты', 'минут'];
    if (minutes % 10 === 1 && minutes % 100 !== 11) return minutesCases[0];
    if (minutes % 10 >= 2 && minutes % 10 <= 4 && (minutes % 100 < 10 || minutes % 100 >= 20))
      return minutesCases[1];
    return minutesCases[2];
  };

  useEffect(() => {
    calculateRemainingTime(volt, wat);
  }, [volt, wat]);

  return {
    output,
    voltContext,
    watContext,
    percentage
  };
};
