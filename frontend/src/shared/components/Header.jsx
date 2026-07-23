import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userIcon from '../../resources/icons/user.svg';

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zu', label: 'IsiZulu' },
  { value: 'tn', label: 'Setswana' },
];

export default function Header({ variant = 'guest' }) {
  const { t, i18n } = useTranslation('common');

  const languageSelect = (
    <select
      aria-label={t('language')}
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="cursor-pointer appearance-none rounded bg-[#8fd0ff] px-4 py-2.5 text-base font-semibold text-white transition hover:bg-[#79c6ff] focus:outline-none focus:ring-2 focus:ring-white"
    >
      {LANGUAGES.map((language) => (
        <option key={language.value} value={language.value}>
          {language.label}
        </option>
      ))}
    </select>
  );

  return (
    <header className="bg-[#0f3d5c] px-4 py-6 text-white sm:px-6">
      {/* FIX: removed "mx-auto max-w-7xl" — that combo capped the content
          at 1280px and centered it inside the full-width navy bar, leaving
          equal empty gaps on both sides. Now the flex container spans the
          full header width, so justify-between actually pushes the logo
          and the language/profile group to the true left/right edges. */}
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center text-5xl font-bold sm:text-left ">
          <span className="text-white">Tshwane</span>
          <span className="text-[#EAA944]">Ride</span>
        </div>

        {variant === 'guest' && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            {languageSelect}

            <Link
              to="/login"
              className="rounded bg-[#3292d1] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#287cb3]"
            >
              {t('login')}
            </Link>

            <Link
              to="/register"
              className="rounded bg-[#1cabb0] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#16989d]"
            >
              {t('register')}
            </Link>
          </div>
        )}

        {variant === 'authenticated' && (
          <div className="flex flex-wrap items-center justify-center gap-12 sm:justify-end">
            {languageSelect}

            <div className="flex items-center gap-3 mr-12 scale-150">
              <img src={userIcon} alt="" className="h-9 w-9" />
              <span className="font-semibold">Alex Dean</span>
              {/* TODO: replace hardcoded name with real user from useAuth() once built */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
