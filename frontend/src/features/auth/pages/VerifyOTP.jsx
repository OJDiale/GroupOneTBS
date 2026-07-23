import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OTPInput from '../components/OTPInput';
import cityBck from '../../../resources/city-back.jpeg';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 120;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function VerifyOTP() {
  const { t } = useTranslation('otp');

  const navigate = useNavigate();
  const location = useLocation();

  const { purpose = 'register', contact = '' } = location.state || {};

  const [otpCode, setOtpCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  function handleVerify(e) {
    e.preventDefault();

    console.log('Verifying OTP code:', otpCode, 'for purpose:', purpose);

    if (purpose === 'reset-password') {
      navigate('/reset-password');
    } else {
      navigate('/login');
    }
  }

  function handleResend() {
    console.log('Resending OTP...');
    setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    setOtpCode('');
  }

  const isComplete = otpCode.length === OTP_LENGTH;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.15)), url(${cityBck})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-center text-6xl font-bold text-[#0f3d5c] drop-shadow-lg pb-8">
            {t('heading')}
          </h1>
        </div>

        <div className="w-full rounded-3xl bg-white/70 border-[10px] border-[#1cabb0] shadow-xl p-5 sm:p-10">
          <div className="flex flex-col text-center gap-2 px-2 rounded-2xl bg-[#f1f074] p-5 mb-8 text-black sm:flex-row sm:items-center">
            <span className="text-7xl">📱</span>

            <p className="font-semibold px-24 mx-10">
              {t('sentTo')}{' '}
              <span className="font-bold">
                {OTP_LENGTH}-{t('digitCode')}
              </span>{' '}
              <span className="font-bold">{contact}</span>.
              <br />
              {t('enterBelow')}{' '}
              {purpose === 'reset-password'
                ? t('toReset')
                : t('toVerify')}
            </p>
          </div>

          <p className="text-center font-semibold text-[#083335] mb-4">
            {t('enterOtp')}
          </p>

          <div className="mb-6">
            <OTPInput onChange={(code) => setOtpCode(code)} />
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={!isComplete}
            className="mx-auto block w-2/5 rounded-lg bg-[#0f3d5c] py-3 font-bold text-white hover:bg-[#0b3048] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('submit')}
          </button>

          <div className="mt-5 flex flex-col items-center gap-3 text-center">
            <p className="text-[#545454] text-sm">
              {t('notReceived')}{' '}
              <span className="font-bold text-[#545454]">
                {formatTime(secondsLeft)}
              </span>
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className="rounded-lg bg-[#00bf63] px-6 py-2 font-bold text-white hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('resend')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
