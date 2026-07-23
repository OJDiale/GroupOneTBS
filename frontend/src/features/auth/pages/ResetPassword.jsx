import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import cityBck from '../../../resources/city-back.jpeg';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Basic client-side check BEFORE hitting the backend at all —
    // no point making a network call if the two fields don't even match.
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    // TODO: call your real API here, e.g.
    //   await authApi.resetPassword(newPassword);
    console.log('Resetting password to:', newPassword);

    navigate('/login'); // send them to log in with the new password
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
          Create a new password
        </h1>

        <div className="w-full max-w-lg rounded-[40px] bg-white border-[10px] border-[#54A4AB] shadow-xl p-8 sm:p-10 flex flex-col items-center">
          <Lock className="w-14 h-14 text-[#f59e0b] mb-4" fill="#f59e0b" strokeWidth={1.5} />

          <p className="text-center font-bold text-[#1C3B59] mb-8 max-w-md">
            Your identity has been verified. Choose a strong new password for
            your TshwaneRide account.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-5">
            <div className="w-full max-w-[300px]">
              <label className="block text-left font-semibold text-black mb-2">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#71898E] rounded-xl py-3 px-4 text-white"
                required
              />
            </div>

            <div className="w-full max-w-[300px]">
              <label className="block text-left font-semibold text-black mb-2">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#71898E] rounded-xl py-3 px-4 text-white"
                required
              />
            </div>

            {/* Only rendered when there's actually an error to show */}
            {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

            <button
              type="submit"
              className="mx-auto block w-2/5 rounded-xl bg-[#1C3B59] py-3 text-lg font-bold text-white
                         hover:bg-[#15304a] transition"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}