import { Mallet, Puck } from '@/utils/types';
import { ACTIVE_ZONE } from '@/constants/gameConstants';

// Получение размеров и позиции активной зоны клюшки
export const getActiveZoneBounds = (
  mallet: Mallet,
  isComputer: boolean
) => {
  const malletAngle = isComputer ? Math.PI : 0;
  
  const activeZoneX = mallet.position.x + Math.cos(malletAngle) * mallet.radius * ACTIVE_ZONE.offsetX;
  const activeZoneY = mallet.position.y + Math.sin(malletAngle) * mallet.radius * ACTIVE_ZONE.offsetY;
  const activeZoneWidth = mallet.radius * ACTIVE_ZONE.width;
  const activeZoneHeight = mallet.radius * ACTIVE_ZONE.height;
  
  return {
    x: activeZoneX,
    y: activeZoneY,
    width: activeZoneWidth,
    height: activeZoneHeight,
    halfWidth: activeZoneWidth / 2,
    halfHeight: activeZoneHeight / 2,
    left: activeZoneX - activeZoneWidth / 2,
    right: activeZoneX + activeZoneWidth / 2,
    top: activeZoneY - activeZoneHeight / 2,
    bottom: activeZoneY + activeZoneHeight / 2
  };
};

// Проверка столкновения шайбы с прямоугольной активной зоной клюшки
export const checkRectanglePuckCollision = (
  rect: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    x: number;
    y: number;
  },
  puck: Puck
): boolean => {
  // Найдем ближайшую точку прямоугольника к центру шайбы
  const closestX = Math.max(rect.left, Math.min(puck.position.x, rect.right));
  const closestY = Math.max(rect.top, Math.min(puck.position.y, rect.bottom));
  
  // Рассчитаем расстояние от этой точки до центра шайбы
  const distanceX = puck.position.x - closestX;
  const distanceY = puck.position.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;
  
  // Если расстояние меньше радиуса шайбы, значит есть столкновение
  return distanceSquared < (puck.radius * puck.radius);
}; 