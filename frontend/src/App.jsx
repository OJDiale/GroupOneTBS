import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './features/auth/pages/Welcome';
import VerifyOTP from './features/auth/pages/VerifyOTP';
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from './features/auth/pages/Register';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import DashboardLayout from './layouts/DashboardLayout';
import LostItem from './features/lostitem/pages/LostItem'; 
import TransactionPage from './features/transactions/pages/Transactions';
import Dashboard from './features/dashboard/pages/Dashboard';
import MyCard from './features/card/pages/MyCard';
import TopUp from './features/topup/pages/TopUp';
import ProfileSettings from './features/profile/pages/ProfileSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<DashboardLayout />}>
          <Route path="/lost-item" element={<LostItem />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/mycard" element={<MyCard />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/transactions" element={<TransactionPage />} /> 
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

