import React, { useState, useEffect } from 'react';
import {
  LeaderboardModal,
  LeaderboardOverlay,
  Title,
  CloseButton,
  LeaderboardTable,
  LeaderboardHeader,
  HeaderItem,
  LeaderboardRow,
  RowItem,
  PlayerName,
  PlayerTeam,
  Rank,
  Score,
  ButtonGroup,
  Button,
  TabContainer,
  Tab,
  EmptyState
} from './styles';
import styled from 'styled-components';

// Создаем компонент обертки с горизонтальной прокруткой для очень маленьких экранов
const TableWrapper = styled.div`
  @media (max-width: 350px) {
    overflow-x: auto;
    padding-bottom: 5px;
    
    /* Стилизуем скроллбар */
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #d42a28;
      border-radius: 10px;
    }
  }
`;

export interface PlayerData {
  id: number;
  name: string;
  score: number;
  rank: number;
  playerGoals: number;
  botGoals: number;
  team: string;
}

interface LeaderBoardProps {
  isOpen: boolean;
  onClose: () => void;
  playerScore?: number;
  computerScore?: number;
}

// Названия команд
const teamNames = {
  'team1': 'Красные Медведи',
  'team2': 'Синие Акулы',
  'team3': 'Зелёные Драконы',
  'team4': 'Золотые Орлы'
};

const LeaderBoard = ({ isOpen, onClose, playerScore = 0, computerScore = 0 }) => {
  // Активная вкладка: 'season' или 'all-time'
  const [activeTab, setActiveTab] = useState('season');
  const [isMobile, setIsMobile] = useState(false);
  
  // Проверяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth <= 480;
    };
    
    setIsMobile(checkMobile());
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Данные о 10 лучших игроках с фиксированными командами
  const topPlayers: PlayerData[] = [
    { id: 1, name: "Александр", score: 157, rank: 1, playerGoals: 157, botGoals: 89, team: 'team2' },
    { id: 2, name: "Дмитрий", score: 142, rank: 2, playerGoals: 142, botGoals: 78, team: 'team4' },
    { id: 3, name: "Мария", score: 136, rank: 3, playerGoals: 136, botGoals: 104, team: 'team3' },
    { id: 4, name: "Евгений", score: 124, rank: 4, playerGoals: 124, botGoals: 68, team: 'team1' },
    { id: 5, name: "Наталья", score: 119, rank: 5, playerGoals: 119, botGoals: 92, team: 'team2' },
    { id: 6, name: "Иван", score: 112, rank: 6, playerGoals: 112, botGoals: 75, team: 'team3' },
    { id: 7, name: "Сергей", score: 103, rank: 7, playerGoals: 103, botGoals: 84, team: 'team1' },
    { id: 8, name: "Елена", score: 98, rank: 8, playerGoals: 98, botGoals: 71, team: 'team4' },
    { id: 9, name: "Андрей", score: 92, rank: 9, playerGoals: 92, botGoals: 63, team: 'team3' },
    { id: 10, name: "Ольга", score: 87, rank: 10, playerGoals: 87, botGoals: 59, team: 'team2' }
  ];
  
  // Данные текущего пользователя с фиксированным рейтингом
  const currentUser: PlayerData = {
    id: 0,
    name: "Вы",
    score: playerScore,
    rank: 15,
    playerGoals: playerScore,
    botGoals: computerScore,
    team: 'team1' // Предположим, что это выбранная команда пользователя
  };
  
  // Если модальное окно не открыто, не рендерим его
  if (!isOpen) return null;

  return (
    <LeaderboardOverlay>
      <LeaderboardModal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Таблица лидеров</Title>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'season'} 
            onClick={() => setActiveTab('season')}
          >
            Текущий сезон
          </Tab>
          <Tab 
            active={activeTab === 'all-time'} 
            onClick={() => setActiveTab('all-time')}
          >
            За все время
          </Tab>
        </TabContainer>
        
        <TableWrapper>
          <LeaderboardTable>
            <LeaderboardHeader>
              <HeaderItem>№</HeaderItem>
              <HeaderItem>{isMobile ? 'Имя' : 'Игрок'}</HeaderItem>
              <HeaderItem>Счёт</HeaderItem>
              <HeaderItem>{isMobile ? '⚽' : 'Забито'}</HeaderItem>
              <HeaderItem>{isMobile ? '⛔' : 'Пропущено'}</HeaderItem>
            </LeaderboardHeader>
            
            {/* Топ-10 игроков */}
            {topPlayers.map(player => (
              <LeaderboardRow key={player.id}>
                <RowItem>
                  <Rank rank={player.rank}>{player.rank}</Rank>
                </RowItem>
                <RowItem>
                  <PlayerName>{player.name}</PlayerName>
                  <PlayerTeam>{teamNames[player.team as keyof typeof teamNames]}</PlayerTeam>
                </RowItem>
                <RowItem>
                  <Score>{player.score}</Score>
                </RowItem>
                <RowItem>{player.playerGoals}</RowItem>
                <RowItem>{player.botGoals}</RowItem>
              </LeaderboardRow>
            ))}
            
            {/* Текущий пользователь */}
            <LeaderboardRow isCurrentUser={true}>
              <RowItem>
                <Rank rank={currentUser.rank}>{currentUser.rank}</Rank>
              </RowItem>
              <RowItem>
                <PlayerName>{currentUser.name}</PlayerName>
                <PlayerTeam>{teamNames[currentUser.team as keyof typeof teamNames]}</PlayerTeam>
              </RowItem>
              <RowItem>
                <Score>{currentUser.score}</Score>
              </RowItem>
              <RowItem>{currentUser.playerGoals}</RowItem>
              <RowItem>{currentUser.botGoals}</RowItem>
            </LeaderboardRow>
          </LeaderboardTable>
        </TableWrapper>
        
        <ButtonGroup>
          <Button onClick={onClose}>
            Закрыть
          </Button>
        </ButtonGroup>
      </LeaderboardModal>
    </LeaderboardOverlay>
  );
};

export default LeaderBoard; 