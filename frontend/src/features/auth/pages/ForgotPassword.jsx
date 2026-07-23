import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import cityBck from '../../../resources/city-back.jpeg';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: call your real "send reset code" API here first, e.g.
    //   await authApi.requestPasswordReset(email);
    // then navigate only on success.
    console.log('Requesting password reset for:', email);

    navigate('/otp', {
      state: {
        purpose: 'reset-password',
        contact: email, // real email typed here, carried forward to VerifyOTP
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
        <h1 className="mb-6 text-center text-6xl font-bold text-[#1C3B59] drop-shadow-lg pb-8">
          Forgot your password?
        </h1>

        <div className="w-full max-w-lg rounded-[40px] bg-white border-[10px] border-[#54A4AB] shadow-xl p-8 sm:p-10 flex flex-col items-center">
          {/* Green outline envelope icon, matching the mockup */}
          <Mail className="w-16 h-16 text-[#22c55e] mb-6" strokeWidth={2} />

          {/* Light green info banner */}
          <div className="w-full rounded-xl bg-[#bbeaa0] p-4 mb-6 text-center">
            <p className="font-bold text-black">
              Make sure you enter the same email address you used when you
              registered to receive the OTP
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-5">
            <div className="w-full max-w-[300px]">
              <label className="block text-left font-semibold text-black mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#71898E] rounded-xl py-3 px-4 text-white placeholder:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="mx-auto block w-2/5 rounded-xl bg-[#1C3B59] py-3 text-lg font-bold text-white
                         hover:bg-[#15304a] transition"
            >
              Verify email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}