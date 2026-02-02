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
  NickNameText,
} from './styles';


const Header = () => {
  const navigate = useNavigate();

  // 인증 상태 가져오기
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();        // AuthContext에서 스토리지 + 상태 초기화
    navigate("/");         // 메인 화면으로 이동
  };

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
              
              <NickNameText>{nickname}</NickNameText>
              <LogoText>님 환영합니다.</LogoText>
              <AuthButton onClick={() => navigate('/my')}>
                마이페이지
              </AuthButton>
              <AuthButton onClick={handleLogout}>
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