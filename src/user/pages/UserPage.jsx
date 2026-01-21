import React from 'react';
import Header from '../components/common/Header';
import SearchSection from '../components/SearchSection';
import TodaysReview from '../components/TodaysReview';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { UserPageContainer } from './styles';

const UserPage = () => {
  return (
    <UserPageContainer>
      <Header />
      <Nav />
      <SearchSection />
      <TodaysReview />
      <Footer />
    </UserPageContainer>
  );
};

export default UserPage;
