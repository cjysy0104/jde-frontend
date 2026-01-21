import styled from 'styled-components';

export const CommentsContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CommentsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 20px 0;
`;

export const CommentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  th {
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;
    
    &:first-child {
      width: 70%;
    }
    
    &:last-child {
      width: 30%;
    }
  }
`;

export const TableRow = styled.tr`
  td {
    padding: 12px 0;
    vertical-align: top;
  }
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

export const CommentDate = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;
