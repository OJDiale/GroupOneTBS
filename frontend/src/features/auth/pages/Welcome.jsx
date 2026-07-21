import { useState } from 'react';

export default function Welcome() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen flex flex-col bg-emerald-50">
      <header className="bg-[#4fa9b8] text-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-bold">TshwaneRide</div>
          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded bg-[#545454] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3f3f3f]"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded bg-[#2a8f5e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24774b]"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl rounded-[28px] bg-white border-4 border-[#d9eef1] p-10 shadow-xl text-center sm:p-12">
          <div className="mb-8">
            <label className="block text-center text-3xl font-semibold text-[#595a5a] mb-5">
              Select a language
            </label>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'en', label: 'English' },
                { id: 'zu', label: 'IsiZulu' },
                { id: 'tn', label: 'Sestwana' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLanguage(option.id)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    language === option.id
                      ? 'bg-[#82a5ab] text-white shadow-lg'
                      : 'bg-[#82a5ab] text-white hover:bg-[#6e8f94]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-6xl mb-6">🚗</div>
          <h1 className="text-4xl font-bold text-[#545454] mb-4">
            Your bus card can be managed online
          </h1>
          <p className="mx-auto max-w-2xl text-[#6b8a90] leading-relaxed text-lg">
            Top up and manage your bus card without visiting a station. Get instant virtual access to your account.
          </p>
        </div>
      </main>

      <footer className="bg-[#4fa9b8] py-4 text-center text-sm text-white">
        <p>© 2026 TshwaneRide. All rights reserved.</p>
      </footer>
    </div>
  );
}
