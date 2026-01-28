import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./ReviewDetail.styled"
import ImageSlider from "../../common/Image/ImageSlider"

import { reviewApi } from '../../../../utils/reviewApi';
import { AuthContext } from '../../context/AuthContext';
import ReviewMapSection from '../../ReviewMapSection/ReviewMapSection';

const ReviewDetail = ({ reviewNo }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = auth?.isAuthenticated;

  const isAuthor =
    auth?.isAuthenticated &&
    review &&
    auth.memberNo === review.writer.memberNo;


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
    console.log(auth);
  }, [reviewNo]);

  // 버튼 핸들러들
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/review/edit/${reviewNo}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      try {
        await reviewApi.deleteReview(reviewNo);
        alert('리뷰가 삭제되었습니다.');
        navigate(-1);
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('리뷰 삭제에 실패했습니다.');
      }
    }
  };

  const handleReport = () => {
    // 신고 기능 구현
    /*
    신고 기능 API 명시 해주세요
    */
    if (window.confirm('이 리뷰를 신고하시겠습니까?')) {
      // 신고 API 호출
      alert('신고가 접수되었습니다.');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating}>★</S.Star>
    ));
  };

  // 버튼 렌더링 함수
  const renderButtons = () => {
    if (!isLoggedIn) {
      // 비로그인 상태
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
        </S.ButtonGroup>
      );
    } else if (isAuthor) {
      // 작성자인 경우
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
          <S.EditButton onClick={handleEdit}>수정하기</S.EditButton>
          <S.DeleteButton onClick={handleDelete}>삭제하기</S.DeleteButton>
        </S.ButtonGroup>
      );
    } else {
      // 로그인했지만 작성자가 아닌 경우
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
          <S.ReportButton onClick={handleReport}>신고하기</S.ReportButton>
        </S.ButtonGroup>
      );
    }
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
      <S.MapSection>
        <ReviewMapSection
          restaurant={{
            normalName: review.restaurant.normalName,
            address: review.restaurant.address,
            latitude: review.restaurant.latitude,
            longitude: review.restaurant.longitude,
            thumbnailUrl: review.files?.[0]?.fileUrl ?? null,
          }}
        />
      </S.MapSection>
      {renderButtons()}
    </S.Container>
  );
};

export default ReviewDetail;