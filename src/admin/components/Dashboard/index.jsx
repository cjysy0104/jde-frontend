import React, { useState, useEffect } from 'react';
import OverviewCard from '../OverviewCard';
import UserAvatarList from '../UserAvatarList';
import PopularReviews from '../PopularReviews';
import CommentsWidget from '../CommentsWidget';
import SubscriberChart from '../SubscriberChart';
import MonthlyReviewChart from '../MonthlyReviewChart';
import { adminApi } from '../../../utils/adminApi';
import { FaChevronDown } from 'react-icons/fa';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  FilterDropdown,
  OverviewSection,
  OverviewCards,
  WelcomeMessage,
  ContentGrid,
  LeftColumn,
  RightColumn,
} from './styles';

const Dashboard = () => {
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const [newMemberCount, setNewMemberCount] = useState(0);
  const [previousMonthNewMemberCount, setPreviousMonthNewMemberCount] = useState(0);
  const [monthlyReviewData, setMonthlyReviewData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // 전체 회원 수 조회
        const totalMemberResponse = await adminApi.getTotalMemberCount();
        if (totalMemberResponse?.data !== undefined) {
          setTotalMemberCount(totalMemberResponse.data);
        }
        
        // 최근 1개월 신규 가입자 수 조회
        const newMemberResponse = await adminApi.getNewMemberCountLastMonth();
        if (newMemberResponse?.data !== undefined) {
          setNewMemberCount(newMemberResponse.data);
        }
        
        // 이전 달 신규 가입자 수 조회
        const previousMonthResponse = await adminApi.getNewMemberCountPreviousMonth();
        if (previousMonthResponse?.data !== undefined) {
          setPreviousMonthNewMemberCount(previousMonthResponse.data);
        }
        
        // 월별 리뷰 수 조회
        const monthlyReviewResponse = await adminApi.getMonthlyReviewCount();
        if (monthlyReviewResponse?.data && Array.isArray(monthlyReviewResponse.data)) {
          setMonthlyReviewData(monthlyReviewResponse.data);
        }
      } catch (error) {
        console.error('대시보드 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 이전 달 대비 증가율 계산
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) {
      if (current > 0) return '+100%'; // 이전 달이 0이고 현재가 있으면 100% 증가
      return '0%';
    }
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  // 신규 가입자 증가율 계산
  const getNewMemberChange = () => {
    const change = calculateChange(newMemberCount, previousMonthNewMemberCount);
    const isPositive = newMemberCount >= previousMonthNewMemberCount;
    return { change, positive: isPositive };
  };

  const memberChange = getNewMemberChange();

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>
            Overview
            <FilterDropdown>
              All Time <FaChevronDown />
            </FilterDropdown>
          </DashboardSubtitle>
        </div>
      </DashboardHeader>
      
      <OverviewSection>
        <OverviewCards>
          <OverviewCard
            title="이용자"
            value={loading ? '로딩 중...' : totalMemberCount.toLocaleString()}
            change=""
            positive
          />
          <OverviewCard
            title="신규 가입자"
            value={loading ? '로딩 중...' : newMemberCount.toLocaleString()}
            change={memberChange.change}
            positive={memberChange.positive}
            showArrow
          />
        </OverviewCards>
        
        <WelcomeMessage>미식대장 Top 5</WelcomeMessage>
        
        <UserAvatarList />
      </OverviewSection>
      
      <ContentGrid>
        <LeftColumn>
          <SubscriberChart />
          <MonthlyReviewChart monthlyData={monthlyReviewData} />
        </LeftColumn>
        
        <RightColumn>
          <PopularReviews />
          <CommentsWidget />
        </RightColumn>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
