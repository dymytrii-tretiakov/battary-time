import { useEffect, useState } from 'react';
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
  handleTitleClick: () => void;
  titleWiggle: boolean;

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
  const [titleWiggle, setTitleWiggle] = useState(false);

  // Close settings by swipe left to right
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - x;
      const deltaY = touch.clientY - y;

      if (deltaX > 100 && Math.abs(deltaY) < 100) {
        setSettingsVisible(false);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const openSettings = () => {
    setSettingsVisible(true);
  };

  const closeSettings = () => {
    setSettingsVisible(false);
  };

  const handleTitleClick = () => {
    const audio = new Audio('/audio/electric.mp3');

    audio.play();
    setTitleWiggle(true);
    setTimeout(() => setTitleWiggle(false), 800);
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
    closeSettings,
    handleTitleClick,
    titleWiggle
  };
};
