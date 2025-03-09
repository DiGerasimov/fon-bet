import { BoardDimensions, Puck, Point } from '@/utils/types';
import { COMPUTER_SPEED, COMPUTER_AI_DIFFICULTY, CENTER_POINT } from '@/constants/gameConstants';

/**
 * Обновляет позицию компьютерной клюшки на основе AI логики
 */
export const updateComputerPosition = (
  computerPosition: Point,
  puck: Puck,
  board: BoardDimensions,
  computerSpeed: number = COMPUTER_SPEED,
  computerDifficulty: number = COMPUTER_AI_DIFFICULTY
): Point => {
  let newComputerPosition = { ...computerPosition };
  
  // Вычисляем целевые координаты в зависимости от положения шайбы
  let targetX = 279; // Значение по умолчанию - центр
  let targetY = 150; // Значение по умолчанию - верхняя часть поля
  
  // AI behavior when puck is in computer's half
  if (puck.position.y < board.centerY) {
    // Целевые координаты - позиция шайбы с учетом сложности AI
    targetX = puck.position.x;
    
    // Позиция по Y зависит от скорости шайбы и сложности ИИ
    const puckSpeed = Math.abs(puck.velocity.x) + Math.abs(puck.velocity.y);
    
    // Чем выше сложность, тем ближе к шайбе будет стремиться ИИ
    const difficultyFactor = computerDifficulty / 5; // 0.2 - 1.0 для диапазона от 1 до 5
    
    if (puckSpeed < 5) {
      // Если шайба движется медленно, стараемся подойти к ней
      targetY = puck.position.y - 50 + (50 * difficultyFactor); // Чем выше сложность, тем ближе к шайбе
    } else {
      // Иначе занимаем оборонительную позицию
      targetY = 150 + (50 * difficultyFactor); // Чем выше сложность, тем ближе к центру
    }
  } else {
    // Новая, более интересная логика для движения, когда шайба на стороне игрока
    // Определим случайную стратегию поведения бота
    const currentTime = Date.now();
    const behaviorState = Math.floor(currentTime / 1500) % 4; // Меняем состояние каждые 1.5 секунды
    
    // Рассчитаем предполагаемую будущую позицию шайбы на основе ее текущей скорости
    const predictedX = puck.position.x + (puck.velocity.x * 10);
    
    switch (behaviorState) {
      case 0: // Следим за шайбой по X, держимся ближе к центру
        targetX = puck.position.x;
        targetY = 180;
        break;
      case 1: // Передвигаемся в случайную сторону
        // Используем время как seed для "случайного" движения
        const sinValue = Math.sin(currentTime / 1000);
        targetX = 279 + sinValue * 200; // Движение влево-вправо
        targetY = 120 + Math.sin(currentTime / 800) * 50; // Небольшое движение вверх-вниз
        break;
      case 2: // Занимаем стратегическую позицию, предугадывая траекторию шайбы
        targetX = Math.min(Math.max(predictedX, board.xMin + 50), board.xMax - 50);
        targetY = 150 + (computerDifficulty * 5); // Чем выше сложность, тем ближе к центру
        break;
      case 3: // Занимаем защитную позицию, смещенную в сторону движения шайбы
        targetX = 279 + (Math.sign(puck.velocity.x) * 100);
        targetY = 100;
        break;
    }
    
    // Если шайба движется быстро в сторону компьютера, перехватываем ее
    const puckSpeed = Math.abs(puck.velocity.x) + Math.abs(puck.velocity.y);
    const puckComingToComputer = puck.velocity.y < -5; // Шайба движется вверх быстро
    
    if (puckSpeed > 8 && puckComingToComputer) {
      // Предугадываем, где будет шайба
      const timeToIntercept = (board.centerY - puck.position.y) / -puck.velocity.y;
      const interceptX = puck.position.x + (puck.velocity.x * timeToIntercept);
      
      // Двигаемся к точке перехвата
      targetX = Math.min(Math.max(interceptX, board.xMin + 30), board.xMax - 30);
      targetY = board.centerY - 50;
    }
  }
  
  // Применяем фактор сложности к скорости компьютера
  // Чем выше сложность, тем быстрее реагирует бот
  const speedFactor = 0.5 + (computerDifficulty / 10); // от 0.6 до 1.0
  const effectiveSpeed = computerSpeed * speedFactor;
  
  // Вычисляем разницу между текущей и целевой позицией
  const diffX = targetX - computerPosition.x;
  const diffY = targetY - computerPosition.y;
  
  // Плавно перемещаемся в направлении цели с ограниченной скоростью
  if (Math.abs(diffX) > 0) {
    // Плавное движение без дрожания
    newComputerPosition.x += Math.sign(diffX) * Math.min(Math.abs(diffX), effectiveSpeed);
  }
  
  if (Math.abs(diffY) > 0) {
    // Плавное движение без дрожания
    newComputerPosition.y += Math.sign(diffY) * Math.min(Math.abs(diffY), effectiveSpeed);
  }
  
  // Ограничиваем движение компьютера верхней половиной поля
  newComputerPosition.y = Math.min(Math.max(newComputerPosition.y, board.yMin + 30), board.centerY - 30);
  
  // Ограничиваем движение компьютера по ширине поля
  newComputerPosition.x = Math.min(Math.max(newComputerPosition.x, board.xMin + 30), board.xMax - 30);
  
  return newComputerPosition;
}; 