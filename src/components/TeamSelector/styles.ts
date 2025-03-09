import styled from 'styled-components';

export const TeamSelectorOverlay = styled.div`
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

export const TeamSelectorModal = styled.div`
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
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    padding: 15px;
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
`;

export const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(212, 42, 40, 0.5);
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

export const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 480px) {
    overflow-y: auto;
    max-height: 60vh;
    padding-right: 5px;
    margin-bottom: 15px;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    
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
    
    & > *:last-child {
      margin-bottom: 10px;
    }
  }
`;

export const TeamCard = styled.div<{ selected: boolean }>`
  background-color: ${(props) => props.selected ? 'rgba(212, 42, 40, 0.2)' : '#1e1e1e'};
  border: 2px solid ${(props) => props.selected ? '#d42a28' : '#3a3a3a'};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${(props) => props.selected ? '0 0 15px rgba(212, 42, 40, 0.5)' : 'none'};
  
  @media (max-width: 480px) {
    padding: 10px;
  }
  
  &:hover {
    transform: translateY(-5px);
    border-color: #d42a28;
    box-shadow: 0 0 15px rgba(212, 42, 40, 0.3);
  }
`;

export const TeamLogo = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    height: 60px;
  }
  
  object, embed, img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const TeamName = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const TeamDescription = styled.div`
  text-align: center;
  font-size: 12px;
  color: #aaaaaa;
  
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export const Button = styled.button<{ secondary?: boolean }>`
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  ${(props) => props.secondary 
    ? `
      background-color: #444444;
      color: white;
      &:hover {
        background-color: #555555;
      }
    ` 
    : `
      background: linear-gradient(135deg, #d42a28, #ff5757);
      color: white;
      box-shadow: 0 0 10px rgba(212, 42, 40, 0.5);
      &:hover {
        background: linear-gradient(135deg, #ff5757, #d42a28);
        transform: translateY(-2px);
        box-shadow: 0 0 15px rgba(212, 42, 40, 0.7);
      }
      &:active {
        transform: translateY(1px);
      }
    `}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 18px;
  color: #aaaaaa;
`; 