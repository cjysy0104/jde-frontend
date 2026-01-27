import styled from 'styled-components';

export const CommentSection = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #333;
`;

export const CommentCount = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const SortButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  
  &:hover {
    color: #333;
  }
`;

export const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CommentInputSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  outline: none;
  min-height: 80px;
  font-family: inherit;
  
  &:focus {
    border-color: #ff6b35;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const SubmitButton = styled.button`
  background-color: #ff6b35;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  height: fit-content;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e55a28;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const PageButton = styled.button`
  background-color: ${props => props.active ? '#ff6b35' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#ff6b35' : '#ddd'};
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  min-width: 32px;
  
  &:hover {
    background-color: ${props => props.active ? '#e55a28' : '#f5f5f5'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;