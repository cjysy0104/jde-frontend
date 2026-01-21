import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import AdminPage from './admin/pages/AdminPage';
import UserPage from './user/pages/UserPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
