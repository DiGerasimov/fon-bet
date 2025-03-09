import React, { createContext, useState, useContext } from 'react';
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
const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  updateSettings: (() => {}) as (newSettings: Partial<GameSettings>) => void,
  resetSettings: (() => {}) as () => void,
} as SettingsContextType);

// Пропсы для провайдера настроек
type SettingsProviderProps = {
  children: any;
}

// Провайдер контекста настроек
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS as GameSettings);

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