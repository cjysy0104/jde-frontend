import React from 'react';
import { FaHome, FaFileAlt, FaUsers, FaComments, FaFlag, FaQuestionCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import {
  SidebarContainer,
  LogoSection,
  LogoImage,
  LogoText,
  MenuList,
  MenuItem,
  MenuIcon,
  MenuText,
  MenuChevron,
  HelpBadge,
  BottomMenu,
} from './styles';

const Sidebar = ({ currentPage, onMenuClick, onLogout }) => {
  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      onLogout?.();
    }
  };

  return (
    <SidebarContainer>
      <LogoSection>
        <LogoImage src={logo} alt="JUST DO EAT" />
        <LogoText>JUST DO EAT</LogoText>
      </LogoSection>
      
      <MenuList>
        <MenuItem 
          $active={currentPage === 'dashboard'}
          onClick={() => onMenuClick('dashboard')}
        >
          <MenuIcon><FaHome /></MenuIcon>
          <MenuText>Home</MenuText>
        </MenuItem>
        
        <MenuItem 
        $active={currentPage === 'reviews'}
        onClick={() => onMenuClick('reviews')}>
          <MenuIcon><FaFileAlt /></MenuIcon>
          <MenuText>리뷰 관리</MenuText>
          <MenuChevron><FaChevronDown /></MenuChevron>
        </MenuItem>
        
        <MenuItem 
        $active={currentPage === 'members'}
        onClick={() => onMenuClick('members')}>
          <MenuIcon><FaUsers /></MenuIcon>
          <MenuText>회원 관리</MenuText>
          <MenuChevron><FaChevronDown /></MenuChevron>
        </MenuItem>
        
        <MenuItem 
        $active={currentPage === 'comments'}
        onClick={() => onMenuClick('comments')}>
          <MenuIcon><FaComments /></MenuIcon>
          <MenuText>댓글관리</MenuText>
          <MenuChevron><FaChevronDown /></MenuChevron>
        </MenuItem>
        
        <MenuItem 
          $active={currentPage === 'reports'}
          onClick={() => onMenuClick('reports')}
        >
          <MenuIcon><FaFlag /></MenuIcon>
          <MenuText>신고관리</MenuText>
          <MenuChevron><FaChevronDown /></MenuChevron>
        </MenuItem>
      </MenuList>
      
      <BottomMenu>
        <MenuItem>
          <MenuIcon><FaQuestionCircle /></MenuIcon>
          <MenuText>Help</MenuText>
          <HelpBadge>8</HelpBadge>
        </MenuItem>
        
        <MenuItem onClick={handleLogout}>
          <MenuIcon><FaSignOutAlt /></MenuIcon>
          <MenuText>Logout</MenuText>
        </MenuItem>
      </BottomMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
