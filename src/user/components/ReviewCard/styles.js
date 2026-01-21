import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StarIcon = styled.div`
  color: #fbbf24;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const RatingValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const Category = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;
