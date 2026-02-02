import React from 'react';
import { FaStar } from 'react-icons/fa';
import { getImageProps } from "../../../utils/image";
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
import { useNavigate } from 'react-router';


const ReviewCard = ({ review }) => {
  const navigate = useNavigate();

    const handleClick = () => {
    navigate(`/reviews/${review.reviewNo}`);
  }

  return (
    <CardContainer
      onClick={handleClick}>
      <CardImage
        {...getImageProps(review.thumbnailUrl)}
        alt={review.restaurantName}
      />
      <CardContent>
        <RestaurantName>{review.restaurantName}</RestaurantName>
        <RatingSection>
          <StarIcon><FaStar /></StarIcon>
          <RatingValue>{review.rating}</RatingValue>
        </RatingSection>
        <Category>
            {review.keywords.map((k) => (
              <span key={k.keywordNo}>#{k.keywordName} </span>
            ))}
        </Category>
      </CardContent>
    </CardContainer>
  );
};

export default ReviewCard;