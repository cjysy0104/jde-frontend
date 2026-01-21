import styled from 'styled-components';

export const ChartContainer = styled.div`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 20px 0;
`;

export const ChartContent = styled.div`
  width: 100%;
`;

export const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MonthItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MonthLabel = styled.div`
  width: 40px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
`;

export const BarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const MonthBar = styled.div`
  height: 24px;
  background-color: ${props => props.color};
  border-radius: 4px;
  width: ${props => props.width};
  transition: width 0.3s ease;
  min-width: 4px;
`;

export const MonthValue = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: white;
  min-width: 60px;
  text-align: right;
`;
