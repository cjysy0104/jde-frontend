import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './admin/pages/AdminPage';
import UserPage from './user/pages/UserPage';

import './App.css';
import LoginPage from './user/pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
