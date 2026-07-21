import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './features/auth/pages/Welcome';
import VerifyOTP from './features/auth/pages/VerifyOTP';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/otp" element={<VerifyOTP />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

