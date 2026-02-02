import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import ReportManagement from '../components/ReportManagement';
import MemberManagement from '../components/MemberManagement';
import CommentManagement from '../components/CommentManagement';
import ReviewManagement from '../components/ReviewManagement';
import DefaultImageManagement from '../components/DefaultImageManagement'; 
import RankingManagement from '../components/RankingManagement'; 
import { AdminPageContainer, MainContent } from './styles';
import { authStorage } from '../../utils/apiClient';
import { AuthContext } from '../../user/components/context/AuthContext';
import { Navigate } from 'react-router';

const AdminPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const role = authStorage.getMemberInfo()?.role;

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchKeyword, setSearchKeyword] = useState('');

  if (!auth.isInitialized) return <h3>Loading..</h3>;
  if (!auth.isAuthenticated || role !== 'ROLE_ADMIN') return <Navigate to="/" replace />;

  const handleMenuClick = (page) => {
    setCurrentPage(page);
    setSearchKeyword('');
  };

  const handleSearch = (keyword) => setSearchKeyword(keyword);

  const handleLogout = () => {
    logout({ redirectTo: '/login' });
  };

  const getSearchPlaceholder = () => {
    switch (currentPage) {
      case 'reports':
        return '신고 내용, 댓글/리뷰 내용, 카테고리, 신고자명으로 검색...';
      case 'members':
        return '이메일, 이름, 닉네임, 전화번호로 검색...';
      case 'comments':
        return '댓글 내용, 작성자명으로 검색...';
      case 'reviews':
        return '리뷰 내용, 식당명으로 검색...';
      case 'defaultImages':
      case 'ranking':
        return 'Search or type a command';
      default:
        return 'Search or type a command';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <ReportManagement searchKeyword={searchKeyword} />;
      case 'members':
        return <MemberManagement searchKeyword={searchKeyword} />;
      case 'comments':
        return <CommentManagement searchKeyword={searchKeyword} />;
      case 'reviews':
        return <ReviewManagement searchKeyword={searchKeyword} />;
      case 'defaultImages':
        return <DefaultImageManagement />;
      case 'ranking':
        return <RankingManagement />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminPageContainer>
      <Sidebar
        currentPage={currentPage}
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
      />
      <MainContent>
        <Header
          searchPlaceholder={getSearchPlaceholder()}
          onSearch={handleSearch}
          searchKeyword={searchKeyword}
        />
        {renderPage()}
      </MainContent>
    </AdminPageContainer>
  );
};

export default AdminPage;
