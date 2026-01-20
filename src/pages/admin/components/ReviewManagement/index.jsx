import React, { useState, useEffect } from 'react';
import { adminApi } from '../../../../utils/api';
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

const ReviewManagement = ({ searchKeyword: propSearchKeyword = '' }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async (page = 1, keyword = '') => {
    setLoading(true);
    try {
      const response = keyword
        ? await adminApi.searchReviews(keyword, page)
        : await adminApi.getReviews(page);
      
      if (response.success && response.data) {
        setReviews(response.data.list || []);
        setTotalPages(response.data.pageInfo?.maxPage || 1);
        setCurrentPage(response.data.pageInfo?.currentPage || 1);
      }
    } catch (error) {
      console.error('리뷰 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1, propSearchKeyword);
  }, []);

  useEffect(() => {
    if (propSearchKeyword !== undefined && propSearchKeyword !== '') {
      fetchReviews(1, propSearchKeyword);
    } else if (propSearchKeyword === '') {
      fetchReviews(1, '');
    }
  }, [propSearchKeyword]);

  const handlePageChange = (page) => {
    fetchReviews(page, propSearchKeyword);
  };

  const handleViewDetail = async (reviewNo) => {
    try {
      const response = await adminApi.getReviewDetail(reviewNo);
      if (response.success && response.data) {
        setSelectedReview(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('리뷰 상세 조회 실패:', error);
    }
  };

  const handleDelete = async (reviewNo) => {
    if (!window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) return;

    try {
      const response = await adminApi.deleteReview(reviewNo);
      if (response.success) {
        setIsModalOpen(false);
        setSelectedReview(null);
        fetchReviews(currentPage, propSearchKeyword);
        alert('리뷰가 삭제되었습니다.');
      }
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  return (
    <ManagementContainer>
      <ManagementHeader>
        <ManagementTitle>리뷰 관리</ManagementTitle>
      </ManagementHeader>

      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>리뷰번호</TableHeader>
              <TableHeader>회원번호</TableHeader>
              <TableHeader>식당명</TableHeader>
              <TableHeader>리뷰 내용</TableHeader>
              <TableHeader>주소</TableHeader>
              <TableHeader>작성일</TableHeader>
              <TableHeader>상태</TableHeader>
              <TableHeader>작업</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                  리뷰가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.reviewNo}>
                  <TableCell>{review.reviewNo}</TableCell>
                  <TableCell>{review.memberNo}</TableCell>
                  <TableCell>{review.normalName || '-'}</TableCell>
                  <TableCell style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {review.reviewContent}
                  </TableCell>
                  <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {review.address || '-'}
                  </TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString('ko-KR')}</TableCell>
                  <TableCell>{review.status === 'Y' ? '활성' : '삭제됨'}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleViewDetail(review.reviewNo)}>
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
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </PaginationContainer>

      {isModalOpen && selectedReview && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>리뷰 상세 정보</ModalHeader>
            <ModalBody>
              <DetailSection>
                <DetailLabel>리뷰번호:</DetailLabel>
                <DetailValue>{selectedReview.reviewNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>회원번호:</DetailLabel>
                <DetailValue>{selectedReview.memberNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>식당번호:</DetailLabel>
                <DetailValue>{selectedReview.restaurantNo || '-'}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>식당명:</DetailLabel>
                <DetailValue>{selectedReview.normalName || '-'}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>주소:</DetailLabel>
                <DetailValue>{selectedReview.address || '-'}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>리뷰 내용:</DetailLabel>
                <DetailValue style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {selectedReview.reviewContent}
                </DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>작성일:</DetailLabel>
                <DetailValue>{new Date(selectedReview.createdAt).toLocaleString('ko-KR')}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>상태:</DetailLabel>
                <DetailValue>{selectedReview.status === 'Y' ? '활성' : '삭제됨'}</DetailValue>
              </DetailSection>
            </ModalBody>
            <ModalFooter>
              <DeleteButton onClick={() => handleDelete(selectedReview.reviewNo)}>
                리뷰 삭제
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

export default ReviewManagement;
