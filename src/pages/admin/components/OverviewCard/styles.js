import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 12px 0;
`;

export const CardValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
`;

export const CardChange = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #10b981;
    font-size: 12px;
  }
`;

export const ChangeBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.positive ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;
