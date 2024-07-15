import { create } from 'zustand';

type SettingsStore = {
  minVoltage: number;
  maxVoltage: number;
  batteryCapacity: number;
  voltageSystem: number;
  setMinVoltage: (voltage: number) => void;
  setMaxVoltage: (voltage: number) => void;
  setBatteryCapacity: (capacity: number) => void;
  setVoltageSystem: (voltage: number) => void;
};

export const useSettingsStore = create<SettingsStore>(set => ({
  minVoltage: Number(localStorage.getItem('minVoltage')) || 44,
  maxVoltage: Number(localStorage.getItem('maxVoltage')) || 52,
  batteryCapacity: Number(localStorage.getItem('batteryCapacity')) || 200,
  voltageSystem: Number(localStorage.getItem('voltageSystem')) || 48,
  setMinVoltage: (voltage: number) => {
    set({ minVoltage: voltage });
    localStorage.setItem('minVoltage', voltage.toString());
  },
  setMaxVoltage: (voltage: number) => {
    set({ maxVoltage: voltage });
    localStorage.setItem('maxVoltage', voltage.toString());
  },
  setBatteryCapacity: (capacity: number) => {
    set({ batteryCapacity: capacity });
    localStorage.setItem('batteryCapacity', capacity.toString());
  },
  setVoltageSystem: (voltage: number) => {
    set({ voltageSystem: voltage });
    localStorage.setItem('voltageSystem', voltage.toString());
  }
}));
