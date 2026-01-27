import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e0e0e0;
`;

export const RestaurantInfo = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 280px;
  z-index: 10;
`;

export const RestaurantImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
`;

export const RestaurantDetails = styled.div`
  flex: 1;
`;

export const RestaurantName = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
`;

export const RestaurantAddress = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

export const MapControls = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

export const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const LoadingMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
  font-size: 14px;
`;