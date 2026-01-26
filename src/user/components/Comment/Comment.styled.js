import styled from 'styled-components';

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #999;
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #666;
  }
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0 0 10px 0;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #333;
  }
`;

export const LikeCount = styled.span`
  font-size: 13px;
  color: #666;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #ff6b6b;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #ff3b3b;
  }
`;

export const UpdateButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #666;
  }
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 70px;
  resize: vertical;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  outline: none;

  &:focus {
    border-color: #ddd;
  }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
`;

