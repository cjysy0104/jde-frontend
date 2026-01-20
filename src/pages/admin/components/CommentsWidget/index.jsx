import React from 'react';
import {
  CommentsContainer,
  CommentsTitle,
  CommentsTable,
  TableHeader,
  TableRow,
  CommentText,
  CommentDate,
} from './styles';

const CommentsWidget = () => {
  return (
    <CommentsContainer>
      <CommentsTitle>Comments</CommentsTitle>
      <CommentsTable>
        <TableHeader>
          <th>Comments</th>
          <th>Date</th>
        </TableHeader>
        <tbody>
          <TableRow>
            <td>
              <CommentText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Ut enim ad minim veniam, quis nostrud exercitation
              </CommentText>
            </td>
            <td>
              <CommentDate>2024-01-15</CommentDate>
            </td>
          </TableRow>
        </tbody>
      </CommentsTable>
    </CommentsContainer>
  );
};

export default CommentsWidget;
