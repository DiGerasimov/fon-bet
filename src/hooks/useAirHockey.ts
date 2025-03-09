import { useEffect, useRef, useState, useCallback } from 'react';
import { GameState, BoardDimensions } from '@/utils/types';
import { useSettings } from '@/contexts/SettingsContext';

// Импортируем константы и утилиты
import { MALLET_RADIUS, CENTER_POINT } from '@/constants/gameConstants';
import { resetPuckToCenter, resetPuck } from '@/utils/puckUtils';
import { getActiveZoneBounds, checkRectanglePuckCollision } from '@/utils/collisionUtils';
import { updatePuckPhysics, calculatePuckRebound } from '@/utils/physics';
import { updateComputerPosition } from '@/utils/computerAI';
import { handlePlayerMovement } from '@/utils/playerControls';

export const useAirHockey = (canvasWidth: number, canvasHeight: number) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef(0);
  const scaleRef = useRef(1); // Добавляем ref для хранения текущего масштаба
  const { settings } = useSettings(); // Получаем настройки из контекста
  const isTouchDevice = useRef(false); // Определяем, является ли устройство сенсорным

  // Define board dimensions
  const board: BoardDimensions = {
    width: canvasWidth,
    height: canvasHeight,
    xMin: 0,
    xMax: canvasWidth,
    yMin: 0,
    yMax: canvasHeight,
    goalWidth: 165, // Ширина ворот определяется как 360 - 195 = 165
    centerY: canvasHeight / 2,
  };

  // Initialize game state
  const [gameState, setGameState] = useState({
    playerMallet: {
      position: { x: 279, y: 600 }, // X координата соответствует центру поля (279)
      radius: MALLET_RADIUS,
      color: '#F87217', // Orange
    },
    computerMallet: {
      position: { x: 279, y: 300 }, // X координата соответствует центру поля (279)
      radius: MALLET_RADIUS,
      color: '#ffdc00', // Yellow
    },
    puck: resetPuckToCenter(), // Используем центральную точку для начального положения шайбы
    playerScore: 0,
    computerScore: 0,
    gameActive: true,
  });

  // Метод для установки текущего масштаба
  const setScale = useCallback((scale: number) => {
    scaleRef.current = scale;
  }, []);

  // Update player mallet position based on mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current || isTouchDevice.current) return; // Не обрабатываем мышь на тач-устройствах
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Получаем фактический размер канваса после масштабирования
    const canvasDisplayWidth = rect.width;
    const canvasDisplayHeight = rect.height;
    
    // Вычисляем соотношение реального размера канваса к отображаемому
    const scaleX = canvasWidth / canvasDisplayWidth;
    const scaleY = canvasHeight / canvasDisplayHeight;
    
    // Вычисляем позицию мыши относительно канваса с учетом масштаба
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    setGameState((prev: GameState) => {
      const currentMallet = prev.playerMallet;
      const newPosition = handlePlayerMovement(mouseX, mouseY, currentMallet, board);
      
      return {
        ...prev,
        playerMallet: {
          ...currentMallet,
          position: newPosition
        }
      };
    });
  }, [board, canvasWidth, canvasHeight]);

  // Обработчик сенсорных событий
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!canvasRef.current) return;
    
    // Отмечаем, что устройство с сенсорным экраном
    isTouchDevice.current = true;
    
    // Предотвращаем прокрутку страницы при свайпе по игровой области
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Получаем фактический размер канваса после масштабирования
    const canvasDisplayWidth = rect.width;
    const canvasDisplayHeight = rect.height;
    
    // Вычисляем соотношение реального размера канваса к отображаемому
    const scaleX = canvasWidth / canvasDisplayWidth;
    const scaleY = canvasHeight / canvasDisplayHeight;
    
    // Получаем первое касание
    const touch = e.touches[0];
    
    // Вычисляем позицию касания относительно канваса с учетом масштаба
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;

    setGameState((prev: GameState) => {
      const currentMallet = prev.playerMallet;
      const newPosition = handlePlayerMovement(touchX, touchY, currentMallet, board);
      
      return {
        ...prev,
        playerMallet: {
          ...currentMallet,
          position: newPosition
        }
      };
    });
  }, [board, canvasWidth, canvasHeight]);

  // Update game state on each animation frame
  const updateGameState = useCallback((time: number) => {
    setGameState((prev: GameState) => {
      const { puck, playerMallet, computerMallet, playerScore, computerScore } = prev;
      
      // Обновляем физику шайбы и проверяем голы, используя скорость шайбы из настроек
      const { newPuck, newPlayerScore, newComputerScore } = updatePuckPhysics(
        puck,
        board,
        playerScore,
        computerScore,
        settings.ballSpeed // Передаем скорость шайбы из настроек
      );
      
      // Проверка столкновения с активной зоной клюшки игрока
      const playerActiveZone = getActiveZoneBounds(playerMallet, false);
      let updatedPuck = { ...newPuck };
      
      if (checkRectanglePuckCollision(playerActiveZone, updatedPuck)) {
        updatedPuck = calculatePuckRebound(updatedPuck, playerMallet, false);
      }
      
      // Проверка столкновения с активной зоной клюшки компьютера
      const computerActiveZone = getActiveZoneBounds(computerMallet, true);
      
      if (checkRectanglePuckCollision(computerActiveZone, updatedPuck)) {
        updatedPuck = calculatePuckRebound(updatedPuck, computerMallet, true);
      }
      
      // Обновляем положение клюшки компьютера, используя скорость и сложность из настроек
      const newComputerPosition = updateComputerPosition(
        computerMallet.position,
        updatedPuck,
        board,
        settings.computerSpeed, // Передаем скорость ИИ из настроек
        settings.computerDifficulty // Передаем сложность ИИ из настроек
      );
      
      return {
        ...prev,
        puck: updatedPuck,
        playerScore: newPlayerScore,
        computerScore: newComputerScore,
        computerMallet: {
          ...computerMallet,
          position: newComputerPosition
        }
      };
    });
    
    requestRef.current = requestAnimationFrame(updateGameState);
  }, [board, settings]); // Добавляем settings в зависимости, чтобы обновлять логику при изменении настроек

  // Start/stop the game animation
  useEffect(() => {
    if (gameState.gameActive) {
      requestRef.current = requestAnimationFrame(updateGameState);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState.gameActive, updateGameState]);

  // Set up mouse and touch event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Добавляем обработчики сенсорных событий
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.addEventListener('touchstart', handleTouchMove, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Удаляем обработчики сенсорных событий при размонтировании
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.removeEventListener('touchstart', handleTouchMove);
        canvas.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [handleMouseMove, handleTouchMove]);

  // Функция для программного сброса шайбы в центр
  const handleResetToCenter = useCallback(() => {
    setGameState((prev: GameState) => ({
      ...prev,
      puck: resetPuckToCenter()
    }));
  }, []);

  return {
    gameState,
    canvasRef,
    board,
    handleResetToCenter,
    setScale // Экспортируем новый метод
  };
}; 