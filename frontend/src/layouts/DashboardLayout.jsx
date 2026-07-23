import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';

export default function DashboardLayout() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdfb]">
      <Header variant="authenticated" />

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden px-4 py-8 sm:px-6 lg:px-8">
          <Outlet /> {/* whichever authenticated page matches the route renders here */}
        </main>
      </div>

      <footer className="bg-[#0f3d5c] py-4 text-center text-3xl text-white">
        <p>{t('footer')}</p>
      </footer>
    </div>
  );
}
