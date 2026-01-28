import styled from 'styled-components';

export const MapSearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 296px); /* 헤더·Nav·Footer·상하여백 반영 */
  min-height: 520px;
  margin-top: 48px; /* NavBar와의 간격 */
  margin-bottom: 48px; /* Footer와의 간격 */
  padding-left: 24px;
  padding-right: 24px;
  gap: 24px; /* 리스트와 지도 사이 간격 */
  box-sizing: border-box;
`;

export const LeftPanel = styled.div`
  width: 35%;
  min-width: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const RightPanel = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ResultsCount = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const RestaurantList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6b7280;
  font-size: 14px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
`;

export const ResultsHeader = styled.div`
  padding: 16px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NearbyButton = styled.button`
  position: absolute;
  top: 20px;
  right: ${props => props.$active ? '140px' : '20px'};
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NearbyIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
`;

export const MapControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;

export const LocationButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LocationIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
`;

export const RadiusFilter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 100px;
`;

export const RadiusFilterTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-align: center;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const RadiusIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: block;
`;

export const RadiusButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? '#ffffff' : '#6366f1'};
  background-color: ${props => props.$active ? '#6366f1' : '#eef2ff'};
  border: 2px solid #6366f1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background-color: ${props => props.$active ? '#4f46e5' : '#e0e7ff'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* 선택한 음식점의 리뷰 섹션 */
export const RestaurantReviewsSection = styled.section`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

export const RestaurantReviewsTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
  padding: 0 4px;
`;

export const RestaurantReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
