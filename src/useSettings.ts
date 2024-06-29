import { useEffect, useState } from 'react';

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
  const [minVoltage, setMinVoltage] = useState(44);
  const [maxVoltage, setMaxVoltage] = useState(54);
  const [batteryCapacity, setBatteryCapacity] = useState(200);
  const [voltageSystem, setVoltageSystem] = useState(48);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const minVoltage = localStorage.getItem('minVoltage');
    const maxVoltage = localStorage.getItem('maxVoltage');
    const batteryCapacity = localStorage.getItem('batteryCapacity');
    const voltageSystem = localStorage.getItem('voltageSystem');

    if (minVoltage) setMinVoltage(Number(minVoltage));
    else localStorage.setItem('minVoltage', '44');

    if (maxVoltage) setMaxVoltage(Number(maxVoltage));
    else localStorage.setItem('maxVoltage', '54');

    if (batteryCapacity) setBatteryCapacity(Number(batteryCapacity));
    else localStorage.setItem('batteryCapacity', '200');

    if (voltageSystem) setVoltageSystem(Number(voltageSystem));
    else localStorage.setItem('voltageSystem', '48');
  }, []);

  const handleSetMinVoltage = (voltage: number) => {
    setMinVoltage(voltage);
    localStorage.setItem('minVoltage', voltage.toString());
  };

  const handleSetMaxVoltage = (voltage: number) => {
    setMaxVoltage(voltage);
    localStorage.setItem('maxVoltage', voltage.toString());
  };

  const handleSetBatteryCapacity = (capacity: number) => {
    setBatteryCapacity(capacity);
    localStorage.setItem('batteryCapacity', capacity.toString());
  };

  const handleSetVoltageSystem = (voltage: number) => {
    setVoltageSystem(voltage);
    localStorage.setItem('voltageSystem', voltage.toString());
  };

  const openSettings = () => {
    setSettingsVisible(true);
  };

  const closeSettings = () => {
    setSettingsVisible(false);
  };

  return {
    minVoltage,
    maxVoltage,
    setMinVoltage: handleSetMinVoltage,
    setMaxVoltage: handleSetMaxVoltage,
    batteryCapacity,
    setBatteryCapacity: handleSetBatteryCapacity,
    voltageSystem,
    setVoltageSystem: handleSetVoltageSystem,
    settingsVisible,
    openSettings,
    closeSettings
  };
};
