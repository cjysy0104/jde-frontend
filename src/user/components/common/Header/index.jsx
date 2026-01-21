import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../../../assets/logo.png";
import { authStorage } from "../../../../utils/api";

import {
  HeaderContainer,
  HeaderContent,
  LogoSection,
  LogoImage,
  LogoText,
  AuthButtons,
  AuthButton,
} from "./styles";

const Header = () => {
  const navigate = useNavigate();

  // authStorage 구현이 달라도 동작하게 안전하게 읽기
  const readMemberInfo = () => {
    try {
      if (authStorage?.getMemberInfo) return authStorage.getMemberInfo();
      const raw = localStorage.getItem("memberInfo");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const readAccessToken = () => {
    try {
      if (authStorage?.getToken) return authStorage.getToken();
      return localStorage.getItem("accessToken");
    } catch {
      return null;
    }
  };

  const [member, setMember] = useState(readMemberInfo());
  const isLoggedIn = useMemo(() => !!readAccessToken(), [member]); // member 변경 시 재평가

  // 로그인/로그아웃 후 헤더 즉시 갱신
  useEffect(() => {
    const sync = () => setMember(readMemberInfo());

    // 다른 탭 변경 감지
    window.addEventListener("storage", sync);
    // 같은 탭에서 로그인 성공 후 수동으로 발생시키는 이벤트
    window.addEventListener("authChanged", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChanged", sync);
    };
  }, []);

  const handleLogout = () => {
    // authStorage에 clear가 있으면 사용
    if (authStorage?.clear) {
      authStorage.clear();
    } else {
      // 없으면 localStorage 직접 제거(키 이름은 프로젝트에 맞게 조정)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("memberInfo");
    }

    // 헤더 갱신 이벤트
    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  const displayName = member?.nickname || member?.memberName || member?.email || "회원";

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoSection onClick={() => navigate("/")}>
          <LogoImage src={logo} alt="JUST DO EAT" />
          <LogoText>JUST DO EAT</LogoText>
        </LogoSection>

        <AuthButtons>
          {!isLoggedIn ? (
            <>
              <AuthButton onClick={() => navigate("/login")}>로그인</AuthButton>
              <AuthButton onClick={() => navigate("/signup")}>회원가입</AuthButton>
            </>
          ) : (
            <>
              <span
                style={{
                  marginRight: "12px",
                  fontSize: "13px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                {`"${displayName}"님 환영합니다!`}
              </span>
              <AuthButton onClick={() => navigate("/user/my")}>마이페이지</AuthButton>
              <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
            </>
          )}
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
