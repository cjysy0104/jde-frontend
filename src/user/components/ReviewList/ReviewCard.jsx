import React, { useState, useContext } from 'react';
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
  ViewCount
} from './ReviewCard.styled';
import { useNavigate } from 'react-router';

import CommentModal from "../Comment/CommentModal";
import CommentList from "../Comment/CommentList";
import { AuthContext } from '../context/AuthContext';

const ReviewCard = ({ review, onLike, onBookmark }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isLoggedIn = !!auth?.isAuthenticated;

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleClick = () => {
    navigate(`/reviews/${review.reviewNo}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if(!isLoggedIn){
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    onLike(review.reviewNo);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if(!isLoggedIn){
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    onBookmark(review.reviewNo);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setIsCommentOpen(true); 
  };

  return (
    <>
      <Card onClick={handleClick}>
        <FoodImageContainer>
          <FoodImage
            {...getImageProps(review.thumbnailUrl)}
            alt={review.restaurantName}
          />
          <ProfileImage>
            <img src='/src/assets/logo.png' alt="Profile" />
          </ProfileImage>
        </FoodImageContainer>

        <CardContent>
          <ActionBar>
            <ActionButton onClick={handleLikeClick}>
              <Heart
                size={20}
                fill={review.isLiked === 'Y' ? "#ff6b6b" : "none"}
                color={review.isLiked === 'Y' ? "#ff6b6b" : "#666"}
              />
              {review.likeCount}
            </ActionButton>

            <ActionButton onClick={handleCommentClick}>
              <MessageCircle size={20} color="#666" />
              {review.commentCount}
            </ActionButton>

            <ActionButton onClick={handleBookmarkClick}>
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

      <CommentModal
        open={isCommentOpen}
        title="댓글"
        onClose={() => setIsCommentOpen(false)}
      >
        <CommentList reviewNo={review.reviewNo} />
      </CommentModal>
    </>
  );
};

export default ReviewCard;
