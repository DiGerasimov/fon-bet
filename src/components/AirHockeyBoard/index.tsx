import React, { useEffect, useRef, useState } from 'react';
import { useAirHockey } from '@/hooks/useAirHockey';
import { 
  GameContainer, 
  ResetButton, 
  ScoreBoard, 
  ScoreItem, 
  ScoreLabel, 
  ScoreValue, 
  StyledCanvas,
  ScoreBoardWrapper,
  SettingsButton,
  ButtonContainer,
  RankingButton,
  TeamButton,
  LogoWrapper,
  HistoryView,
  HistoryItem,
  GameLayout,
  CanvasContainer
} from './styles';
import { drawGame } from './renderers/GameRenderer';
import { loadImages } from './utils/ImageLoader';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import Settings from '../Settings';
import LeaderBoard from '../LeaderBoard';
import TeamSelector from '../TeamSelector';
import { useSettings } from '@/contexts/SettingsContext';
import { GameSettings } from '@/contexts/SettingsContext';
import Logo from '../Logo';
import SettingsMenu from '../SettingsMenu';
import { isMobileDevice, applyMobileOptimizations } from '@/utils/mobileDetect';
import styled from 'styled-components';

// Определяем интерфейс для наших свойств
interface GameOverlayProps {
  isVisible: boolean;
}

// Создаем компонент для затемнения экрана при открытии меню на мобильных устройствах
const GameOverlay = styled.div<GameOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 997;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

// История игровых событий
interface GameEvent {
  id: number;
  text: string;
  timestamp: Date;
}

/**
 * Компонент игры в аэрохоккей
 */
function AirHockeyBoard() {
  const { gameState, canvasRef, board, handleResetToCenter, setScale } = useAirHockey(CANVAS_WIDTH, CANVAS_HEIGHT);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [displayScale, setDisplayScale] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaderBoardOpen, setIsLeaderBoardOpen] = useState(false);
  const [isTeamSelectorOpen, setIsTeamSelectorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для отслеживания открытия меню
  // @ts-ignore
  const containerRef = useRef(null);
  const gameLayoutRef = useRef<HTMLDivElement>(null);
  const { settings, updateSettings } = useSettings();
  const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);
  const [isMobile, setIsMobile] = useState(false); // Определяем, является ли устройство мобильным

  // Определение мобильного устройства при инициализации и применение оптимизаций
  useEffect(() => {
    // Используем нашу утилиту для определения мобильных устройств
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    
    // Если устройство мобильное, применяем все оптимизации
    if (mobile) {
      applyMobileOptimizations();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!gameLayoutRef.current || !canvasRef.current) return;

      // Получаем размеры контейнера для игры
      const layoutRect = gameLayoutRef.current.getBoundingClientRect();
      
      // Высота лого и табло (примерная)
      const headerHeight = isMobile ? 120 : 160;
      
      // Доступная высота для canvas
      const availableHeight = layoutRect.height - headerHeight;
      const availableWidth = layoutRect.width;
      
      // Вычисляем масштаб по высоте и ширине
      const scaleByHeight = availableHeight / CANVAS_HEIGHT;
      const scaleByWidth = availableWidth / CANVAS_WIDTH;
      
      // Берем минимальный масштаб из двух, чтобы поле полностью помещалось на экран
      const newScale = Math.min(scaleByHeight, scaleByWidth, 1);
      
      // Дополнительно уменьшаем масштаб на мобильных устройствах для более удобной игры
      const mobileScaleFactor = isMobile ? 0.95 : 0.98;
      const adjustedScale = newScale * mobileScaleFactor;
      
      setDisplayScale(adjustedScale);
      setScale(adjustedScale); // Передаем масштаб в хук useAirHockey
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setScale, isMobile]);

  useEffect(() => {
    // Загружаем изображения при монтировании компонента
    loadImages()
      .then(() => setSvgLoaded(true))
      .catch(error => console.error('Failed to load images:', error));
  }, []);

  useEffect(() => {
    if (canvasRef.current && svgLoaded) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        contextRef.current = context;
        drawGame(context, gameState, board, settings.teamId);
      }
    }
  }, [gameState, board, svgLoaded, settings.teamId]);

  useEffect(() => {
    // Отслеживаем изменения счета для добавления в историю
    if (gameState.lastScorer) {
      const newEvent: GameEvent = {
        id: Date.now(),
        text: `${gameState.lastScorer === 'player' ? 'Игрок' : 'Компьютер'} забил гол!`,
        timestamp: new Date()
      };
      
      setGameEvents(prev => [newEvent, ...prev].slice(0, 5)); // Храним только 5 последних событий
    }
  }, [gameState.playerScore, gameState.computerScore]);

  // Форматирование времени для истории
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Функция для открытия модального окна настроек
  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsMenuOpen(false); // Закрываем меню при открытии настроек
  };

  // Функция для закрытия модального окна настроек
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  // Функция для сохранения настроек
  const handleSaveSettings = (newSettings: GameSettings) => {
    updateSettings(newSettings);
  };

  // Функция для открытия модального окна таблицы лидеров
  const handleOpenLeaderBoard = () => {
    setIsLeaderBoardOpen(true);
    setIsMenuOpen(false); // Закрываем меню при открытии таблицы лидеров
  };

  // Функция для закрытия модального окна таблицы лидеров
  const handleCloseLeaderBoard = () => {
    setIsLeaderBoardOpen(false);
  };

  // Функция для открытия модального окна выбора команды
  const handleOpenTeamSelector = () => {
    setIsTeamSelectorOpen(true);
    setIsMenuOpen(false); // Закрываем меню при открытии выбора команды
  };

  // Функция для закрытия модального окна выбора команды
  const handleCloseTeamSelector = () => {
    setIsTeamSelectorOpen(false);
  };

  // Функция для сохранения выбранной команды
  const handleSaveTeam = (teamId: string) => {
    updateSettings({ teamId });
  };

  // Функция для сброса мяча в центр и закрытия меню
  const handleResetAndCloseMenu = () => {
    handleResetToCenter();
    setIsMenuOpen(false); // Закрываем меню при сбросе мяча
  };

  // Функция для отслеживания состояния меню
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  // Добавляем мета-тег через DOM API вместо Head из Next.js
  useEffect(() => {
    // Добавляем мета-тег viewport для предотвращения масштабирования на мобильных устройствах
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    // Проверяем, есть ли уже такой мета-тег
    const existingMeta = document.querySelector('meta[name="viewport"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', viewportMeta.content);
    } else {
      document.head.appendChild(viewportMeta);
    }
    
    // Удаляем мета-тег при размонтировании компонента
    return () => {
      if (viewportMeta.parentNode === document.head) {
        document.head.removeChild(viewportMeta);
      }
    };
  }, []);

  return (
    <GameContainer ref={containerRef}>
      {isMobile && <GameOverlay isVisible={isMenuOpen || isSettingsOpen || isLeaderBoardOpen || isTeamSelectorOpen} />}
      
      <GameLayout ref={gameLayoutRef}>
        {/* Логотип всегда сверху */}
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        
        {/* Счет и кнопка меню под логотипом */}
        <ScoreBoardWrapper>
          <ScoreBoard>
            <ScoreItem>
              <ScoreLabel>Компьютер</ScoreLabel>
              <ScoreValue>{gameState.computerScore}</ScoreValue>
            </ScoreItem>
            <ScoreItem>
              <ScoreLabel>Игрок</ScoreLabel>
              <ScoreValue>{gameState.playerScore}</ScoreValue>
            </ScoreItem>
          </ScoreBoard>
          <ButtonContainer>
            <SettingsMenu 
              onOpenSettings={handleOpenSettings}
              onOpenLeaderBoard={handleOpenLeaderBoard}
              onOpenTeamSelector={handleOpenTeamSelector}
              onResetToCenter={handleResetAndCloseMenu}
              onMenuToggle={handleMenuToggle}
            />
            
            {/* Скрытые кнопки для обратной совместимости */}
            <SettingsButton onClick={handleOpenSettings}>
              Настройки
            </SettingsButton>
            <TeamButton onClick={handleOpenTeamSelector}>
              Команда
            </TeamButton>
            <RankingButton onClick={handleOpenLeaderBoard}>
              Рейтинг
            </RankingButton>
          </ButtonContainer>
        </ScoreBoardWrapper>
        
        {/* Контейнер для игрового поля, занимающий все доступное пространство */}
        <CanvasContainer>
          <StyledCanvas 
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{ 
              width: `${CANVAS_WIDTH * displayScale}px`, 
              height: `${CANVAS_HEIGHT * displayScale}px`,
              touchAction: "none" // Предотвращаем стандартные действия браузера при касании
            }}
          />
          
          {gameEvents.length > 0 && (
            <HistoryView>
              {gameEvents.map((event: GameEvent) => (
                <HistoryItem key={event.id}>
                  <span>{formatTime(event.timestamp)}</span> - {event.text}
                </HistoryItem>
              ))}
            </HistoryView>
          )}
        </CanvasContainer>
      </GameLayout>

      <Settings
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        currentSettings={settings}
        onSave={handleSaveSettings}
      />

      <TeamSelector
        isOpen={isTeamSelectorOpen}
        onClose={handleCloseTeamSelector}
        currentTeam={settings.teamId}
        onSave={handleSaveTeam}
      />

      <LeaderBoard
        isOpen={isLeaderBoardOpen}
        onClose={handleCloseLeaderBoard}
        playerScore={gameState.playerScore}
        computerScore={gameState.computerScore}
      />
    </GameContainer>
  );
}

export default AirHockeyBoard; 