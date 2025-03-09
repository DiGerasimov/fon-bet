// Constants for the game
export const BALL_SPEED = 10;
export const FRICTION = 0.99;
export const MALLET_RADIUS = 30;
export const PUCK_RADIUS = 15;
export const COMPUTER_SPEED = 10;
export const COMPUTER_AI_DIFFICULTY = 5; // 1 для простой, 5 для сложной
export const CENTER_POINT = { x: 279, y: 505 }; // Точная центральная точка поля для шайбы
export const DEFAULT_TEAM_ID = 'team1'; // ID команды по умолчанию

// Настройки игры с значениями по умолчанию
export const DEFAULT_SETTINGS = {
  ballSpeed: BALL_SPEED,
  computerSpeed: COMPUTER_SPEED,
  computerDifficulty: COMPUTER_AI_DIFFICULTY,
  teamId: DEFAULT_TEAM_ID,
};

// Определяем активную зону клюшки для отбивания шайбы
export const ACTIVE_ZONE = {
  width: 2.0, // Увеличиваем ширину активной зоны с 1.6 до 2.0
  height: 0.8, // Увеличиваем высоту активной зоны с 0.6 до 0.8
  offsetX: 0.0, // Смещение по X от центра (центрировано по X) 
  offsetY: 1.4, // Смещение по Y от центра (в нижней части клюшки)
}; 