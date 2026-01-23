import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './admin/pages/AdminPage';
import UserPage from './user/pages/UserPage';

import './App.css';
import LoginPage from './user/pages/LoginPage';
import SignUpPage from './user/pages/SignUpPage';
import ReviewPage from './user/pages/ReviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path='/reviews' element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
