import styled from 'styled-components';

interface ButtonProps {
  secondary?: boolean;
}

export const SettingsOverlay = styled.div`
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

export const SettingsModal = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 42, 40, 0.3);
  width: 90%;
  max-width: 500px;
  position: relative;
  padding: 20px;
  color: #ffffff;
  border: 1px solid #3a3a3a;
  
  @media (max-width: 480px) {
    width: 95%;
    padding: 15px;
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

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media (max-width: 480px) {
    gap: 10px;
    overflow-y: auto;
    max-height: 60vh;
    padding-right: 5px;
    
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  color: #ffffff;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #3a3a3a;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #ffffff;
  
  &:focus {
    outline: none;
    border-color: #d42a28;
    box-shadow: 0 0 5px rgba(212, 42, 40, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #3a3a3a;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #ffffff;
  
  &:focus {
    outline: none;
    border-color: #d42a28;
    box-shadow: 0 0 5px rgba(212, 42, 40, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
  
  @media (max-width: 480px) {
    margin-top: 15px;
    justify-content: center;
  }
`;

export const Button = styled.button<ButtonProps>`
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
  
  ${props => props.secondary 
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

export const ErrorMessage = styled.div`
  color: #ff5757;
  font-size: 14px;
  margin-top: 5px;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`; 