import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminPage from "./admin/pages/AdminPage";
import UserPage from "./user/pages/UserPage";
import LoginPage from "./user/pages/LoginPage";

import UserHome from "./user/UserHome";

import MyLayout from "./user/components/myPage/MyLayout.jsx";
import MyProfileViewPage from "./user/components/myPage/profiles/MyProfileViewPage.jsx";
import MyProfilePage from "./user/components/myPage/profiles/MyProfilePage.jsx";
import MyListPage from "./user/components/myPage/lists/MyListPage.jsx";
import MyBookmarksPage from "./user/components/myPage/bookmarks/MyBookmarksPage.jsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ 헤더/푸터 있는 유저 레이아웃 */}
        <Route path="/" element={<UserPage />}>
          <Route index element={<UserHome />} />

          {/* ✅ my 는 /user 붙이지 말고 /my 로 통일 */}
          <Route path="my" element={<MyLayout />}>
            <Route index element={<MyProfileViewPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="list" element={<MyListPage />} />
            <Route path="bookmarks" element={<MyBookmarksPage />} />
          </Route>
        </Route>

        {/* ✅ 혹시 /user로 들어오면 / 로 리다이렉트 */}
        <Route path="/user/*" element={<Navigate to="/" replace />} />

        {/* 기타 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
