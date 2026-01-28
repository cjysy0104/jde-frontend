import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import { ReviewUpdateContainer } from './styles';
import ReviewUpdateForm from '../components/ReviewEdit/ReviewUpdateForm';
import { useParams } from 'react-router';

const ReviewUpdatePage = () => {

    const  {reviewNo} = useParams();

    return (
        <ReviewUpdateContainer>
        <Header />
        <Nav />
        <ReviewUpdateForm reviewNo={reviewNo} />
        <Footer />
        </ReviewUpdateContainer>
    );
};

export default ReviewUpdatePage;
