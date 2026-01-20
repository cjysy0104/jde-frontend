import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AdminPage from './pages/admin/AdminPage';
import UserPage from './pages/user/UserPage';
import LoginPage from './pages/user/components/LoginPage';
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
