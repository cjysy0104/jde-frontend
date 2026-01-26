import React, { useContext, useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '../../../../assets/logo1.png';
import { AuthContext } from '../../context/AuthContext';
import { authStorage } from "../../../../utils/apiClient";

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
  const readNickname = () => {
    try {
      const info = authStorage.getMemberInfo();
      return info?.nickname || "회원";
    } catch {
      return "회원";
    }
  };

  const [nickname, setNickname] = useState(readNickname());

  useEffect(() => {
    const sync = () => setNickname(readNickname());
    window.addEventListener("storage", sync);
    window.addEventListener("authChanged", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChanged", sync);
    };
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate('/')}>
          <LogoImage src={Logo1} alt="JUST DO EAT" />
          
        </LogoSection>

        <AuthButtons>
          {/* 비로그인 상태 */}
          {!auth.isAuthenticated ? (
            <>
              <AuthButton onClick={() => navigate('/login')}>
                로그인
              </AuthButton>
              <AuthButton onClick={() => navigate('/signup')}>
                회원가입
              </AuthButton>
            </>
          ) : (
            <>
              <LogoText>“{nickname}”님 환영합니다.</LogoText>
              <AuthButton onClick={() => navigate('/my')}>
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