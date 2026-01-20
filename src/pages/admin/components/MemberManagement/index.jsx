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
  RoleSelect,
  DeleteButton,
} from '../shared/styles';

const MemberManagement = ({ searchKeyword: propSearchKeyword = '' }) => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async (page = 1, keyword = '') => {
    setLoading(true);
    try {
      const response = keyword
        ? await adminApi.searchMembers(keyword, page)
        : await adminApi.getMembers(page);
      
      if (response.success && response.data) {
        setMembers(response.data.list || []);
        setTotalPages(response.data.pageInfo?.maxPage || 1);
        setCurrentPage(response.data.pageInfo?.currentPage || 1);
      }
    } catch (error) {
      console.error('회원 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(1, propSearchKeyword);
  }, []);

  useEffect(() => {
    if (propSearchKeyword !== undefined && propSearchKeyword !== '') {
      fetchMembers(1, propSearchKeyword);
    } else if (propSearchKeyword === '') {
      fetchMembers(1, '');
    }
  }, [propSearchKeyword]);

  const handlePageChange = (page) => {
    fetchMembers(page, propSearchKeyword);
  };

  const handleViewDetail = async (memberNo) => {
    try {
      const response = await adminApi.getMemberDetail(memberNo);
      if (response.success && response.data) {
        setSelectedMember(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('회원 상세 조회 실패:', error);
    }
  };

  const handleRoleChange = async (memberNo, newRole) => {
    if (!window.confirm('회원 권한을 변경하시겠습니까?')) return;

    try {
      const response = await adminApi.updateMemberRole(memberNo, newRole);
      if (response.success) {
        setIsModalOpen(false);
        setSelectedMember(null);
        fetchMembers(currentPage, propSearchKeyword);
        alert('회원 권한이 변경되었습니다.');
      }
    } catch (error) {
      console.error('회원 권한 변경 실패:', error);
      alert('회원 권한 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (memberNo) => {
    if (!window.confirm('정말 이 회원을 삭제하시겠습니까?')) return;

    try {
      const response = await adminApi.deleteMember(memberNo);
      if (response.success) {
        setIsModalOpen(false);
        setSelectedMember(null);
        fetchMembers(currentPage, propSearchKeyword);
        alert('회원이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('회원 삭제 실패:', error);
      alert('회원 삭제에 실패했습니다.');
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'ROLE_ADMIN' || role === 'ADMIN') return { text: '관리자', color: '#ef4444' };
    if (role === 'ROLE_USER' || role === 'USER') return { text: '일반회원', color: '#3b82f6' };
    return { text: role, color: '#6b7280' };
  };

  return (
    <ManagementContainer>
      <ManagementHeader>
        <ManagementTitle>회원 관리</ManagementTitle>
      </ManagementHeader>

      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>회원번호</TableHeader>
              <TableHeader>이메일</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>닉네임</TableHeader>
              <TableHeader>전화번호</TableHeader>
              <TableHeader>권한</TableHeader>
              <TableHeader>가입일</TableHeader>
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
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                  회원이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.memberNo}>
                  <TableCell>{member.memberNo}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.memberName}</TableCell>
                  <TableCell>{member.nickname}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>
                    <StatusBadge color={getRoleBadge(member.role).color}>
                      {getRoleBadge(member.role).text}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{new Date(member.enrollDate).toLocaleDateString('ko-KR')}</TableCell>
                  <TableCell>
                    <ActionButton onClick={() => handleViewDetail(member.memberNo)}>
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

      {isModalOpen && selectedMember && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>회원 상세 정보</ModalHeader>
            <ModalBody>
              <DetailSection>
                <DetailLabel>회원번호:</DetailLabel>
                <DetailValue>{selectedMember.memberNo}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>이메일:</DetailLabel>
                <DetailValue>{selectedMember.email}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>이름:</DetailLabel>
                <DetailValue>{selectedMember.memberName}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>닉네임:</DetailLabel>
                <DetailValue>{selectedMember.nickname}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>전화번호:</DetailLabel>
                <DetailValue>{selectedMember.phone}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>권한:</DetailLabel>
                <RoleSelect
                  value={selectedMember.role}
                  onChange={(e) => handleRoleChange(selectedMember.memberNo, e.target.value)}
                >
                  <option value="ROLE_USER">일반회원</option>
                  <option value="ROLE_ADMIN">관리자</option>
                </RoleSelect>
              </DetailSection>
              <DetailSection>
                <DetailLabel>가입일:</DetailLabel>
                <DetailValue>{new Date(selectedMember.enrollDate).toLocaleString('ko-KR')}</DetailValue>
              </DetailSection>
              <DetailSection>
                <DetailLabel>상태:</DetailLabel>
                <DetailValue>{selectedMember.status === 'Y' ? '활성' : '비활성'}</DetailValue>
              </DetailSection>
            </ModalBody>
            <ModalFooter>
              <DeleteButton onClick={() => handleDelete(selectedMember.memberNo)}>
                회원 삭제
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

export default MemberManagement;
