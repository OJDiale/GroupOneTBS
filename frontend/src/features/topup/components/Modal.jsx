import { useTranslation } from 'react-i18next';
import greenTickIcon from '../../../resources/icons/green tick.svg';
import unsuccessfulPaymentIcon from '../../../resources/icons/unsuccessful payment tick.svg';

// A generic confirmation popup — reusable for any success/error moment,
// not just top-up. `open` controls whether it renders at all; when false,
// this returns null and nothing shows.
export default function Modal({
  open,
  type = 'success',
  title,
  message,
  actionLabel,
  onClose,
}) {
  const { t } = useTranslation('topUp');

  if (!open) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div
        className={`w-full max-w-sm rounded-2xl border-4 bg-white p-8 text-center shadow-xl ${
          isSuccess ? 'border-black' : 'border-[#ff5757]'
        }`}
      >
        {isSuccess ? (
          <img src={greenTickIcon} alt="" className="mx-auto mb-4 h-20 w-20" />
        ) : (
          <img src={unsuccessfulPaymentIcon} alt="" className="mx-auto mb-4 h-20 w-20" />
        )}

        <h2 className="text-xl font-bold text-[#083335] mb-2">
          {title}
        </h2>

        <p className="text-[#545454] mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full rounded-xl py-3 font-bold text-white transition ${
            isSuccess
              ? 'bg-[#00bf63] hover:bg-[#00a957]'
              : 'bg-[#00bf63] hover:bg-[#00a957]'
          }`}
        >
          {actionLabel || (isSuccess ? t('done') : t('tryAgain'))}
        </button>
      </div>
    </div>
  );
}
