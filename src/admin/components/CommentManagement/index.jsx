import React, { useState, useEffect } from 'react';
import { adminApi } from '../../../utils/adminApi';
import {
  ManagementContainer,
  ManagementHeader,
  ManagementTitle,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  PaginationContainer,
  PageButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DetailSection,
  DetailLabel,
  DetailValue,
  DeleteButton,
} from '../shared/styles';

const CommentManagement = ({ searchKeyword = '' }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (page = 1, keyword = '') => {
    setLoading(true);
    try {
      const response = keyword
        ? await adminApi.searchComments(keyword, page)
        : await adminApi.getComments(page);
      
      if (response.success && response.data) {
        setComments(response.data.list || []);
        setTotalPages(response.data.pageInfo?.maxPage || 1);
        setCurrentPage(response.data.pageInfo?.currentPage || 1);
      }
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchComments(1, searchKeyword);
  }, []);

  // 검색어가 변경되면 첫 페이지부터 다시 검색
  useEffect(() => {
    fetchComments(1, searchKeyword);
  }, [searchKeyword]);

  // 페이지 변경 시 현재 검색어 유지하며 해당 페이지 조회
  const handlePageChange = (page) => {
    fetchComments(page, searchKeyword);
  };

  const handleViewDetail = async (commentNo) => {
    try {
      const response = await adminApi.getCommentDetail(commentNo);
      if (response.success && response.data) {
        setSelectedComment(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('댓글 상세 조회 실패:', error);
    }
  };

  const handleDelete = async (commentNo) => {
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await adminApi.deleteComment(commentNo);
      if (response.success) {
        setIsModalOpen(false);
        setSelectedComment(null);
        fetchComments(currentPage, searchKeyword);
        alert('댓글이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  return (
    <ManagementContainer>
      <ManagementHeader>
        <ManagementTitle>댓글 관리</ManagementTitle>
      </ManagementHeader>

      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>댓글번호</TableHeader>
              <TableHeader>작성자</TableHeader>
              <TableHeader>댓글 내용</TableHeader>
              <TableHeader>리뷰번호</TableHeader>
              <TableHeader>작성일</TableHeader>
              <TableHeader>상태</TableHeader>
              <TableHeader>작업</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                  댓글이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.commentNo}>
                  <TableCell>{comment.commentNo}</TableCell>
                  <TableCell>{comment.author}</TableCell>
                  <TableCell style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {comment.commentContent}
                  </TableCell>
                  <TableCell>{comment.reviewNo}</TableCell>
                  <TableCell>{new Date(comment.commentDate).toLocaleDateString('ko-KR')}</TableCell>
                  <TableCell>{comment.status === 'Y' ? '활성' : '삭제됨'}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleViewDetail(comment.commentNo)}>
                      상세보기
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PageButton
            key={page}
            $active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </PaginationContainer>

      {isModalOpen && selectedComment && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>댓글 상세 정보</ModalHeader>
            <ModalBody>
              <DetailSection>
                <DetailLabel>댓글번호:</DetailLabel>
                <DetailValue>{selectedComment.commentNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>작성자:</DetailLabel>
                <DetailValue>{selectedComment.author}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>리뷰번호:</DetailLabel>
                <DetailValue>{selectedComment.reviewNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>댓글 내용:</DetailLabel>
                <DetailValue style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {selectedComment.commentContent}
                </DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>작성일:</DetailLabel>
                <DetailValue>{new Date(selectedComment.commentDate).toLocaleString('ko-KR')}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>상태:</DetailLabel>
                <DetailValue>{selectedComment.status === 'Y' ? '활성' : '삭제됨'}</DetailValue>
              </DetailSection>
            </ModalBody>
            <ModalFooter>
              <DeleteButton onClick={() => handleDelete(selectedComment.commentNo)}>
                댓글 삭제
              </DeleteButton>
              <ActionButton onClick={() => setIsModalOpen(false)}>
                닫기
              </ActionButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ManagementContainer>
  );
};

export default CommentManagement;
