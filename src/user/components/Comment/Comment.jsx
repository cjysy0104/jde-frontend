import React from 'react';
import { Heart } from 'lucide-react';
import {
  CommentItem,
  Avatar,
  CommentContent,
  CommentTop,
  UserInfo,
  Username,
  CommentDate,
  ReportButton,
  CommentText,
  CommentActions,
  LikeButton,
  LikeCount
} from './Comment.styled';

const Comment = ({ comment, onLike }) => {
  return (
    <CommentItem>
        {/* 프로필 사진 추가시 사용 */}
      <Avatar>
        {comment.profileImage ? (
          <img src={comment.profileImage} alt={comment.nickname} />
        ) : (
          <span style={{ fontSize: '16px', color: '#999' }}>👤</span>
        )}
      </Avatar>

      <CommentContent>
        <CommentTop>
          <UserInfo>
            <Username>{comment.nickname}</Username>
          </UserInfo>
          <ReportButton>신고</ReportButton>
        </CommentTop>

        <CommentText>{comment.content}</CommentText>

        <CommentActions>
          <LikeButton onClick={() => onLike(comment.commentNo)}>
            <Heart
              size={16}
              fill={comment.isLiked === 'Y' ? '#ff6b6b' : 'none'}
              color={comment.isLiked === 'Y' ? '#ff6b6b' : '#666'}
            />
            <LikeCount>{comment.likeCount}</LikeCount>
          </LikeButton>
          <CommentDate>{comment.createDate}</CommentDate>
        </CommentActions>
      </CommentContent>
    </CommentItem>
  );
};

export default Comment;