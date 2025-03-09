import React, { useState } from 'react';
import {
  SettingsModal,
  SettingsOverlay,
  Title,
  SettingsForm,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  CloseButton
} from './styles';
import { GameSettings } from '@/contexts/SettingsContext';
import { DEFAULT_SETTINGS } from '@/constants/gameConstants';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: GameSettings;
  onSave: (settings: GameSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, currentSettings, onSave }) => {
  const [settings, setSettings] = useState<GameSettings>(currentSettings);

  // Обработчик изменений в полях ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      setSettings({
        ...settings,
        [name]: numValue
      });
    }
  };

  // Обработчик сохранения настроек
  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  // Обработчик сброса настроек
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Если модальное окно не открыто, не рендерим его
  if (!isOpen) return null;

  return (
    <SettingsOverlay>
      <SettingsModal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Настройки игры</Title>
        
        <SettingsForm>
          <FormGroup>
            <Label htmlFor="ballSpeed">Скорость шайбы: {settings.ballSpeed}</Label>
            <Input
              type="range"
              id="ballSpeed"
              name="ballSpeed"
              min="1"
              max="20"
              step="1"
              value={settings.ballSpeed}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="computerSpeed">Скорость бота: {settings.computerSpeed}</Label>
            <Input
              type="range"
              id="computerSpeed"
              name="computerSpeed"
              min="1"
              max="20"
              step="1"
              value={settings.computerSpeed}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="computerDifficulty">Сложность бота: {settings.computerDifficulty}</Label>
            <Input
              type="range"
              id="computerDifficulty"
              name="computerDifficulty"
              min="1"
              max="5"
              step="1"
              value={settings.computerDifficulty}
              onChange={handleChange}
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button onClick={handleReset} type="button" secondary>
              Сбросить
            </Button>
            <Button onClick={handleSave} type="button">
              Сохранить
            </Button>
          </ButtonGroup>
        </SettingsForm>
      </SettingsModal>
    </SettingsOverlay>
  );
};

export default Settings; 