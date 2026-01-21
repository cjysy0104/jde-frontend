import { createContext, useEffect, useState } from "react";
import { authStorage } from "../../../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    memberNo: null,
    memberName: null,
    role: null,
    isAuthenticated: false,
  });

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

  const logout = () => {
    authStorage.clear();
    setAuth({
      memberNo: null,
      memberName: null,
      role: null,
      isAuthenticated: false,
    });
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
