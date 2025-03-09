import { Puck, BoardDimensions, Mallet } from '@/utils/types';
import { FRICTION, BALL_SPEED } from '@/constants/gameConstants';
import { resetPuck, resetPuckToPlayerHalf } from './puckUtils';

/**
 * Обновляет позицию и скорость шайбы на основе физики и проверяет голы
 */
export const updatePuckPhysics = (
  puck: Puck,
  board: BoardDimensions,
  playerScore: number,
  computerScore: number,
  ballSpeed: number = BALL_SPEED // Добавляем параметр скорости шайбы с значением по умолчанию
): {
  newPuck: Puck;
  newPlayerScore: number;
  newComputerScore: number;
} => {
  let newPuck = { ...puck };
  let newPlayerScore = playerScore;
  let newComputerScore = computerScore;
  
  // Применяем скорость шайбы из настроек
  const speedMultiplier = ballSpeed / BALL_SPEED;
  
  // Move puck based on velocity with speed multiplier
  newPuck.position.x += newPuck.velocity.x * speedMultiplier;
  newPuck.position.y += newPuck.velocity.y * speedMultiplier;
  
  // Apply friction
  newPuck.velocity.x *= FRICTION;
  newPuck.velocity.y *= FRICTION;
  
  // Bounce off side walls
  if (
    newPuck.position.x + newPuck.radius > board.xMax ||
    newPuck.position.x - newPuck.radius < board.xMin
  ) {
    newPuck.velocity.x *= -1;
    
    // Убедимся, что шайба не застрянет в стене
    if (newPuck.position.x + newPuck.radius > board.xMax) {
      newPuck.position.x = board.xMax - newPuck.radius;
    }
    if (newPuck.position.x - newPuck.radius < board.xMin) {
      newPuck.position.x = board.xMin + newPuck.radius;
    }
  }
  
  // Goal logic and top/bottom wall bouncing
  const inGoalXRange = 
    newPuck.position.x > 195 && // Left goal post at x=195
    newPuck.position.x < 360;   // Right goal post at x=360
  
  // Проверка на гол в ворота компьютера (верхняя часть поля)
  if (newPuck.position.y - newPuck.radius < board.yMin) {
    if (inGoalXRange) {
      // Гол игрока
      newPlayerScore++;
      // Размещаем шайбу на стороне компьютера (проигравшего)
      newPuck = resetPuckToPlayerHalf(board, false);
    } else {
      // Отскок от верхней стены
      newPuck.velocity.y *= -1;
      newPuck.position.y = board.yMin + newPuck.radius;
    }
  }
  
  // Проверка на гол в ворота игрока (нижняя часть поля)
  if (newPuck.position.y + newPuck.radius > board.yMax) {
    if (inGoalXRange) {
      // Гол компьютера
      newComputerScore++;
      // Размещаем шайбу на стороне игрока (проигравшего)
      newPuck = resetPuckToPlayerHalf(board, true);
    } else {
      // Отскок от нижней стены
      newPuck.velocity.y *= -1;
      newPuck.position.y = board.yMax - newPuck.radius;
    }
  }
  
  return {
    newPuck,
    newPlayerScore,
    newComputerScore
  };
};

/**
 * Рассчитывает новую скорость шайбы после столкновения с клюшкой
 */
export const calculatePuckRebound = (
  puck: Puck,
  mallet: Mallet,
  isComputer: boolean
): Puck => {
  const updatedPuck = { ...puck };
  
  // Вычисляем вектор от центра клюшки к центру шайбы
  const dx = puck.position.x - mallet.position.x;
  const dy = puck.position.y - mallet.position.y;
  
  // Нормализуем вектор
  const length = Math.sqrt(dx * dx + dy * dy);
  const normalizedDx = dx / length;
  const normalizedDy = dy / length;
  
  // Базовая скорость отскока
  const baseSpeed = 10;
  
  // Добавляем скорость в направлении от клюшки
  updatedPuck.velocity.x = normalizedDx * baseSpeed;
  updatedPuck.velocity.y = normalizedDy * baseSpeed;
  
  // Добавляем небольшую случайность для более реалистичного отскока
  updatedPuck.velocity.x += (Math.random() - 0.5) * 2;
  updatedPuck.velocity.y += (Math.random() - 0.5) * 2;
  
  return updatedPuck;
}; 