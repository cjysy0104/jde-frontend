import React, { useState, useEffect } from 'react';
import { reviewApi } from '../../../utils/reviewApi';
import {
  ReviewsContainer,
  ReviewsTitle,
  ReviewList,
  ReviewItem,
  ReviewImage,
  ReviewContent,
  ReviewTitle,
  ReviewSubtitle,
  ReviewAuthor,
  AllProductsButton,
} from './styles';

// 기본 리뷰 이미지 (SVG data URI)
const defaultReviewImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0U1RTdFQiIvPgo8cGF0aCBkPSJNMzAgMjBDMzMuMzEzNyAyMCAzNiAyMi42ODYzIDM2IDI2QzM2IDI5LjMxMzcgMzMuMzEzNyAzMiAzMCAzMkMyNi42ODYzIDMyIDI0IDI5LjMxMzcgMjQgMjZDMjQgMjIuNjg2MyAyNi42ODYzIDIwIDMwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzAgMzZDMjMuOTI0OSAzNiAxOC43NTI0IDMyLjg0MTcgMTYgMjguMjM3NFY0MEg0NFYyOC4yMzc0QzQxLjI0NzYgMzIuODQxNyAzNi4wNzUxIDM2IDMwIDM2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';

// 개별 리뷰 이미지 컴포넌트 (에러 상태 관리)
const ReviewImageWithFallback = ({ src, alt, defaultSrc }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultSrc);
    }
  };

  return (
    <ReviewImage 
      src={imgSrc} 
      alt={alt}
      onError={handleError}
    />
  );
};

const PopularReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestReviews = async () => {
      try {
        setLoading(true);
        const response = await reviewApi.getBestReviewList({
          cursor: undefined,
          cursorLikeCount: undefined,
        });

        // 응답 데이터 구조에 따라 조정
        let reviewList = [];
        if (Array.isArray(response?.data)) {
          reviewList = response.data;
        } else if (response?.data?.content && Array.isArray(response.data.content)) {
          reviewList = response.data.content;
        } else if (response?.data?.data && Array.isArray(response.data.data)) {
          reviewList = response.data.data;
        }

        // 데이터 변환
        const displayReviews = reviewList.map((review) => {
          // 첫 번째 키워드 또는 평점 정보를 subtitle로 사용
          const subtitle = review.keywords && review.keywords.length > 0
            ? review.keywords[0].keywordName
            : review.rating
            ? `평점 ${review.rating}`
            : '리뷰';

          return {
            title: review.restaurantName || '식당명 없음',
            subtitle: subtitle,
            author: review.nickname || review.memberName || '익명',
            image: review.thumbnailUrl || review.imageUrl || defaultReviewImage,
            reviewNo: review.reviewNo,
          };
        });

        setReviews(displayReviews);
      } catch (error) {
        console.error('인기 리뷰 로딩 실패:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestReviews();
  }, []);

  if (loading) {
    return (
      <ReviewsContainer>
        <ReviewsTitle>인기 리뷰</ReviewsTitle>
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          로딩 중...
        </div>
      </ReviewsContainer>
    );
  }

  if (reviews.length === 0) {
    return (
      <ReviewsContainer>
        <ReviewsTitle>인기 리뷰</ReviewsTitle>
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          표시할 리뷰가 없습니다.
        </div>
      </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      <ReviewsTitle>인기 리뷰</ReviewsTitle>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review.reviewNo}>
            <ReviewImageWithFallback 
              src={review.image} 
              alt={review.title}
              defaultSrc={defaultReviewImage}
            />
            <ReviewContent>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewSubtitle>{review.subtitle}</ReviewSubtitle>
              <ReviewAuthor>{review.author}</ReviewAuthor>
            </ReviewContent>
          </ReviewItem>
        ))}
      </ReviewList>
      <AllProductsButton>All Products</AllProductsButton>
    </ReviewsContainer>
  );
};

export default PopularReviews;
