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

const reviews = [
  { image: 'https://via.placeholder.com/60', title: 'KH반점', subtitle: '마시씀', author: 'KH' },
  { image: 'https://via.placeholder.com/60', title: 'KH닭갈비', subtitle: '마시씀', author: 'KH' },
  { image: 'https://via.placeholder.com/60', title: '만두', subtitle: '마시씀', author: 'KH' },
  { image: 'https://via.placeholder.com/60', title: '바나나', subtitle: '마시씀', author: 'KH' },
];

const PopularReviews = () => {
  return (
    <ReviewsContainer>
      <ReviewsTitle>인기 리뷰</ReviewsTitle>
      <ReviewList>
        {reviews.map((review, index) => (
          <ReviewItem key={index}>
            <ReviewImage src={review.image} alt={review.title} />
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
