import { svgCache, ACTIVE_ZONE, TEAM_TO_STICK_MAP } from '../constants';

/**
 * Отрисовывает клюшку (малетку) с активной зоной
 * @param ctx Контекст рендеринга канваса
 * @param x Позиция по X
 * @param y Позиция по Y
 * @param radius Радиус малетки
 * @param color Цвет малетки
 * @param mirror Нужно ли отразить малетку (для компьютера)
 * @param teamId ID выбранной команды (опционально)
 */
export const drawMallet = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  mirror: boolean,
  teamId?: string
): void => {
  // Рассчитываем размеры и положение активной зоны
  const activeX = x + (mirror ? -1 : 1) * (radius * ACTIVE_ZONE.offsetX);
  const activeY = y + (radius * ACTIVE_ZONE.offsetY);
  const activeWidth = radius * ACTIVE_ZONE.width;
  const activeHeight = radius * ACTIVE_ZONE.height;
  
  // Определяем, какое изображение клюшки использовать
  let stickImage = svgCache.stick; // По умолчанию красная клюшка
  
  // Для игрока (не mirror) используем клюшку выбранной команды
  if (!mirror && teamId && TEAM_TO_STICK_MAP[teamId]) {
    const teamStickKey = TEAM_TO_STICK_MAP[teamId];
    if (svgCache[teamStickKey] && svgCache[teamStickKey].complete) {
      stickImage = svgCache[teamStickKey];
    }
  }
  
  // Проверяем наличие изображения
  if (stickImage && stickImage.complete) {
    ctx.save();
    
    // Position the stick at the mallet position
    ctx.translate(x, y);
    
    // Mirror for the opponent
    if (mirror) {
      ctx.scale(-1, 1);
    }
    
    // Apply common styling with reduced opacity for the stick image
    ctx.globalAlpha = 0.6; // Делаем прозрачным
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Draw the stick
    ctx.drawImage(stickImage, -radius * 1.5, -radius * 1.5, radius * 3, radius * 3);
    ctx.restore();
  } else {
    // Fallback in case SVG doesn't load
    ctx.save();
    
    // Рисуем круг с низкой непрозрачностью
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}; 