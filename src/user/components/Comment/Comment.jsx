import React, { useState } from 'react';
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
  LikeCount,
  ActionGroup,
  DeleteButton,
  UpdateButton,
  EditTextarea,
  EditActions,
  SaveButton,
  CancelButton,
} from './Comment.styled';

const Comment = ({ comment, onLike, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  const startEdit = () => {
    setEditValue(comment.content);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditValue(comment.content);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const v = editValue.trim();
    if (!v) return;
    onUpdate(comment.commentNo, v);
    setIsEditing(false);
  };

  return (
    <CommentItem>
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

          <ActionGroup>
            <ReportButton>신고</ReportButton>

            {comment.isOwner === 'Y' && (
              <>
                {!isEditing ? (
                  <UpdateButton onClick={startEdit}>수정</UpdateButton>
                ) : null}

                <DeleteButton onClick={() => onDelete(comment.commentNo)}>
                  삭제
                </DeleteButton>
              </>
            )}
          </ActionGroup>
        </CommentTop>

        {!isEditing ? (
          <CommentText>{comment.content}</CommentText>
        ) : (
          <>
            <EditTextarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              maxLength={500}
            />
            <EditActions>
              <SaveButton onClick={saveEdit} disabled={!editValue.trim()}>
                저장
              </SaveButton>
              <CancelButton onClick={cancelEdit}>취소</CancelButton>
            </EditActions>
          </>
        )}

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
