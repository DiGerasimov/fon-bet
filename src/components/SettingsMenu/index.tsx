import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isMobileDevice } from '@/utils/mobileDetect';

interface SettingsMenuProps {
  onOpenSettings: () => void;
  onOpenLeaderBoard: () => void;
  onOpenTeamSelector: () => void;
  onResetToCenter: () => void;
  onStartGame?: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

const MenuContainer = styled.div`
  position: relative;
  z-index: 999;
`;

const MenuButton = styled.button`
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
  
  @media (max-width: 480px) {
    min-width: auto;
    padding: 8px 10px;
    font-size: 12px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(212, 42, 40, 0.9);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

interface MenuDropdownProps {
  isOpen: boolean;
  isMobile: boolean;
}

const MenuDropdown = styled.div<MenuDropdownProps>`
  position: absolute;
  top: 45px;
  right: 0;
  width: 180px;
  background-color: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transform: ${({ isOpen, isMobile }) => {
    if (!isOpen) return 'translateY(-10px)';
    // На мобильных устройствах показываем меню выше, чтобы оно не выходило за пределы экрана
    return isMobile ? 'translateY(-200px)' : 'translateY(0)';
  }};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  z-index: 1000;
  
  @media (max-width: 480px) {
    width: 160px;
    right: 0;
    // Фиксированное позиционирование в центре экрана для мобильных устройств
    position: fixed;
    top: 50%;
    left: 50%;
    transform: ${({ isOpen }) => (isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)')};
  }
`;

interface MenuOverlayProps {
  isOpen: boolean;
}

const MenuOverlay = styled.div<MenuOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 15px;
  text-align: left;
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  &:hover {
    background-color: #3a3a3a;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #3a3a3a;
  }
`;

const SettingsMenu = ({
  onOpenSettings,
  onOpenLeaderBoard,
  onOpenTeamSelector,
  onResetToCenter,
  onStartGame,
  onMenuToggle
}: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null as HTMLDivElement | null);
  
  // Определяем, является ли устройство мобильным
  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    // Закрываем меню при клике вне его области
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Оповещаем родительский компонент о закрытии меню
        if (onMenuToggle) {
          onMenuToggle(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onMenuToggle]);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    // Оповещаем родительский компонент о новом состоянии меню
    if (onMenuToggle) {
      onMenuToggle(newState);
    }
  };

  const handleItemClick = (callback: () => void) => {
    callback();
    setIsOpen(false);
    // Оповещаем родительский компонент о закрытии меню
    if (onMenuToggle) {
      onMenuToggle(false);
    }
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={toggleMenu}>
        Меню
      </MenuButton>
      {isMobile && <MenuOverlay isOpen={isOpen} onClick={() => {
        setIsOpen(false);
        // Оповещаем родительский компонент о закрытии меню
        if (onMenuToggle) {
          onMenuToggle(false);
        }
      }} />}
      <MenuDropdown isOpen={isOpen} isMobile={isMobile}>
        {onStartGame && (
          <MenuItem onClick={() => handleItemClick(onStartGame)} style={{ color: '#4caf50', fontWeight: 'bold' }}>
            Начать игру
          </MenuItem>
        )}
        <MenuItem onClick={() => handleItemClick(onOpenSettings)}>Настройки</MenuItem>
        <MenuItem onClick={() => handleItemClick(onOpenLeaderBoard)}>Лидеры</MenuItem>
        <MenuItem onClick={() => handleItemClick(onOpenTeamSelector)}>Выбор команды</MenuItem>
        <MenuItem onClick={() => handleItemClick(onResetToCenter)}>Сброс шайбы</MenuItem>
      </MenuDropdown>
    </MenuContainer>
  );
};

export default SettingsMenu; 