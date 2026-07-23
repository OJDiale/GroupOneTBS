import { useTranslation } from 'react-i18next';
import { CreditCard } from 'lucide-react';
import redStatusIcon from '../../../resources/icons/red.svg';
import amberStatusIcon from '../../../resources/icons/amber.svg';
import greenStatusIcon from '../../../resources/icons/green.svg';

// STUB DATA — replace with backend later
const stubCard = {
  cardNumber: '89 6789',
  balance: 100.0,
  status: 'active',
};

function getBalanceTier(balance, t) {
  if (balance <= 0) {
    return {
      borderColor: 'border-[#ff3131]',
      bannerBg: 'bg-[#ff3131]',
      iconSrc: redStatusIcon,
      message: t('dangerMessage'),
    };
  }

  if (balance <= 13.99) {
    return {
      borderColor: 'border-[#f5a623]',
      bannerBg: 'bg-[#f5a623]',
      iconSrc: amberStatusIcon,
      message: t('warningMessage', {
        balance: balance.toFixed(2),
      }),
    };
  }

  return {
    borderColor: 'border-[#3ae191]',
    bannerBg: 'bg-[#3ae191]',
    iconSrc: greenStatusIcon,
    message: t('goodMessage'),
  };
}

function getStatusLabel(status, t) {
  return String(status).toLowerCase() === 'active' ? t('activeStatus') : status;
}

export default function Dashboard({ userName = 'Alex', card = stubCard }) {
  const { t } = useTranslation('dashboard');

  const tier = getBalanceTier(card.balance, t);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <h1 className="mt-8 text-4xl font-bold text-[#083335] sm:text-5xl lg:text-6xl">
        {t('greeting')}, {userName}
      </h1>

      <p className="mt-4 max-w-3xl text-xl text-[#545454] sm:text-2xl lg:text-3xl">
        {t('welcomeBack')}
      </p>

      <div
        className={`mt-12 w-full max-w-3xl rounded-3xl border-4 bg-white p-8 shadow-xl ${tier.borderColor}`}
      >
        <div className="flex items-center gap-2 mb-6 justify-center">
          <CreditCard className="w-6 h-6 text-[#083335]" />
          <h2 className="text-2xl font-bold text-[#083335]">
            {t('cardDetails')}
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
          <div className="min-w-0">
            <p className="text-[#545454]">{t('cardNumber')}</p>
            <p className="text-xl font-bold text-black">
              ***** {card.cardNumber}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[#545454]">{t('cardBalance')}</p>
            <p className="text-xl font-bold text-black">
              R{card.balance.toFixed(2)}
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[#545454]">{t('status')}</p>
            <p className="text-xl font-bold text-black">
              {getStatusLabel(card.status, t)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <img src={tier.iconSrc} alt="" className="h-14 w-14 shrink-0" />

          <div className={`flex-1 rounded-xl px-5 py-4 ${tier.bannerBg}`}>
            <p className="font-bold text-white text-center">
              {tier.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
