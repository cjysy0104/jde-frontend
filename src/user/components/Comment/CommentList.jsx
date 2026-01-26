import React, { useEffect, useState, useCallback } from 'react';
import Comment from './Comment';
import {
  CommentSection,
  CommentHeader,
  CommentCount,
  CommentListContainer,
  CommentInputSection,
  CommentInputWrapper,
  CommentInput,
  SubmitButton,
  Pagination,
  PageButton
} from './CommentList.styled';
import { commentApi } from '../../../utils/commentApi';

const CommentList = ({ reviewNo }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!reviewNo) return;

    try {
      setLoading(true);

      const response = await commentApi.getCommentListById({
        reviewNo,
        currentPage,
      });

      const data = response.data;
      console.log(response);

      setComments(data?.comments ?? []);
      setPageInfo(data?.pageInfo ?? null);
    } catch (e) {
      console.error(e);
      setComments([]);
      setPageInfo(null);
    } finally {
      setLoading(false);
    }
  }, [reviewNo, currentPage]);

  // reviewNo 바뀌면 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [reviewNo]);

  // 목록 조회
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleLikeComment = (commentNo) => {
    setComments(prev =>
      prev.map(comment =>
        comment.commentNo === commentNo
          ? {
              ...comment,
              isLiked: comment.isLiked === 'Y' ? 'N' : 'Y',
              likeCount:
                comment.isLiked === 'Y'
                  ? comment.likeCount - 1
                  : comment.likeCount + 1
            }
          : comment
      )
    );
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      // TODO: 댓글 등록 API가 있으면 여기서 호출
      await commentApi.createComment({ reviewNo, content: newComment });

      setNewComment('');

        if (currentPage !== 1) {
            setCurrentPage(1); 
        } else {
            fetchComments();
        }
    } catch (e) {
      console.error(e);
    }
  };

  const maxPage = pageInfo?.maxPage ?? 1;
  const totalCount = pageInfo?.listCount ?? comments.length;

    const handleDeleteComment = async (commentNo) => {
    if (!window.confirm('댓글을 삭제할까요?')) return;

    try {
        await commentApi.deleteCommentById({ commentNo });
        setComments(prev => prev.filter(c => c.commentNo !== commentNo));

        // totalCount도 pageInfo 기반이면 재조회가 더 안전하지만 일단 UI만 줄이려면:
        setPageInfo(prev => prev ? { ...prev, listCount: Math.max(0, prev.listCount - 1) } : prev);
    } catch (e) {
        console.error(e);
    }
    };

    const handleUpdateComment = async (commentNo, content) => {
    try {
        await commentApi.updateComment({ commentNo, content });

        setComments(prev =>
        prev.map(c => (c.commentNo === commentNo ? { ...c, content } : c))
        );
    } catch (e) {
        console.error(e);
    }
    };


  return (
    <CommentSection>
      <CommentHeader>
        <CommentCount>댓글 | {totalCount}</CommentCount>
      </CommentHeader>

      <CommentListContainer>
        {loading ? (
          <div>로딩중...</div>
        ) : comments.length === 0 ? (
          <div>댓글이 없습니다.</div>
        ) : (
          comments.map(comment => (
            <Comment
              key={comment.commentNo}
              comment={comment}
              onLike={handleLikeComment}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          ))
        )}
      </CommentListContainer>

      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          이전
        </PageButton>

        <PageButton disabled>
          {currentPage} / {maxPage}
        </PageButton>

        <PageButton
          disabled={currentPage >= maxPage}
          onClick={() => setCurrentPage(p => Math.min(maxPage, p + 1))}
        >
          다음
        </PageButton>
      </Pagination>

      <CommentInputSection>
        <CommentInputWrapper>
          <CommentInput
            placeholder="댓글을 작성 해주세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <SubmitButton
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
          >
            등록
          </SubmitButton>
        </CommentInputWrapper>
      </CommentInputSection>
    </CommentSection>
  );
};

export default CommentList;
