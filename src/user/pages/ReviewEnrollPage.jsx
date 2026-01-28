import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { ReviewEnrollContainer } from './styles';
import ReviewEnrollForm from '../components/ReviewEdit/ReviewEnrollForm';

const ReviewEnrollPage = () => {
  return (
    <ReviewEnrollContainer>
      <Header />
      <Nav />
      <ReviewEnrollForm />
      <Footer />
    </ReviewEnrollContainer>
  );
};

export default ReviewEnrollPage;
