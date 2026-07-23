import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from '../components/OTPInput';
import cityBck from '../../../resources/city-back.jpeg';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 90;

// raw seconds -> "01:30" style display
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  // data handed off from ForgotPassword or Register via navigate(..., { state })
  const { purpose = 'register', contact = '' } = location.state || {};

  const [otpCode, setOtpCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  // ticking countdown; cleanup prevents stacked intervals on re-render
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  function handleVerify(e) {
    e.preventDefault();
    console.log('Verifying OTP code:', otpCode, 'for purpose:', purpose);

    // TODO: call real verify API here first, only navigate on success
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
  const bodyText =
    purpose === 'reset-password' ? 'to reset your password.' : 'to verify your account.';

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
          <h1 className="text-center text-6xl font-bold text-[#1C3B59] drop-shadow-lg pb-8">
            Verify
          </h1>
        </div>

        <div className="w-full rounded-3xl bg-white border border-[10px] border-[#54A4AB] shadow-xl p-5 sm:p-10">
          <div className="flex flex-col text-center gap-2 px-2 rounded-2xl bg-[#ffe16c] p-5 mb-8 text-black sm:flex-row sm:items-center">
            <span className="text-7xl">📱</span>
            <p className="font-semibold px-24 mx-10">
              We sent a <span className="font-bold">{OTP_LENGTH}-digit</span> code to{' '}
              <span className="font-bold">{contact}</span>.<br />
              Enter it below {bodyText}
            </p>
          </div>

          <p className="text-center font-semibold text-[#545454] mb-4">Enter OTP</p>

          <div className="mb-6">
            <OTPInput onChange={(code) => setOtpCode(code)} />
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={!isComplete}
            className="mx-auto block w-2/5 rounded-lg bg-[#4fa9b8] py-3 font-bold text-white
                       hover:bg-[#418d9b] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify Account
          </button>

          <div className="mt-5 flex flex-col items-center gap-3 text-center">
            <p className="text-[#6b8a90] text-sm">
              Didn't receive the code? Code available in{' '}
              <span className="font-bold text-[#545454]">{formatTime(secondsLeft)}</span>
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className="rounded-lg bg-[#2a8f5e] px-6 py-2 font-bold text-white
                         hover:bg-[#24774b] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              RESEND OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}