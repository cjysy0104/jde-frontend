import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AdminPage from './admin/pages/AdminPage';
import UserPage from './user/pages/UserPage';
import LoginPage from './user/components/LoginPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
