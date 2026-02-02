import React from 'react';
import { FaStar, FaEye, FaHeart, FaComment } from 'react-icons/fa';
import { getImageProps } from '../../../utils/image';
import {
  CardContainer,
  CardImageWrapper,
  CardImage,
  Badge,
  CardContent,
  RestaurantName,
  Address,
  RatingSection,
  StarIcon,
  RatingValue,
  ReviewCount,
  EvaluatingBadge,
  Description,
  StatsSection,
  StatItem,
  StatIcon,
  StatValue,
} from './RestaurantCard.styles';

const RestaurantCard = ({ review, isSelected = false, onClick, onViewDetail }) => {
  const {
    reviewNo,
    normalName,
    restaurantName,
    rating,
    reviewCount,
    reviewContent,
    content,
    viewCount = 0,
    likeCount = 0,
    commentCount = 0,
    thumbnailUrl,
    address,
  } = review;

  const displayName = normalName || restaurantName || '식당명 없음';
  const hasRating = rating !== null && rating !== undefined;
  const displayRating = hasRating ? rating.toFixed(1) : null;
  const displayReviewCount = reviewCount || 0;
  const displayContent = reviewContent || content || '';

  return (
    <CardContainer
      id={`restaurant-${reviewNo}`}
      $isSelected={isSelected}
      onClick={onClick}
    >
      <CardImageWrapper>
        <CardImage
          {...getImageProps(thumbnailUrl)}
          alt={displayName}
        />
        {/* 2026 배지 (예시 - 실제 데이터에 따라 조건부 렌더링) */}
        {false && <Badge>2026</Badge>}
      </CardImageWrapper>

      <CardContent>
        <RestaurantName>{displayName}</RestaurantName>

        {address && (
          <Address>{address}</Address>
        )}

        <RatingSection>
          {hasRating ? (
            <>
              <StarIcon><FaStar /></StarIcon>
              <RatingValue>{displayRating}</RatingValue>
              <ReviewCount>({displayReviewCount})</ReviewCount>
            </>
          ) : (
            <EvaluatingBadge>평가중</EvaluatingBadge>
          )}
        </RatingSection>

        {displayContent && (
          <Description>{displayContent}</Description>
        )}

        <StatsSection>
          {viewCount > 0 && (
            <StatItem>
              <StatIcon><FaEye /></StatIcon>
              <StatValue>{viewCount.toLocaleString()}</StatValue>
            </StatItem>
          )}
          {likeCount > 0 && (
            <StatItem>
              <StatIcon><FaHeart /></StatIcon>
              <StatValue>{likeCount.toLocaleString()}</StatValue>
            </StatItem>
          )}
          {commentCount > 0 && (
            <StatItem>
              <StatIcon><FaComment /></StatIcon>
              <StatValue>{commentCount.toLocaleString()}</StatValue>
            </StatItem>
          )}
        </StatsSection>
      </CardContent>
    </CardContainer>
  );
};

export default RestaurantCard;
