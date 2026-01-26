import { createContext, useEffect, useState } from "react";
import { authStorage } from "../../../utils/apiClient";
import { authApi } from "../../../utils/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    memberNo: null,
    memberName: null,
    role: null,
    isAuthenticated: false,
  });

  // logout에 redirectTo 옵션을 받게(redirectTo ReferenceError 방지)
  const logout = async (options = {}) => {
    const { redirectTo = "/" } = options;

    const memberInfo = authStorage.getMemberInfo();
    const refreshToken = authStorage.getRefreshToken();

    if (memberInfo?.email && refreshToken) {
      try {
        await authApi.logout({
          email: memberInfo.email,
          refreshToken,
        });
      } catch (e) {
        // 로그아웃 API 실패해도 클라이언트 로그아웃은 진행
        console.warn("Logout API failed:", e);
      }
    }

    authStorage.clear();

    setAuth({
      memberNo: null,
      memberName: null,
      role: null,
      isAuthenticated: false,
    });

    window.location.href = redirectTo;
  };

  // 새로고침 시 자동 로그인
  useEffect(() => {
    const token = authStorage.getToken();
    const refreshToken = authStorage.getRefreshToken();
    const memberInfo = authStorage.getMemberInfo();

    if (token && refreshToken && memberInfo) {
      setAuth({
        memberNo: memberInfo.memberNo,
        memberName: memberInfo.memberName,
        role: memberInfo.role,
        isAuthenticated: true,
      });
    }
  }, []);

  // forceLogout 이벤트 핸들러에서 navigate/state 제거(현재 구조에서 불필요 + 충돌 가능)
  useEffect(() => {
    const handler = () => {
      logout({ redirectTo: "/login" });
    };

    window.addEventListener("auth:forceLogout", handler);
    return () => window.removeEventListener("auth:forceLogout", handler);
  }, []); // logout을 deps에 넣지 않음(필수 안정화)

  const login = (loginData) => {
    authStorage.setToken(loginData.accessToken);
    authStorage.setRefreshToken(loginData.refreshToken);

    authStorage.setMemberInfo({
      email: loginData.email,
      memberName: loginData.memberName,
      nickname: loginData.nickname,
      phone: loginData.phone,
      memberNo: loginData.memberNo,
      role: loginData.role,
      status: loginData.status,
      fileUrl: loginData.fileUrl,
      enrollDate: loginData.enrollDate,
    });

    setAuth({
      memberNo: loginData.memberNo,
      memberName: loginData.memberName,
      role: loginData.role,
      isAuthenticated: true,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
