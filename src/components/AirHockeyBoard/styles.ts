import styled from 'styled-components';

export const StyledCanvas = styled.canvas`
  background: #FFFFFF;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 42, 40, 0.5);
  max-width: 100%; // Ограничиваем максимальную ширину, чтобы канвас помещался на экране
  object-fit: contain; // Сохраняем пропорции
  touch-action: none; // Предотвращаем стандартные действия браузера при касании (скролл, зум)
  -webkit-touch-callout: none; // Предотвращаем появление контекстного меню на iOS
  -webkit-user-select: none; // Предотвращаем выделение текста
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; // Минимальная высота равна высоте видимой области
  padding: 10px; // Уменьшаем отступы для мобильных устройств
  box-sizing: border-box; // Включаем padding в расчет высоты
  font-family: 'Arial', sans-serif;
  overflow: hidden; // Предотвращаем скролл
  background-color: #1e1e1e;
  color: #ffffff;
  position: fixed; // Фиксируем контейнер в видимой области
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none; // Предотвращаем стандартные действия браузера при касании
`;

export const GameLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 554px; // Максимальная ширина равна ширине канваса
  height: 100vh;
  padding: 10px 5px;
  box-sizing: border-box;
`;

export const LogoWrapper = styled.div`
  width: auto;
  max-width: 150px; // Ограничиваем максимальную ширину логотипа
  margin-bottom: 10px;
  margin-top: 10px;

  @media (max-width: 480px) {
    max-width: 100px; // Уменьшаем максимальную ширину логотипа на мобильных устройствах
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

export const ScoreBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 554px; // Максимальная ширина равна ширине канваса
  margin-bottom: 10px;
  padding: 0 5px; // Добавляем небольшие отступы по бокам
  position: relative; // Добавляем относительное позиционирование для правильного отображения меню
  gap: 15px; // Добавляем отступ между счетом и кнопкой меню

  @media (max-width: 480px) {
    flex-direction: row; // Сохраняем горизонтальное расположение даже на узких экранах
    padding: 0 3px;
    margin-bottom: 10px; // Отступ снизу на мобильных устройствах
    gap: 10px; // Уменьшаем отступ на мобильных устройствах
  }
`;

export const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  position: relative; // Добавляем относительное позиционирование

  @media (max-width: 480px) {
    gap: 5px; // Уменьшаем расстояние между кнопками на мобильных устройствах
  }
`;

export const ResetButton = styled.button`
  background: linear-gradient(135deg, #d42a28, #ff5757);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(212, 42, 40, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-width: 120px;
  height: 38px;
  
  // Улучшаем отзывчивость касаний на мобильных устройствах
  @media (max-width: 480px) {
    min-width: auto;
    padding: 8px 10px;
    font-size: 12px;
  }
  
  &:hover {
    background: linear-gradient(135deg, #ff5757, #d42a28);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(212, 42, 40, 0.9);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 8px rgba(212, 42, 40, 0.8);
  }
`;

export const SettingsButton = styled.button`
  display: none; /* Скрываем, так как теперь используем выпадающее меню */
`;

export const RankingButton = styled.button`
  display: none; /* Скрываем, так как теперь используем выпадающее меню */
`;

export const TeamButton = styled.button`
  display: none; /* Скрываем, так как теперь используем выпадающее меню */
`;

export const ScoreBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(42, 42, 42, 0.8);
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 150px;

  @media (max-width: 480px) {
    min-width: 120px; // Уменьшаем минимальную ширину на мобильных устройствах
    padding: 3px 8px;
  }
`;

export const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  color: #ffffff;
  
  &:first-child {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    padding: 3px 6px; // Уменьшаем отступы на мобильных устройствах
  }
`;

export const ScoreLabel = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
  margin-bottom: 2px;

  @media (max-width: 480px) {
    font-size: 9px; // Уменьшаем размер текста на мобильных устройствах
  }
`;

export const ScoreValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(212, 42, 40, 0.7),
               0 0 10px rgba(212, 42, 40, 0.5);

  @media (max-width: 480px) {
    font-size: 16px; // Уменьшаем размер цифр на мобильных устройствах
  }
`;

export const HistoryView = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(42, 42, 42, 0.7);
  border-radius: 8px;
  padding: 10px;
  font-size: 12px;
  color: #ff5757;
  text-shadow: 0 0 5px rgba(255, 87, 87, 0.5);
  max-width: 200px;
  max-height: 150px;
  overflow-y: auto;
  backdrop-filter: blur(2px);
  border: 1px solid rgba(212, 42, 40, 0.3);
  box-shadow: 0 0 10px rgba(212, 42, 40, 0.2);
  
  @media (max-width: 480px) {
    max-width: 150px; // Уменьшаем максимальную ширину на мобильных устройствах
    max-height: 100px; // Уменьшаем максимальную высоту на мобильных устройствах
    font-size: 10px; // Уменьшаем размер шрифта
    padding: 6px; // Уменьшаем внутренние отступы
    bottom: 5px; // Уменьшаем отступ снизу
    right: 5px; // Уменьшаем отступ справа
  }
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(212, 42, 40, 0.7);
    border-radius: 5px;
  }
`;

export const HistoryItem = styled.div`
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const GameTitle = styled.h1`
  color: #1589FF;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-height: 700px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`; 