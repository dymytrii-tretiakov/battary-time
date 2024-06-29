import { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';

interface Settings {
  minVoltage: number;
  maxVoltage: number;
  setMinVoltage: (voltage: number) => void;
  setMaxVoltage: (voltage: number) => void;
  batteryCapacity: number;
  setBatteryCapacity: (capacity: number) => void;
  voltageSystem: number;
  setVoltageSystem: (voltage: number) => void;

  settingsVisible: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useSettings = (): Settings => {
  const {
    minVoltage,
    maxVoltage,
    batteryCapacity,
    voltageSystem,
    setBatteryCapacity,
    setMaxVoltage,
    setMinVoltage,
    setVoltageSystem
  } = useSettingsStore();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const openSettings = () => {
    setSettingsVisible(true);
  };

  const closeSettings = () => {
    setSettingsVisible(false);
  };

  return {
    minVoltage,
    maxVoltage,
    setMinVoltage,
    setMaxVoltage,
    batteryCapacity,
    setBatteryCapacity,
    voltageSystem,
    setVoltageSystem,
    settingsVisible,
    openSettings,
    closeSettings
  };
};
