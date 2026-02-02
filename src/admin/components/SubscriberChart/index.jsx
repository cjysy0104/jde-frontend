import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaMale, FaFemale } from 'react-icons/fa';
import {
  ChartContainer,
  ChartTitle,
  ChartContent,
  ChartWrapper,
  ChartCenterIcons,
  CenterIcon,
  ChartInfo,
  InfoItem,
  InfoLabel,
  InfoValue,
  IconWrapper,
} from './styles';

const data = [
  { name: 'Boys', value: 45414, percentage: 47, color: '#60a5fa', icon: FaMale },
  { name: 'Girls', value: 40270, percentage: 53, color: '#fbbf24', icon: FaFemale },
];

const SubscriberChart = () => {
  return (
    <ChartContainer>
      <ChartTitle>가입자</ChartTitle>
      <ChartContent>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ChartCenterIcons>
            {data.map((item, index) => {
              const Icon = item.icon;
              return (
                <CenterIcon key={index} color={item.color}>
                  <Icon />
                </CenterIcon>
              );
            })}
          </ChartCenterIcons>
        </ChartWrapper>
        
        <ChartInfo>
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <InfoItem key={index}>
                <IconWrapper color={item.color}>
                  <Icon />
                </IconWrapper>
                <div>
                  <InfoLabel>{item.name} ({item.percentage}%)</InfoLabel>
                  <InfoValue>{item.value.toLocaleString()}</InfoValue>
                </div>
              </InfoItem>
            );
          })}
        </ChartInfo>
      </ChartContent>
    </ChartContainer>
  );
};

export default SubscriberChart;
