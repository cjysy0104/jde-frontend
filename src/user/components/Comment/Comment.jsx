import React, { useState, useContext } from 'react';
import { Heart } from 'lucide-react';
import ReportModal from "../report/ReportModal";
import { reportApi } from "../../../utils/reportApi";
import CommentEditor from "./CommentEditor";
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
import { AuthContext } from '../context/AuthContext';

const Comment = ({ comment, onLike, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [reportOpen, setReportOpen] = useState(false);


  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth?.isAuthenticated;
  const isAuthor =
    auth?.isAuthenticated &&
    comment &&
    auth.memberNo === comment.memberNo;

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

            {isLoggedIn && (
              <>
              {comment.isOwner === 'N' && (
              <ReportButton onClick={() => setReportOpen(true)}>신고</ReportButton>
              )}
  
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
              
              </>
            )}
          </ActionGroup>
        </CommentTop>

        {!isEditing ? (
          <CommentText>{comment.content}</CommentText>
        ) : (
          <CommentEditor
            value={editValue}
            onChange={setEditValue}
            onSave={saveEdit}
            onCancel={cancelEdit}
            maxLength={500}
          />
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
      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        targetLabel="댓글"
        targetTitle={comment?.content ? comment.content.slice(0, 40) : ""}
        targetWriter={comment?.nickname}
        onSubmit={({ reportCategoryNo, reportContent }) =>
          reportApi.createCommentReport({
            commentNo: comment.commentNo,
            reportCategoryNo,
            reportContent,
          })
        }
      />
    </CommentItem>
  );
};

export default Comment;
