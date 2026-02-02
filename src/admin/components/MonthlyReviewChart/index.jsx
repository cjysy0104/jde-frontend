import React, { useMemo } from 'react';
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

const monthNames = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
};

const colors = ['#a855f7', '#3b82f6'];

const MonthlyReviewChart = ({ monthlyData = [] }) => {
  // API 데이터를 차트 형식으로 변환
  const chartData = useMemo(() => {
    if (!monthlyData || monthlyData.length === 0) {
      return [];
    }

    return monthlyData.map((item, index) => {
      const yearMonth = item.yearMonth || item.yearmonth; // 대소문자 대응
      const month = yearMonth ? yearMonth.split('-')[1] : '';
      const monthName = monthNames[month] || month;
      
      return {
        month: monthName,
        value: item.count || 0,
        color: colors[index % colors.length],
        yearMonth: yearMonth,
      };
    }).reverse(); // 최신순으로 정렬 (DESC -> ASC로 변환하여 오래된 것부터 표시)
  }, [monthlyData]);

  const maxValue = useMemo(() => {
    if (chartData.length === 0) return 1;
    return Math.max(...chartData.map(d => d.value), 1);
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <ChartContainer>
        <ChartTitle>월별 리뷰 작성수</ChartTitle>
        <ChartContent>
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            데이터가 없습니다.
          </div>
        </ChartContent>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>월별 리뷰 작성수</ChartTitle>
      <ChartContent>
        <MonthList>
          {chartData.map((item, index) => (
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
