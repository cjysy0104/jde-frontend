import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AdminPage from './pages/admin/AdminPage';
import UserPage from './pages/user/UserPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
