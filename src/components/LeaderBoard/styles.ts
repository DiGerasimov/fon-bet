import styled from 'styled-components';

interface TableRowProps {
  isCurrentUser?: boolean;
}

export const LeaderboardOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

export const LeaderboardModal = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 42, 40, 0.3);
  width: 90%;
  max-width: 600px;
  position: relative;
  padding: 20px;
  color: #ffffff;
  border: 1px solid #3a3a3a;
  
  @media (max-width: 480px) {
    width: 95%;
    padding: 15px 10px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #ff5757;
  transition: all 0.2s;
  
  &:hover {
    color: #d42a28;
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    top: 5px;
    right: 10px;
    font-size: 20px;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(212, 42, 40, 0.5);
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  text-align: center;
  background-color: ${props => props.active ? '#3a3a3a' : '#1e1e1e'};
  color: ${props => props.active ? '#ffffff' : '#aaaaaa'};
  border: none;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s;
  border-bottom: 2px solid ${props => props.active ? '#d42a28' : 'transparent'};
  
  @media (max-width: 480px) {
    padding: 8px 5px;
    font-size: 14px;
  }
  
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
  
  &:hover {
    background-color: #3a3a3a;
  }
`;

export const LeaderboardTable = styled.div`
  width: 100%;
  margin-top: 15px;
  
  @media (max-width: 480px) {
    overflow-y: auto;
    max-height: 60vh;
    margin-top: 10px;
    
    /* Стилизуем скроллбар */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #d42a28;
      border-radius: 10px;
    }
  }
`;

export const LeaderboardHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr repeat(3, 100px);
  background: linear-gradient(to right, #d42a28, #ff5757);
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  gap: 5px;
  
  @media (max-width: 480px) {
    grid-template-columns: 30px 1fr 60px 60px 60px;
    padding: 8px 5px;
    font-size: 12px;
    gap: 3px;
    position: sticky;
    top: 0;
    z-index: 5;
  }
`;

export const HeaderItem = styled.div`
  text-align: center;
  
  &:nth-child(2) {
    text-align: left;
  }
  
  @media (max-width: 480px) {
    padding: 0 2px;
    
    &:nth-child(4), &:nth-child(5) {
      font-size: 10px;
    }
  }
`;

export const LeaderboardRow = styled.div<{ isCurrentUser?: boolean }>`
  display: grid;
  grid-template-columns: 50px 1fr repeat(3, 100px);
  padding: 12px 10px;
  background-color: ${props => props.isCurrentUser ? 'rgba(212, 42, 40, 0.2)' : '#1e1e1e'};
  border-bottom: 1px solid #3a3a3a;
  gap: 5px;
  transition: background-color 0.2s;
  
  @media (max-width: 480px) {
    grid-template-columns: 30px 1fr 60px 60px 60px;
    padding: 8px 5px;
    font-size: 12px;
    gap: 3px;
  }
  
  &:hover {
    background-color: ${props => props.isCurrentUser ? 'rgba(212, 42, 40, 0.3)' : '#333333'};
  }
  
  &:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: none;
  }
`;

export const RowItem = styled.div`
  text-align: center;
  
  &:nth-child(2) {
    text-align: left;
  }
  
  @media (max-width: 480px) {
    padding: 0 2px;
  }
`;

export const PlayerName = styled.div`
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

export const PlayerTeam = styled.div`
  font-size: 12px;
  color: #aaaaaa;
  
  @media (max-width: 480px) {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

export const Rank = styled.div<{ rank: number }>`
  font-weight: bold;
  color: ${props => {
    if (props.rank === 1) return '#ffd700'; // золото
    if (props.rank === 2) return '#c0c0c0'; // серебро
    if (props.rank === 3) return '#cd7f32'; // бронза
    return '#ffffff';
  }};
  text-shadow: ${props => {
    if (props.rank <= 3) return '0 0 5px rgba(255, 255, 255, 0.7)';
    return 'none';
  }};
`;

export const Score = styled.div`
  font-weight: bold;
  color: #ff5757;
  text-shadow: 0 0 5px rgba(212, 42, 40, 0.5);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 18px;
  color: #aaaaaa;
  
  @media (max-width: 480px) {
    padding: 20px 10px;
    font-size: 14px;
  }
`;

export const NotLoggedIn = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 18px;
  color: #aaaaaa;
  
  @media (max-width: 480px) {
    padding: 20px 10px;
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  background: linear-gradient(135deg, #d42a28, #ff5757);
  color: white;
  box-shadow: 0 0 10px rgba(212, 42, 40, 0.5);
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  &:hover {
    background: linear-gradient(135deg, #ff5757, #d42a28);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(212, 42, 40, 0.7);
  }
  
  &:active {
    transform: translateY(1px);
  }
`; 