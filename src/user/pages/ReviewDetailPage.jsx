import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import ReviewDetail from '../components/ReviewList/ReviewDetail/ReviewDetail.jsx'
import CommentList from '../components/Comment/CommentList.jsx';
import { ReviewDetailContainer } from './styles';
import { useParams } from 'react-router';

const ReviewDetailPage = () => {

    const  {reviewNo} = useParams();

    return (
        <ReviewDetailContainer>
            <Header />
            <Nav />
            <ReviewDetail reviewNo={reviewNo} />
            {/* KakaoMap */}
            <CommentList reviewNo={reviewNo} />
            <Footer />
        </ReviewDetailContainer>
    );
};

export default ReviewDetailPage;
