import React from 'react';
import { useNavigate } from 'react-router';
import { FaUtensils } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  LogoImage,
  LogoText,
  NavList,
  NavItem,
  NavLink,
  ActiveIndicator,
  AuthButtons,
  AuthButton,
} from './styles';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection>
          <LogoImage src={logo} alt="JUST DO EAT" />
          <LogoText>JUST DO EAT</LogoText>
        </LogoSection>
        
        <NavList>
          <NavItem>
            <NavLink active>
              Home
              <ActiveIndicator />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>리뷰조회</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>지도검색</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>미식대장</NavLink>
          </NavItem>
        </NavList>
        
        <AuthButtons>
          <AuthButton onClick={() => navigate('/login')}>로그인</AuthButton>
          <AuthButton>회원가입</AuthButton>
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
