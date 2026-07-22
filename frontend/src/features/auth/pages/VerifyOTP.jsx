import { useEffect, useState } from 'react';
import OTPInput from '../components/OTPInput';
import Header from '../../../shared/components/Header';

// Turns a raw second count into "00:30" style mm:ss text.
// Kept OUTSIDE the component because it doesn't need any component state —
// it's a pure function (same input always gives same output), so there's
// no reason to redefine it on every render.
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // padStart(2, '0') turns "5" into "05" — always 2 digits
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function VerifyOTP() {
  // The full 4-digit code, reported up from the OTPInput child component
  const [otpCode, setOtpCode] = useState('');

  // Countdown state — starts at 30 seconds per the design
  const [secondsLeft, setSecondsLeft] = useState(30);

  // This effect creates a ticking interval that decreases secondsLeft by 1
  // every 1000ms, but only while there's still time left.
  useEffect(() => {
    // If we've hit zero, don't start a new interval — just stop.
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // CLEANUP FUNCTION — this is critical and easy to forget.
    // Every time this effect re-runs (which happens every time secondsLeft
    // changes, because it's in the dependency array below), React first
    // calls this cleanup to clear the PREVIOUS interval before setting up
    // a new one. Without this, you'd stack up dozens of intervals all
    // firing at once, and the countdown would race down far faster than
    // 1 second per tick (a classic React bug).
    return () => clearInterval(timer);
  }, [secondsLeft]);

  function handleVerify(e) {
    e.preventDefault();
    // Not wiring up the real API call yet — that comes later when we
    // build authApi.js. For now, just prove the code reaches this handler.
    console.log('Verifying OTP code:', otpCode);
  }

  function handleResend() {
    // Only reachable once the button is enabled (secondsLeft === 0),
    // enforced by the `disabled` attribute below.
    console.log('Resending OTP...');
    setSecondsLeft(30); // restart the countdown
    setOtpCode('');     // clear whatever was typed before
  }

  // Only allow submitting once all 4 digits are filled in
  const isComplete = otpCode.length === 4;

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center px-4 py-8">
        
      <div className="w-full max-w-4xl">
        <Header variant="authenticated" />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#4fa9b8]">Verify</h1>
          <p className="mt-3 text-sm text-[#6b8a90] max-w-2xl mx-auto">
            Enter the 4-digit code sent to your phone to confirm your account.
          </p>
        </div>

        <div className="w-full rounded-3xl bg-white border-4 border-[#d9eef1] shadow-xl p-8 sm:p-10">
          <div className="flex flex-col gap-4 rounded-3xl bg-[#ffe16c] p-5 mb-6 text-white sm:flex-row sm:items-center">
            <span className="text-3xl">📱</span>
            <p className="text-sm leading-snug sm:text-base">
              We sent a <span className="font-bold">4-digit</span> code to{' '}
              <span className="font-bold">+27 ** *** 4567</span>. Enter it below
              to verify your account.
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
            className="w-full rounded-lg bg-[#4fa9b8] py-3 font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
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
              className="font-bold text-[#00bf63] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              RESEND OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
