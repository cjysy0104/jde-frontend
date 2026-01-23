import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { ReviewListContainer } from './styles';
import ReviewList from '../components/ReviewList/ReviewList';

const ReviewPage = () => {
  return (
    <ReviewListContainer>
      <Header />
      <Nav />
      <ReviewList />
      <Footer />
    </ReviewListContainer>
  );
};

export default ReviewPage;
