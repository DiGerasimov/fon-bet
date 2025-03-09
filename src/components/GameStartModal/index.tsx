import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Стили для модального окна
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const StartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CountdownContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
`;

const CountdownNumber = styled.div`
  font-size: 15rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
  animation: pulse 1s ease-in-out;

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

interface GameStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameStart: () => void;
}

const GameStartModal = ({ 
  isOpen, 
  onClose, 
  onGameStart 
}: GameStartModalProps) => {
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Сбрасываем состояние при закрытии модального окна
  useEffect(() => {
    if (!isOpen) {
      setIsCountdownActive(false);
      setCountdown(3);
    }
  }, [isOpen]);

  // Обработчик обратного отсчета
  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Обратный отсчет завершен, запускаем игру
      setIsCountdownActive(false);
      onGameStart();
    }
  }, [countdown, isCountdownActive, onGameStart]);

  // Обработчик нажатия кнопки "Начать"
  const handleStartClick = () => {
    setIsCountdownActive(true);
    onClose(); // Закрываем модальное окно
  };

  return (
    <>
      <ModalOverlay isOpen={isOpen}>
        <ModalContent>
          <ModalTitle>Начать игру?</ModalTitle>
          <StartButton onClick={handleStartClick}>
            Начать
          </StartButton>
        </ModalContent>
      </ModalOverlay>

      {isCountdownActive && countdown > 0 && (
        <CountdownContainer>
          <CountdownNumber>{countdown}</CountdownNumber>
        </CountdownContainer>
      )}
    </>
  );
};

export default GameStartModal; 