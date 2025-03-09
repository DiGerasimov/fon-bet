import { svgCache } from '../constants';

/**
 * Отрисовывает хоккейные ворота
 * @param ctx Контекст рендеринга канваса
 * @param x Позиция по X
 * @param y Позиция по Y
 * @param flipped Нужно ли перевернуть ворота
 */
export const drawHockeyGoal = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flipped: boolean
): void => {
  if (svgCache.goal) {
    ctx.save();
    
    // Position the goal
    ctx.translate(x, y);
    
    // Scale and flip if needed
    const goalWidth = 165; // Ширина ворот: 360 - 195 = 165
    const goalHeight = 50;
    
    if (flipped) {
      ctx.scale(1, -1);
    }
    
    // Apply common styling
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = flipped ? -5 : 5;
    
    // Draw the goal
    ctx.drawImage(
      svgCache.goal, 
      -goalWidth / 2, 
      flipped ? -goalHeight : -goalHeight,
      goalWidth, 
      goalHeight
    );
    
    ctx.restore();
  } else {
    // Fallback if SVG doesn't load
    ctx.save();
    ctx.translate(x, y);
    
    if (flipped) {
      ctx.scale(1, -1);
    }
    
    // Draw a simple goal shape
    ctx.beginPath();
    ctx.moveTo(-40, 0);
    ctx.lineTo(40, 0);
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.arc(0, 0, 40, Math.PI, 0, false);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
    
    ctx.restore();
  }
}; 