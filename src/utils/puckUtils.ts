import { BoardDimensions, Puck } from '@/utils/types';
import { PUCK_RADIUS, CENTER_POINT } from '@/constants/gameConstants';

/**
 * Сбрасывает шайбу в центр поля
 */
export const resetPuckToCenter = (): Puck => {
  return {
    position: { ...CENTER_POINT },
    velocity: { x: 0, y: 0 },
    radius: PUCK_RADIUS
  };
};

/**
 * Сбрасывает шайбу в случайную позицию
 */
export const resetPuck = (): Puck => {
  // Создаем новую шайбу в центре поля
  const newPuck = resetPuckToCenter();
  
  // Добавляем небольшую случайную скорость для начального движения
  newPuck.velocity = {
    x: (Math.random() - 0.5) * 5, // Случайная скорость по X от -2.5 до 2.5
    y: (Math.random() - 0.5) * 5  // Случайная скорость по Y от -2.5 до 2.5
  };
  
  return newPuck;
};

// Reset the puck to player or computer half after a goal
export const resetPuckToPlayerHalf = (board: BoardDimensions, isPlayerHalf: boolean): Puck => {
  // Координаты для появления шайбы
  // Центр поля: (279,505)
  // Две точки у игрока: (124,826) и (435,828)
  // Две точки у робота: (123,189) и (431,184)
  
  let x: number;
  let y: number;
  
  if (isPlayerHalf) {
    // Шайба появляется в одной из двух точек на стороне игрока (случайный выбор)
    if (Math.random() < 0.5) {
      x = 124; // Левая точка
      y = 826;
    } else {
      x = 435; // Правая точка
      y = 828;
    }
  } else {
    // Шайба появляется в одной из двух точек на стороне робота (случайный выбор)
    if (Math.random() < 0.5) {
      x = 123; // Левая точка
      y = 189;
    } else {
      x = 431; // Правая точка
      y = 184;
    }
  }
  
  return {
    position: {
      x,
      y,
    },
    radius: PUCK_RADIUS,
    velocity: { x: 0, y: 0 },
  };
}; 