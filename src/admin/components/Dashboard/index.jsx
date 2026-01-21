import React from 'react';
import OverviewCard from '../OverviewCard';
import UserAvatarList from '../UserAvatarList';
import PopularReviews from '../PopularReviews';
import CommentsWidget from '../CommentsWidget';
import SubscriberChart from '../SubscriberChart';
import MonthlyReviewChart from '../MonthlyReviewChart';
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
            value="90,243"
            change="8%"
            positive
          />
          <OverviewCard
            title="신규 가입자"
            value="9,450"
            change="11%"
            positive
            showArrow
          />
        </OverviewCards>
        
        <WelcomeMessage>Welcome to our new online experience</WelcomeMessage>
        
        <UserAvatarList />
      </OverviewSection>
      
      <ContentGrid>
        <LeftColumn>
          <SubscriberChart />
          <MonthlyReviewChart />
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
