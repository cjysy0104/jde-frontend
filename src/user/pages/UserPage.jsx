import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/common/Header';
import SearchSection from '../components/SearchSection';
import TodaysReview from '../components/TodaysReview';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { UserPageContainer } from './styles';


export default function UserPage() {
  return (
    <UserPageContainer>
      <Header />
      <Outlet />
      <Nav />
      <SearchSection />
      <TodaysReview />
      <Footer />
    </UserPageContainer>
  );
}
