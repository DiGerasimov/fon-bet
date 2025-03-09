import { svgCache } from '../constants';

/**
 * Отрисовывает шайбу
 * @param ctx Контекст рендеринга канваса
 * @param x Позиция по X
 * @param y Позиция по Y
 * @param radius Радиус шайбы
 */
export const drawPuck = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void => {
  if (svgCache.puck) {
    ctx.save();
    
    // Apply common styling for consistency with sticks
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Draw the puck image
    ctx.drawImage(
      svgCache.puck, 
      x - radius * 1.2, 
      y - radius * 0.6, 
      radius * 2.4, 
      radius * 1.2
    );
    
    ctx.restore();
  } else {
    // Fallback if SVG doesn't load
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    
    // Add some detail to the puck
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  }
}; 