import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DEFAULT_SETTINGS } from '@/constants/gameConstants';

// Интерфейс для настроек
export interface GameSettings {
  ballSpeed: number;
  computerSpeed: number;
  computerDifficulty: number;
  teamId: string;
}

// Интерфейс для контекста настроек
interface SettingsContextType {
  settings: GameSettings;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  resetSettings: () => void;
}

// Создаем контекст с значениями по умолчанию
const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  updateSettings: () => {},
  resetSettings: () => {},
});

// Пропсы для провайдера настроек
interface SettingsProviderProps {
  children: React.ReactNode;
}

// Провайдер контекста настроек
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  // Функция для обновления настроек
  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prevSettings: GameSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  // Функция для сброса настроек к значениям по умолчанию
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Хук для использования контекста настроек
export const useSettings = () => useContext(SettingsContext); 