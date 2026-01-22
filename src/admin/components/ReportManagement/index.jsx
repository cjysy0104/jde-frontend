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
  StatusBadge,
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
} from '../shared/styles';
import {
  TabContainer,
  TabButton,
  ProcessButton,
} from './styles';

const ReportManagement = ({ searchKeyword = '' }) => {
  const [activeTab, setActiveTab] = useState('comment'); // 'comment' or 'review'
  const [commentReports, setCommentReports] = useState([]);
  const [reviewReports, setReviewReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 댓글 신고 목록 조회
  const fetchCommentReports = async (page = 1, keyword = '') => {
    setLoading(true);
    try {
      const response = keyword
        ? await adminApi.searchCommentReports(keyword, page)
        : await adminApi.getCommentReports(page);
      
      if (response.success && response.data) {
        setCommentReports(response.data.list || []);
        setTotalPages(response.data.pageInfo?.maxPage || 1);
        setCurrentPage(response.data.pageInfo?.currentPage || 1);
      }
    } catch (error) {
      console.error('댓글 신고 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 신고 목록 조회
  const fetchReviewReports = async (page = 1, keyword = '') => {
    setLoading(true);
    try {
      const response = keyword
        ? await adminApi.searchReviewReports(keyword, page)
        : await adminApi.getReviewReports(page);
      
      if (response.success && response.data) {
        setReviewReports(response.data.list || []);
        setTotalPages(response.data.pageInfo?.maxPage || 1);
        setCurrentPage(response.data.pageInfo?.currentPage || 1);
      }
    } catch (error) {
      console.error('리뷰 신고 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 탭 변경 시 해당 탭의 데이터 로드
  useEffect(() => {
    if (activeTab === 'comment') {
      fetchCommentReports(1, searchKeyword);
    } else {
      fetchReviewReports(1, searchKeyword);
    }
  }, [activeTab]);

  // 검색어 변경 시 현재 탭의 데이터 다시 검색
  useEffect(() => {
    if (activeTab === 'comment') {
      fetchCommentReports(1, searchKeyword);
    } else {
      fetchReviewReports(1, searchKeyword);
    }
  }, [searchKeyword]);

  const handlePageChange = (page) => {
    if (activeTab === 'comment') {
      fetchCommentReports(page, searchKeyword);
    } else {
      fetchReviewReports(page, searchKeyword);
    }
  };

  const handleViewDetail = async (reportNo) => {
    try {
      const response = activeTab === 'comment'
        ? await adminApi.getCommentReportDetail(reportNo)
        : await adminApi.getReviewReportDetail(reportNo);
      
      if (response.success && response.data) {
        setSelectedReport(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('신고 상세 조회 실패:', error);
    }
  };

  const handleProcessReport = async (reportProcess) => {
    if (!selectedReport) return;

    try {
      const response = activeTab === 'comment'
        ? await adminApi.processCommentReport(selectedReport.commentReportNo, reportProcess)
        : await adminApi.processReviewReport(selectedReport.reviewReportNo, reportProcess);
      
      if (response.success) {
        setIsModalOpen(false);
        setSelectedReport(null);
        // 목록 새로고침
        if (activeTab === 'comment') {
          fetchCommentReports(currentPage, searchKeyword);
        } else {
          fetchReviewReports(currentPage, searchKeyword);
        }
      }
    } catch (error) {
      console.error('신고 처리 실패:', error);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Y') return { text: '대기중', color: '#f59e0b' };
    return { text: '처리완료', color: '#10b981' };
  };

  const getProcessStatus = (process) => {
    if (!process) return '대기중';
    if (process === 'RESOLVED') return '승인';
    if (process === 'REJECTED') return '거부';
    return process;
  };

  const currentReports = activeTab === 'comment' ? commentReports : reviewReports;

  return (
    <ManagementContainer>
      <ManagementHeader>
        <ManagementTitle>신고 관리</ManagementTitle>
      </ManagementHeader>

      <TabContainer>
        <TabButton
          $active={activeTab === 'comment'}
          onClick={() => setActiveTab('comment')}
        >
          댓글 신고
        </TabButton>
        <TabButton
          $active={activeTab === 'review'}
          onClick={() => setActiveTab('review')}
        >
          리뷰 신고
        </TabButton>
      </TabContainer>

      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>신고번호</TableHeader>
              <TableHeader>신고자</TableHeader>
              {activeTab === 'comment' ? (
                <>
                  <TableHeader>댓글 내용</TableHeader>
                  <TableHeader>리뷰번호</TableHeader>
                </>
              ) : (
                <TableHeader>리뷰 내용</TableHeader>
              )}
              <TableHeader>신고 카테고리</TableHeader>
              <TableHeader>처리 상태</TableHeader>
              <TableHeader>신고일</TableHeader>
              <TableHeader>작업</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={activeTab === 'comment' ? 8 : 7} style={{ textAlign: 'center', padding: '40px' }}>
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : currentReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={activeTab === 'comment' ? 8 : 7} style={{ textAlign: 'center', padding: '40px' }}>
                  신고 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              currentReports.map((report) => (
                <TableRow key={report.commentReportNo || report.reviewReportNo}>
                  <TableCell>{report.commentReportNo || report.reviewReportNo}</TableCell>
                  <TableCell>{report.memberNickname}</TableCell>
                  {activeTab === 'comment' ? (
                    <>
                      <TableCell style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {report.commentContent}
                      </TableCell>
                      <TableCell>{report.reviewNo}</TableCell>
                    </>
                  ) : (
                    <TableCell style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {report.reviewContent}
                    </TableCell>
                  )}
                  <TableCell>{report.reportCategoryTitle}</TableCell>
                  <TableCell>
                    <StatusBadge color={report.status === 'Y' ? '#f59e0b' : '#10b981'}>
                      {getProcessStatus(report.reportProcess)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{new Date(report.createdAt).toLocaleDateString('ko-KR')}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleViewDetail(report.commentReportNo || report.reviewReportNo)}>
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

      {isModalOpen && selectedReport && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>신고 상세 정보</ModalHeader>
            <ModalBody>
              <DetailSection>
                <DetailLabel>신고번호:</DetailLabel>
                <DetailValue>{selectedReport.commentReportNo || selectedReport.reviewReportNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>신고자:</DetailLabel>
                <DetailValue>{selectedReport.memberNickname}</DetailValue>
              </DetailSection>
              {activeTab === 'comment' ? (
                <>
                  <DetailSection>
                    <DetailLabel>댓글 내용:</DetailLabel>
                    <DetailValue>{selectedReport.commentContent}</DetailValue>
                  </DetailSection>
                  <DetailSection>
                    <DetailLabel>리뷰번호:</DetailLabel>
                    <DetailValue>{selectedReport.reviewNo}</DetailValue>
                  </DetailSection>
                </>
              ) : (
                <DetailSection>
                  <DetailLabel>리뷰 내용:</DetailLabel>
                  <DetailValue>{selectedReport.reviewContent}</DetailValue>
                </DetailSection>
              )}
              <DetailSection>
                <DetailLabel>신고 카테고리:</DetailLabel>
                <DetailValue>{selectedReport.reportCategoryTitle}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>신고 내용:</DetailLabel>
                <DetailValue>{selectedReport.reportContent}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>처리 상태:</DetailLabel>
                <DetailValue>{getProcessStatus(selectedReport.reportProcess)}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>신고일:</DetailLabel>
                <DetailValue>{new Date(selectedReport.createdAt).toLocaleString('ko-KR')}</DetailValue>
              </DetailSection>
            </ModalBody>
            <ModalFooter>
              {selectedReport.status === 'Y' &&
                selectedReport.reportProcess !== 'RESOLVED' &&
                selectedReport.reportProcess !== 'REJECTED' && (
                  <>
                    <ProcessButton
                      onClick={() => handleProcessReport('RESOLVED')}
                      style={{ backgroundColor: '#10b981' }}
                    >
                      승인
                    </ProcessButton>
                    <ProcessButton
                      onClick={() => handleProcessReport('REJECTED')}
                      style={{ backgroundColor: '#ef4444' }}
                    >
                      거부
                    </ProcessButton>
                  </>
                )}
              <ProcessButton onClick={() => setIsModalOpen(false)}>
                닫기
              </ProcessButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ManagementContainer>
  );
};

export default ReportManagement;
