import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function RequireAuth() {
  const { auth } = useContext(AuthContext);

  // 초기화 전이면 깜빡임 방지용(원하면 로딩 컴포넌트)
  if (!auth.isInitialized) return null;

  if (!auth.isAuthenticated) {
    alert("로그인 후 이용해주세요.")
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
