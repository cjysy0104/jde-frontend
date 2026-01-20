import styled from 'styled-components';

export const ChartContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
`;

export const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChartCenterIcons = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  pointer-events: none;
`;

export const CenterIcon = styled.div`
  font-size: 20px;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChartInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 8px;
  font-size: 16px;
`;

export const InfoLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;
