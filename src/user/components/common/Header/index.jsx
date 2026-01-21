import React from 'react';
import { useNavigate } from 'react-router';
import { FaUtensils } from 'react-icons/fa';
import logo from '../../../../assets/logo.png';

import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  LogoImage,
  LogoText,
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

        

        <AuthButtons>
          <AuthButton onClick={() => navigate('/login')}>
            로그인
          </AuthButton>
          <AuthButton>
            회원가입
          </AuthButton>
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;