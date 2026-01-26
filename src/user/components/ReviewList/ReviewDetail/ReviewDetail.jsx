import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./ReviewDetail.styled"
import ImageSlider from "../../common/Image/ImageSlider"

import { reviewApi } from '../../../../utils/reviewApi';

const ReviewDetail = ({ reviewNo }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
        setLoading(true);
        try {
            const response = await reviewApi.getDetailReview(reviewNo);
            const data = response.data;
            console.log(data);
            setReview(data);
        } catch (error) {
            console.log("?", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    fetchReview();
  }, [reviewNo]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating}>★</S.Star>
    ));
  };

  if (loading) {
    return <S.LoadingContainer>로딩 중...</S.LoadingContainer>;
  }

  if (!review) {
    return <S.ErrorContainer>리뷰를 찾을 수 없습니다.</S.ErrorContainer>;
  }

  

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftSection>
          <S.StarRating>{renderStars(review.rating)}</S.StarRating>
          
          <S.ReviewText>{review.content}</S.ReviewText>
          
          <S.InfoSection>
            <S.InfoItem>
              <S.Label>Written by</S.Label>
              <S.Value>{review.writer.nickname}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>Restaurant</S.Label>
              <S.Value>{review.restaurant.normalName}</S.Value>
            </S.InfoItem>
          </S.InfoSection>
        </S.LeftSection>
        
        <S.RightSection>
          <ImageSlider files={review.files} height={360} />
        </S.RightSection>

      </S.ContentWrapper>
    </S.Container>
  );
};

export default ReviewDetail;