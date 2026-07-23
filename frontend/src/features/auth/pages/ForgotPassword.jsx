import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cityBck from '../../../resources/city-back.jpeg';
import mailIcon from '../../../resources/icons/mail.svg';

function formatIdNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  const parts = [
    digits.slice(0, 6),
    digits.slice(6, 10),
    digits.slice(10, 12),
    digits.slice(12, 13),
  ].filter(Boolean);

  return parts.join(' ');
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation('forgotPassword');
  const [idNumber, setIdNumber] = useState('');

  const rawIdNumber = idNumber.replace(/\D/g, '');

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: call your real "send reset code" API here first, e.g.
    //   await authApi.requestPasswordReset({ idNumber: rawIdNumber });
    // then navigate only on success.
    console.log('Requesting password reset for ID:', rawIdNumber);

    navigate('/otp', {
      state: {
        purpose: 'reset-password',
        contact: idNumber,
      },
    });
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.15)), url(${cityBck})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
    >
      <div className="flex flex-col items-center w-full">
        <h1 className="mb-6 text-center text-6xl font-bold text-[#0f3d5c] drop-shadow-lg pb-8">
          {t('heading')}
        </h1>

        <div className="w-full max-w-lg rounded-[40px] bg-white/70 border-[10px] border-[#1cabb0] shadow-xl p-8 sm:p-10 flex flex-col items-center">
          <img src={mailIcon} alt="" className="mb-6 h-20 w-20" />

          <div className="w-full rounded-xl bg-[#aae98f] p-4 mb-6 text-center">
            <p className="font-bold text-black">
              {t('banner')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-5">
            <div className="w-full max-w-[300px]">
              <label className="block text-left font-semibold text-black mb-2">
                {t('idNumber')}
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={idNumber}
                onChange={(e) => setIdNumber(formatIdNumber(e.target.value))}
                placeholder="xxxxxx xxxx xx x"
                minLength={16}
                maxLength={16}
                pattern="\d{6} \d{4} \d{2} \d"
                className="w-full bg-[#6b8a90] rounded-xl py-3 px-4 text-white placeholder:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={rawIdNumber.length !== 13}
              className="mx-auto block w-2/5 rounded-xl bg-[#0f3d5c] py-3 text-lg font-bold text-white
                         hover:bg-[#0b3048] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
