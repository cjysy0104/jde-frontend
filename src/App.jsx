import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminPage from "./pages/admin/AdminPage";

import UserPage from "./pages/user/UserPage";
import UserHome from "./pages/user/UserHome";

import MyLayout from "./pages/user/myPage/MyLayout";

import MyProfileViewPage from "./pages/user/myPage/profiles/MyProfileView";

import MyProfilePage from "./pages/user/myPage/profiles/MyProfile";

import MyListPage from "./pages/user/myPage/lists/MyList";
import MyBookmarksPage from "./pages/user/myPage/bookmarks/MyBookmarks";

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

        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
