import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../../../assets/logo.png';
import { AuthContext } from '../../context/AuthContext';

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

  // 인증 상태 가져오기
  const { auth, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate('/')}>
          <LogoImage src={Logo1} alt="JUST DO EAT" />
          <LogoText>JUST DO EAT</LogoText>
        </LogoSection>

        <AuthButtons>
          {/* 비로그인 상태 */}
          {!auth.isAuthenticated && (
            <>
              <AuthButton onClick={() => navigate('/login')}>
                로그인
              </AuthButton>
              <AuthButton onClick={() => navigate('/signup')}>
                회원가입
              </AuthButton>
            </>
          )}

          {/* 로그인 상태 */}
          {auth.isAuthenticated && (
            <>
              <AuthButton onClick={() => navigate('/mypage')}>
                마이페이지
              </AuthButton>
              <AuthButton onClick={logout}>
                로그아웃
              </AuthButton>
            </>
          )}
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
