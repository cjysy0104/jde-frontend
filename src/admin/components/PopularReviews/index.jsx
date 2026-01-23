import React from 'react';
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

const reviews = [
  { image: defaultReviewImage, title: 'KH반점', subtitle: '마시씀', author: 'KH' },
  { image: defaultReviewImage, title: 'KH닭갈비', subtitle: '마시씀', author: 'KH' },
  { image: defaultReviewImage, title: '만두', subtitle: '마시씀', author: 'KH' },
  { image: defaultReviewImage, title: '바나나', subtitle: '마시씀', author: 'KH' },
];

const PopularReviews = () => {
  return (
    <ReviewsContainer>
      <ReviewsTitle>인기 리뷰</ReviewsTitle>
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>
            <ReviewImage 
              src={review.image} 
              alt={review.title}
              onError={(e) => {
                e.target.src = defaultReviewImage;
              }}
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
