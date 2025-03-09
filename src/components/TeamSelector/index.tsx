import React, { useState } from 'react';
import {
  TeamSelectorModal,
  TeamSelectorOverlay,
  Title,
  TeamsContainer,
  TeamCard,
  TeamLogo,
  TeamName,
  TeamDescription,
  CloseButton,
  ButtonGroup,
  Button,
  EmptyState
} from './styles';

// Интерфейс для информации о команде
export interface TeamInfo {
  id: string;
  name: string;
  color: string;
  iconPath: string;
  rating: number;
}

// Массив с информацией о доступных командах
export const AVAILABLE_TEAMS: TeamInfo[] = [
  { 
    id: 'team1', 
    name: 'Красные Медведи', 
    color: '#FF4136',
    iconPath: '/styles/icons/хокеист.svg',
    rating: 696
  },
  { 
    id: 'team2', 
    name: 'Синие Акулы', 
    color: '#0074D9',
    iconPath: '/styles/icons/хокеист-синий.svg',
    rating: 1289
  },
  { 
    id: 'team3', 
    name: 'Зелёные Драконы', 
    color: '#2ECC40',
    iconPath: '/styles/icons/хокеист-зеленый.svg',
    rating: 1474
  },
  { 
    id: 'team4', 
    name: 'Золотые Орлы', 
    color: '#FFDC00',
    iconPath: '/styles/icons/хокеист-желтый.svg',
    rating: 720
  },
];

interface TeamSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentTeam: string;
  onSave: (teamId: string) => void;
}

const TeamSelector = ({ 
  isOpen, 
  onClose, 
  currentTeam, 
  onSave 
}: TeamSelectorProps) => {
  const [selectedTeam, setSelectedTeam] = useState(currentTeam);
  const [teamIcons, setTeamIcons] = useState<{[key: string]: string}>({});

  // Обработчик выбора команды
  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
  };

  // Обработчик сохранения выбора
  const handleSave = () => {
    onSave(selectedTeam);
    onClose();
  };

  // Если модальное окно не открыто, не рендерим его
  if (!isOpen) return null;

  return (
    <TeamSelectorOverlay>
      <TeamSelectorModal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Выбор команды</Title>
        
        <TeamsContainer>
          {AVAILABLE_TEAMS.map((team) => (
            <TeamCard 
              key={team.id}
              selected={selectedTeam === team.id}
              onClick={() => handleTeamSelect(team.id)}
            >
              <TeamLogo style={{ backgroundColor: team.color }}>
                <img 
                  src={team.iconPath}
                  alt={team.name}
                  width="60"
                  height="60"
                />
              </TeamLogo>
              <TeamName>{team.name}</TeamName>
              <TeamDescription>Команда с рейтингом {team.rating}</TeamDescription>
            </TeamCard>
          ))}
        </TeamsContainer>
        
        <ButtonGroup>
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </ButtonGroup>
      </TeamSelectorModal>
    </TeamSelectorOverlay>
  );
};

export default TeamSelector; 