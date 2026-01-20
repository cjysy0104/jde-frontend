import React from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import TodaysReview from './components/TodaysReview';
import Footer from './components/Footer';
import { UserPageContainer } from './styles';

const UserPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <SearchSection />
      <TodaysReview />
      <Footer />
    </UserPageContainer>
  );
};

export default UserPage;
