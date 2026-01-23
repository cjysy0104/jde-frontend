import styled from 'styled-components';

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const FoodImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%;
  background-color: #f5f5f5;
  overflow: hidden;
`;

export const FoodImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileImage = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  
  img {
    width: 24px;
    height: 24px;
  }
`;

export const CardContent = styled.div`
  padding: 18px;
`;

export const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;

  display: inline-flex;
  align-items: center;
  gap: 4px;

  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: #666;

  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.05);
    color: #111;
  }

  &:active {
    transform: scale(0.95);
  }
`;


export const RestaurantName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #333;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Nickname = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #333;
`;

export const Rating = styled.span`
  font-size: 13px;
  color: #ff6b35;
  font-weight: 600;
`;

export const UpdateDate = styled.span`
  font-size: 12px;
  color: #999;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin: 0 0 10px 0;
`;

export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

export const KeywordBadge = styled.span`
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const Footer = styled.div`
  border-top: 1px solid #eee;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const StatItem = styled.span`
  font-size: 13px;
  color: #666;
`;

export const ViewCount = styled.span`
  font-size: 13px;
  color: #999;
`;