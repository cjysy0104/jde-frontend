import { createContext, useCallback, useEffect, useState } from "react";
import { authStorage } from "../../../utils/apiClient";
import { authApi } from "../../../utils/authApi";

export const AuthContext = createContext();

const EMPTY_AUTH = {
  memberNo: null,
  memberName: null,
  role: null,
  isAuthenticated: false,
  isInitialized: false,
};

// 로컬스토리지 기준으로 auth 상태를 재구성
function buildAuthFromStorage() {
  const token = authStorage.getToken?.();
  const refreshToken = authStorage.getRefreshToken?.();
  const memberInfo = authStorage.getMemberInfo?.();

  if (token && refreshToken && memberInfo) {
    return {
      memberNo: memberInfo.memberNo ?? null,
      memberName: memberInfo.memberName ?? null,
      role: memberInfo.role ?? null,
      isAuthenticated: true,
      isInitialized: true,
    };
  }

  return { ...EMPTY_AUTH, isInitialized: true };
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(EMPTY_AUTH);

  // 공통: 스토리지 기준으로 state 동기화
  const syncAuth = useCallback(() => {
    setAuth(buildAuthFromStorage());
  }, []);

  // 로그아웃 (API 호출은 시도하되 실패해도 클라이언트 로그아웃 진행)
  // 주의: 여기서는 리다이렉트(강제 이동)를 하지 않음.
  // 이동이 필요하면 호출하는 쪽에서 navigate 또는 location 변경을 수행.
  const logout = useCallback(async () => {
    const memberInfo = authStorage.getMemberInfo?.();
    const refreshToken = authStorage.getRefreshToken?.();

    if (memberInfo?.email && refreshToken) {
      try {
        await authApi.logout({
          email: memberInfo.email,
          refreshToken,
        });
      } catch (e) {
        console.warn("Logout API failed:", e);
      }
    }

    authStorage.clear();
    setAuth({ ...EMPTY_AUTH, isInitialized: true });

    // 헤더/전역 상태 즉시 갱신 트리거
    window.dispatchEvent(new Event("authChanged"));
  }, []);

  const login = useCallback((loginData) => {
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
      isInitialized: true,
    });

    // 헤더/전역 상태 갱신 트리거
    window.dispatchEvent(new Event("authChanged"));
  }, []);

  // 새로고침 시 자동 로그인/초기화
  useEffect(() => {
    syncAuth();
  }, [syncAuth]);

  // ✅ authChanged / storage 이벤트를 구독해서 UI(헤더 포함)가 즉시 동기화되게 함
  useEffect(() => {
    const handler = () => syncAuth();

    window.addEventListener("authChanged", handler);
    window.addEventListener("storage", handler); // 다른 탭/창 동기화까지 원하면 유지

    return () => {
      window.removeEventListener("authChanged", handler);
      window.removeEventListener("storage", handler);
    };
  }, [syncAuth]);

  // ✅ 강제 로그아웃(토큰 만료 등): 상태 초기화 + 필요하면 리다이렉트
  useEffect(() => {
    const handler = (e) => {
      const redirectTo = e?.detail?.redirectTo; // 선택
      authStorage.clear();
      setAuth({ ...EMPTY_AUTH, isInitialized: true });
      window.dispatchEvent(new Event("authChanged"));

      if (redirectTo) {
        window.location.replace(redirectTo);
      }
    };

    window.addEventListener("auth:forceLogout", handler);
    return () => window.removeEventListener("auth:forceLogout", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
