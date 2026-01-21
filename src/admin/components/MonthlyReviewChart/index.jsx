import React from 'react';
import {
  ChartContainer,
  ChartTitle,
  ChartContent,
  MonthList,
  MonthItem,
  MonthLabel,
  MonthBar,
  MonthValue,
  BarContainer,
} from './styles';

const data = [
  { month: 'Jan', value: 23400, color: '#a855f7' },
  { month: 'Feb', value: 15000, color: '#3b82f6' },
  { month: 'Mar', value: 30000, color: '#a855f7' },
  { month: 'Apr', value: 22000, color: '#3b82f6' },
  { month: 'May', value: 10000, color: '#a855f7' },
  { month: 'Jun', value: 23400, color: '#3b82f6' },
  { month: 'Jul', value: 5000, color: '#a855f7' },
];

const maxValue = Math.max(...data.map(d => d.value));

const MonthlyReviewChart = () => {
  return (
    <ChartContainer>
      <ChartTitle>월별 리뷰 작성수</ChartTitle>
      <ChartContent>
        <MonthList>
          {data.map((item, index) => (
            <MonthItem key={index}>
              <MonthLabel>{item.month}</MonthLabel>
              <BarContainer>
                <MonthBar
                  width={`${(item.value / maxValue) * 100}%`}
                  color={item.color}
                />
                <MonthValue>{item.value.toLocaleString()}</MonthValue>
              </BarContainer>
            </MonthItem>
          ))}
        </MonthList>
      </ChartContent>
    </ChartContainer>
  );
};

export default MonthlyReviewChart;
