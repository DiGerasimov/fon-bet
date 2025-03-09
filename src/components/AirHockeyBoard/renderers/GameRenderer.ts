import { BoardDimensions, GameState } from '@/utils/types';
import { drawBoard } from './BoardRenderer';
import { drawHockeyGoal } from './GoalRenderer';
import { drawMallet } from './MalletRenderer';
import { drawPuck } from './PuckRenderer';

/**
 * Отрисовывает всю игру целиком
 * @param ctx Контекст рендеринга канваса
 * @param gameState Состояние игры
 * @param board Размеры игровой доски
 * @param teamId ID выбранной команды
 */
export const drawGame = (
  ctx: CanvasRenderingContext2D, 
  gameState: GameState, 
  board: BoardDimensions,
  teamId?: string
): void => {
  // Clear canvas
  ctx.clearRect(0, 0, board.width, board.height);
  
  // Draw the board
  drawBoard(ctx, board);
  
  // Draw goals
  // Ворота робота (верхние): координаты (195,42)-(360,42) 
  // Средняя точка ворот по X = (195 + 360) / 2 = 277.5
  drawHockeyGoal(ctx, 277.5, 42, false);
  
  // Ворота игрока (нижние): координаты (195,977)-(360,977)
  // Средняя точка ворот по X = (195 + 360) / 2 = 277.5
  drawHockeyGoal(ctx, 277.5, 977, true);
  
  // Draw player's stick/mallet
  drawMallet(
    ctx, 
    gameState.playerMallet.position.x, 
    gameState.playerMallet.position.y, 
    gameState.playerMallet.radius, 
    gameState.playerMallet.color,
    false,
    teamId
  );
  
  // Draw computer's stick/mallet - mirrored
  drawMallet(
    ctx, 
    gameState.computerMallet.position.x, 
    gameState.computerMallet.position.y, 
    gameState.computerMallet.radius, 
    gameState.computerMallet.color,
    true // Mirror for opponent
  );
  
  // Draw the puck
  drawPuck(ctx, gameState.puck.position.x, gameState.puck.position.y, gameState.puck.radius);
}; 