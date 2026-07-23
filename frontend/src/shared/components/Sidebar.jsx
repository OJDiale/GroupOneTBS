// shared/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoutIcon from '../../resources/icons/logout.svg';

const NAV_ITEMS = [
  { path: '/dashboard', key: 'navDashboard' },
  { path: '/topup', key: 'navTopUp' },
  { path: '/transactions', key: 'navTransactions' },
  { path: '/mycard', key: 'navMyCard' },
  { path: '/lost-item', key: 'navLostItem' },
  { path: '/settings', key: 'navSettings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#0f3d5c] py-4 md:w-64 md:py-8 ">
      <nav className="flex flex-wrap md:flex-col">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `min-w-[9rem] flex-1 px-4 py-3 text-left text-base font-bold leading-snug transition md:w-full md:flex-none md:px-5 md:py-3.5 md:text-2xl ${
                isActive
                  ? 'bg-[#D9E2EC] text-[#0f3d5c]'
                  : 'text-white hover:bg-white/5'
              }`
            }
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-2 px-4 py-3 text-base font-bold text-white hover:opacity-80 md:px-5 md:py-3.5 md:text-lg hover:scale-105 transition duration-300"
      >
        <img src={logoutIcon} alt="" className="h-8 w-8 scale-150" /> {t('logout')}
      </button>
    </aside>
  );
}
