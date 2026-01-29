import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { ReviewListContainer } from './styles';
import ReviewList from '../components/ReviewList/ReviewList';
import { useSearchParams } from 'react-router';

const ReviewPage = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return (
    <ReviewListContainer>
      <Header />
      <Nav />
      <ReviewList query={query}/>
      <Footer />
    </ReviewListContainer>
  );
};

export default ReviewPage;
