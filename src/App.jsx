import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import UserPage from "./user/pages/UserPage";
import LoginPage from "./user/pages/LoginPage";
import SignUpPage from "./user/pages/SignUpPage";

import UserHome from "./user/UserHome";
import ReviewPage from './user/pages/ReviewPage';

import MyLayout from "./user/components/myPage/MyLayout.jsx";
import MyProfileViewPage from "./user/components/myPage/profiles/MyProfileViewPage.jsx";
import MyProfilePage from "./user/components/myPage/profiles/MyProfilePage.jsx";
import MyListPage from "./user/components/myPage/lists/MyListPage.jsx";
import MyBookmarksPage from "./user/components/myPage/bookmarks/MyBookmarksPage.jsx";

import CaptainsPage from "./user/pages/CaptainPage.jsx";

import NotFoundPage from "./user/pages/NotFoundPage.jsx";
import CaptainReviewPage from "./user/pages/CaptainReviewPage.jsx";
import AdminPage from "./admin/pages/AdminPage.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/" element={<UserPage />}>
          <Route index element={<UserHome />} />
          <Route path="captains" element={<CaptainsPage />} />
          <Route path="reviews/captain/:captainNo" element={<CaptainReviewPage />} />

          <Route path="my" element={<MyLayout />}>
            <Route index element={<MyProfileViewPage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="list" element={<MyListPage />} />
            <Route path="bookmarks" element={<MyBookmarksPage />} />
          </Route>
        </Route>

        <Route path='/reviews' element={<ReviewPage />} />

        <Route path="/user/*" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
