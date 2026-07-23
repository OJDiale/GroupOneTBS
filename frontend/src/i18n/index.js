
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// =========================
// English
// =========================
import enCommon from './en/common.json';
import enWelcome from './en/welcome.json';
import enLogin from './en/login.json';
import enRegister from './en/register.json';
import enForgotPassword from './en/forgotPassword.json';
import enResetPassword from './en/resetPassword.json';
import enOtp from './en/otp.json';
import enDashboard from './en/dashboard.json';
import enTransactions from './en/transactions.json';
import enTopUp from './en/topUp.json';
import enMyCard from './en/myCard.json';
import enLostItem from './en/lostItem.json';
import enProfile from './en/profile.json';

// =========================
// isiZulu
// =========================
import zuCommon from './zu/common.json';
import zuWelcome from './zu/welcome.json';
import zuLogin from './zu/login.json';
import zuRegister from './zu/register.json';
import zuForgotPassword from './zu/forgotPassword.json';
import zuResetPassword from './zu/resetPassword.json';
import zuOtp from './zu/otp.json';
import zuDashboard from './zu/dashboard.json';
import zuTransactions from './zu/transactions.json';
import zuTopUp from './zu/topUp.json';
import zuMyCard from './zu/myCard.json';
import zuLostItem from './zu/lostItem.json';
import zuProfile from './zu/profile.json';

// =========================
// Setswana
// =========================
import tnCommon from './tn/common.json';
import tnWelcome from './tn/welcome.json';
import tnLogin from './tn/login.json';
import tnRegister from './tn/register.json';
import tnForgotPassword from './tn/forgotPassword.json';
import tnResetPassword from './tn/resetPassword.json';
import tnOtp from './tn/otp.json';
import tnDashboard from './tn/dashboard.json';
import tnTransactions from './tn/transactions.json';
import tnTopUp from './tn/topUp.json';
import tnMyCard from './tn/myCard.json';
import tnLostItem from './tn/lostItem.json';
import tnProfile from './tn/profile.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        welcome: enWelcome,
        login: enLogin,
        register: enRegister,
        forgotPassword: enForgotPassword,
        resetPassword: enResetPassword,
        otp: enOtp,
        dashboard: enDashboard,
        transactions: enTransactions,
        topUp: enTopUp,
        myCard: enMyCard,
        lostItem: enLostItem,
        profile: enProfile,
      },

      zu: {
        common: zuCommon,
        welcome: zuWelcome,
        login: zuLogin,
        register: zuRegister,
        forgotPassword: zuForgotPassword,
        resetPassword: zuResetPassword,
        otp: zuOtp,
        dashboard: zuDashboard,
        transactions: zuTransactions,
        topUp: zuTopUp,
        myCard: zuMyCard,
        lostItem: zuLostItem,
        profile: zuProfile,
      },

      tn: {
        common: tnCommon,
        welcome: tnWelcome,
        login: tnLogin,
        register: tnRegister,
        forgotPassword: tnForgotPassword,
        resetPassword: tnResetPassword,
        otp: tnOtp,
        dashboard: tnDashboard,
        transactions: tnTransactions,
        topUp: tnTopUp,
        myCard: tnMyCard,
        lostItem: tnLostItem,
        profile: tnProfile,
      },
    },

    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;