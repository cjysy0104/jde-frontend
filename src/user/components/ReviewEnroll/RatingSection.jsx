import React from 'react';
import { RatingContainer, StarContainer, Star, RatingText } from './RatingSection.styled';

const RatingSection = ({ rating, onRatingChange }) => {
  const getStarDisplay = (index) => {
    const starValue = index + 1;
    if (rating >= starValue) {
      return '★'; // 꽉 찬 별
    } else if (rating >= starValue - 0.5) {
      return '✦'; // 반 별
    } else {
      return '☆'; // 빈 별
    }
  };

  const handleStarClick = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isLeftHalf = clickX < rect.width / 2;
    
    const newRating = isLeftHalf ? index + 0.5 : index + 1;
    onRatingChange(newRating);
  };

  return (
    <RatingContainer>
      <StarContainer>
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            onClick={(e) => handleStarClick(index, e)}
          >
            {getStarDisplay(index)}
          </Star>
        ))}
      </StarContainer>
      <RatingText>{rating.toFixed(1)}</RatingText>
    </RatingContainer>
  );
};

export default RatingSection;