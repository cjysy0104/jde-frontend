import React from 'react';
import { FaStar } from 'react-icons/fa';
import {
  CardContainer,
  CardImage,
  CardContent,
  RestaurantName,
  RatingSection,
  StarIcon,
  RatingValue,
  Category,
} from './styles';

const ReviewCard = ({ review }) => {
  return (
    <CardContainer>
      <CardImage src={review.image} alt={review.restaurantName} />
      <CardContent>
        <RestaurantName>{review.restaurantName}</RestaurantName>
        <RatingSection>
          <StarIcon><FaStar /></StarIcon>
          <RatingValue>{review.rating}</RatingValue>
        </RatingSection>
        <Category>{review.category}</Category>
      </CardContent>
    </CardContainer>
  );
};

export default ReviewCard;
