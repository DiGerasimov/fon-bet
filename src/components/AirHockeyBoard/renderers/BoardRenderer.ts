import { BoardDimensions } from '@/utils/types';
import { svgCache } from '../constants';

/**
 * Отрисовывает игровую доску с фоном хоккейного поля
 */
export const drawBoard = (ctx: CanvasRenderingContext2D, board: BoardDimensions): void => {
  // Рисуем ТОЛЬКО изображение поля в качестве фона (подложки)
  // Никаких дополнительных линий не добавляем
  if (svgCache.field) {
    ctx.drawImage(svgCache.field, 0, 0, board.width, board.height);
  } else {
    // Запасной вариант, если изображение не загрузилось
    // Белый фон
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, board.width, board.height);
  }
}; 