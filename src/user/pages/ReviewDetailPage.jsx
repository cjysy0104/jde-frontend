import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import ReviewDetail from '../components/ReviewList/ReviewDetail/ReviewDetail.jsx'
import { ReviewDetailContainer } from './styles';
import { useParams } from 'react-router';

const ReviewDetailPage = () => {

    const  {reviewNo} = useParams();

    return (
        <ReviewDetailContainer>
            <Header />
            <Nav />
            <ReviewDetail reviewNo={reviewNo}/>
            {/* KakaoMap */}
            {/* Comment */}
            <Footer />
        </ReviewDetailContainer>
    );
};

export default ReviewDetailPage;
