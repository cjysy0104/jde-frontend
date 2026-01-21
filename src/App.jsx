import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminPage from "./admin/pages/AdminPage";
import UserPage from "./user/pages/UserPage";
import LoginPage from "./user/components/LoginPage";

import UserHome from "./user/UserHome";

import MyLayout from "./user/components/myPage/MyLayout.jsx";
import MyProfileViewPage from "./user/components/myPage/profiles/MyProfileViewPage.jsx";
import MyProfilePage from "./user/components/myPage/profiles/MyProfilePage.jsx";
import MyListPage from "./user/components/myPage/lists/MyListPage.jsx";
import MyBookmarksPage from "./user/components/myPage/bookmarks/MyBookmarksPage.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/user" element={<UserPage />}>
          <Route index element={<UserHome />} />

          <Route path="my" element={<MyLayout />}>
            <Route index element={<MyProfileViewPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="list" element={<MyListPage />} />
            <Route path="bookmarks" element={<MyBookmarksPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
