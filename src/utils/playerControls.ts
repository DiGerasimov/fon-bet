import { BoardDimensions, GameState, Mallet } from '@/utils/types';
import { CENTER_POINT, ACTIVE_ZONE } from '@/constants/gameConstants';

/**
 * Обрабатывает движение мыши и обновляет позицию игрока
 * Позиция задается таким образом, чтобы малетка следовала точно за курсором мыши
 */
export const handlePlayerMovement = (
  mouseX: number,
  mouseY: number,
  currentMallet: Mallet,
  board: BoardDimensions
): { x: number; y: number } => {  
  // Теперь мы хотим, чтобы центр малетки был точно в позиции курсора
  // Это сделает управление более интуитивным и прямым
  let newX = mouseX;
  let newY = mouseY;
  
  // Проверяем границы поля для малетки с учетом её радиуса
  const minX = board.xMin + currentMallet.radius;
  const maxX = board.xMax - currentMallet.radius;
  const minY = CENTER_POINT.y + 10; // Ограничиваем движение по вертикали от центральной линии
  const maxY = board.yMax - currentMallet.radius;
  
  // Ограничиваем движение малетки границами поля
  if (newX < minX) newX = minX;
  if (newX > maxX) newX = maxX;
  if (newY < minY) newY = minY;
  if (newY > maxY) newY = maxY;
  
  return { x: newX, y: newY };
}; 