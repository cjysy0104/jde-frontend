import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#3b82f6' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: #3b82f6;
  }
`;

export const ProcessButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #6b7280;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4b5563;
  }
`;
