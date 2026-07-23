// shared/components/Footer.jsx
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-[#0f3d5c] py-4 text-center text-3xl text-white">
      <p>{t('footer')}</p>
    </footer>
  );
}
