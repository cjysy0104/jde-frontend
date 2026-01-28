import styled from 'styled-components';

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Star = styled.span`
  font-size: 32px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const RatingText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #ff6b35;
`;
