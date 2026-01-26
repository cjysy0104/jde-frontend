import React from 'react';
import { Heart, MessageCircle, Bookmark, Eye } from 'lucide-react';
import { getImageProps } from "../../../utils/image";
import {
  Card,
  FoodImageContainer,
  FoodImage,
  ProfileImage,
  CardContent,
  ActionBar,
  ActionButton,
  RestaurantName,
  UserInfo,
  Nickname,
  Rating,
  UpdateDate,
  Description,
  KeywordContainer,
  KeywordBadge,
  Footer,
  StatsContainer,
  StatItem,
  ViewCount
} from './ReviewCard.styled';

const ReviewCard = ({ review, onLike, onBookmark }) => {
  const liked = !!review.uiLiked;
  const marked = review.isMarked === "Y";
  return (
    <Card>
      <FoodImageContainer>
        <FoodImage 
          {...getImageProps(review.thumbnailUrl)}
          alt={review.restaurantName} />
        <ProfileImage>
          <img src='/src/assets/logo.png' alt="Profile" />
        </ProfileImage>
      </FoodImageContainer>

      <CardContent>
        <ActionBar>
          <ActionButton onClick={() => onLike(review.reviewNo)}>
            <Heart 
              size={20} 
              fill={review.isLiked === 'Y' ? "#ff6b6b" : "none"} 
              color={review.isLiked === 'Y' ? "#ff6b6b" : "#666"}
            />
            {review.likeCount}
          </ActionButton>
          <ActionButton>
            <MessageCircle size={20} color="#666" />
            {review.commentCount}
          </ActionButton>
          <ActionButton onClick={() => onBookmark(review.reviewNo)}>
            <Bookmark 
              size={20} 
              fill={review.isMarked === 'Y' ? "#333" : "none"} 
              color="#666"
            />
          </ActionButton>
        </ActionBar>

        <RestaurantName>{review.restaurantName}</RestaurantName>
        
        <UserInfo>
          <Nickname>{review.nickname}</Nickname>
          <Rating>⭐ {review.rating.toFixed(1)}</Rating>
        </UserInfo>

        <Description>{review.content}</Description>

        {review.keywords && review.keywords.length > 0 && (
          <KeywordContainer>
            {review.keywords.map((keyword) => (
              <KeywordBadge key={keyword.keywordNo}>
                #{keyword.keywordName}
              </KeywordBadge>
            ))}
          </KeywordContainer>
        )}

        <Footer>
          <StatsContainer>
            <UpdateDate>{review.updateDate}</UpdateDate>
          </StatsContainer>
          <ViewCount>
            <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {review.viewCount}
          </ViewCount>
        </Footer>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;