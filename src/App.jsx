import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminPage from "./admin/pages/AdminPage";
import UserPage from "./user/pages/UserPage";
import LoginPage from "./user/pages/LoginPage";
import SignUpPage from "./user/pages/SignUpPage";

import UserHome from "./user/UserHome";

import MyLayout from "./user/components/myPage/MyLayout.jsx";
import MyProfileViewPage from "./user/components/myPage/profiles/MyProfileViewPage.jsx";
import MyProfilePage from "./user/components/myPage/profiles/MyProfilePage.jsx";
import MyListPage from "./user/components/myPage/lists/MyListPage.jsx";
import MyBookmarksPage from "./user/components/myPage/bookmarks/MyBookmarksPage.jsx";
import { AuthContext } from "./user/components/context/AuthContext.jsx";
import { useContext } from "react";
import "./App.css";
import NotFoundPage from "./user/pages/NotFoundPage.jsx";
import { authStorage } from "./utils/apiClient.js";

// 관리자 페이지 접근 권한 체크 컴포넌트
const AdminRoute = () => {  
  const { auth } = useContext(AuthContext);
  // 로그인하지 않았거나 role이 ADMIN이 아닌 경우 
 if (!auth.isAuthenticated || (auth.role !== 'ROLE_ADMIN' && auth.role !== 'ADMIN'))
   {    return <Navigate to="/" replace />;  }  return <AdminPage />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminRoute />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<UserPage />}>
          <Route index element={<UserHome />} />

          <Route path="my" element={<MyLayout />}>
            <Route index element={<MyProfileViewPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="list" element={<MyListPage />} />
            <Route path="bookmarks" element={<MyBookmarksPage />} />
          </Route>
        </Route>

        <Route path="/user/*" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
