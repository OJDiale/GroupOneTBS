import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './features/auth/pages/Welcome';
import VerifyOTP from './features/auth/pages/VerifyOTP';
import LoginPage from "./features/auth/pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<VerifyOTP />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

