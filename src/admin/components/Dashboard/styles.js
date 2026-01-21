import styled from 'styled-components';

export const DashboardContainer = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export const DashboardHeader = styled.div`
  margin-bottom: 32px;
`;

export const DashboardTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const DashboardSubtitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: #3b82f6;
  }
  
  svg {
    font-size: 12px;
    color: #6b7280;
  }
`;

export const OverviewSection = styled.div`
  margin-bottom: 32px;
`;

export const OverviewCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

export const WelcomeMessage = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
