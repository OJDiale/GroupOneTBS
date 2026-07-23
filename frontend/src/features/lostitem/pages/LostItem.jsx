import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryTickIcon from '../../../resources/icons/query tick.svg';

export default function LostItem() {
  const { t } = useTranslation('lostItem');
  const navigate = useNavigate();

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [reportData, setReportData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // ---- STUB DATA — replace once backend exists ----
    setReportData({
      referenceNumber: '#012345',
      status: t('pendingStatus'),
    });
    // ---- end stub ----

    setStep('success');
  }

  function handleBackToDashboard() {
    navigate('/dashboard');
  }

  return (
    <div className="flex w-full items-center justify-center">
      {step === 'form' && (
        <div className="w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-[#083335] mb-2">
            {t('heading')}
          </h1>

          <p className="text-[#545454] mb-8">
            {t('subtitle')}
          </p>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border-2 border-[#1cabb0] bg-white p-8 text-left space-y-4"
          >
            <div>
              <label className="block font-semibold text-black mb-2">
                {t('emailLabel')}
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#6b8a90] py-2 px-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-black mb-2">
                {t('descriptionLabel')}
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-[#6b8a90] text-white py-2 px-3"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-[#169995] px-6 py-2 font-semibold text-white hover:bg-[#12847f] transition"
              >
                {t('submit')}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'success' && (
        <div className="w-full max-w-lg rounded-2xl border-2 border-[#1cabb0] bg-white p-10 text-center">
          <img src={queryTickIcon} alt="" className="mx-auto mb-4 h-20 w-20" />

          <h2 className="text-2xl font-bold text-[#083335] mb-2">
            {t('successHeading')}
          </h2>

          <p className="text-[#545454] mb-6">
            {t('successMessage')}
          </p>

          <div className="text-left inline-block mb-8">
            <p>
              <span className="font-bold">{t('referenceNumber')}</span>{' '}
              {reportData.referenceNumber}
            </p>

            <p>
              <span className="font-bold">{t('status')}</span>{' '}
              {reportData.status}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleBackToDashboard}
              className="rounded-full bg-[#169995] px-6 py-2 font-semibold text-white hover:bg-[#12847f] transition"
            >
              {t('backToDashboard')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
