import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background-color: ${props => props.$isSelected ? '#f3f4f6' : '#ffffff'};
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f3f4f6;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Badge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const RestaurantName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Address = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StarIcon = styled.span`
  color: #fbbf24;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const RatingValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const ReviewCount = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const EvaluatingBadge = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
`;

export const Description = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatIcon = styled.span`
  color: #9ca3af;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const StatValue = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;
