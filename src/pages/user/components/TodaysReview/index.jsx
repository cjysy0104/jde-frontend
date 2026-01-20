import React from 'react';
import ReviewCard from '../ReviewCard';
import {
  ReviewSectionContainer,
  ReviewContent,
  SectionTitle,
  ReviewGrid,
  MoreButton,
} from './styles';

const TodaysReview = () => {
  const reviews = [
    {
      id: 1,
      restaurantName: '맛집 상호명',
      rating: 4.5,
      category: '일식분류 카테고리',
      image: 'https://via.placeholder.com/300x200?text=이미지',
    },
    {
      id: 2,
      restaurantName: '맛집 상호명',
      rating: 4.5,
      category: '일식분류 카테고리',
      image: 'https://via.placeholder.com/300x200?text=이미지',
    },
    {
      id: 3,
      restaurantName: '맛집 상호명',
      rating: 4.5,
      category: '일식분류 카테고리',
      image: 'https://via.placeholder.com/300x200?text=이미지',
    },
  ];

  return (
    <ReviewSectionContainer>
      <ReviewContent>
        <SectionTitle>오늘의 리뷰</SectionTitle>
        <ReviewGrid>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ReviewGrid>
        <MoreButton>
          더보기
          <span>+</span>
        </MoreButton>
      </ReviewContent>
    </ReviewSectionContainer>
  );
};

export default TodaysReview;
