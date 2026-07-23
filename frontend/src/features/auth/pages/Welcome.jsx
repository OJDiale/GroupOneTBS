import { useTranslation } from 'react-i18next';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import backGr from '../../../resources/home-back.jpeg';
import bus from '../../../resources/welcome-bus.png';
import areyengIcon from '../../../resources/areyeng-icon.png';
import tshwaneIcon from '../../../resources/tshwane-logo.jpg';

export default function Welcome() {
  const { t } = useTranslation('welcome'); // only need t here, not i18n — language switching lives in Header now

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdfb]">
      <Header />

      <main
        className="flex-1 flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage: `url(${backGr})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center gap-20 max-w-7xl mx-auto">
          <div className="w-2/5 rounded">
            <img src={bus} alt="Bus" className="w-full h-auto scale-125 rounded-[58px]" />
          </div>

          <div className="w-3/5 ml-12">
            {/* CHANGED: hardcoded → t('heroTitle') */}
            <h1 className="text-5xl font-bold text-[#083335] leading-tight mb-5">
              {t('heroTitle')}
            </h1>

            {/* CHANGED: hardcoded → t('heroSubtitle') */}
            <p className="text-3xl font-semibold italic text-[#545454] text-center mb-8 max-w-3xl">
              {t('heroSubtitle')}
            </p>

            <div className="max-w-4xl rounded-[58px] bg-white/70 border border-white/70 p-10 shadow-xl text-center sm:p-12">
              {/* CHANGED: hardcoded → t('infoCardText') */}
              <label className="block text-3xl font-semibold italic text-[#545454] mb-8">
                {t('infoCardText')}
              </label>

              <div className="flex justify-center items-center gap-10">
                <img src={areyengIcon} alt="A Re Yeng" className="w-24 h-auto opacity-80 mix-blend-multiply" />
                <img src={tshwaneIcon} alt="Tshwane" className="w-28 h-auto rounded-xl opacity-80 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
