import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-teal-500 text-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">TshwaneRide</h1>
          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4">
        {children ?? <Outlet />}
      </main>

      <footer className="bg-teal-500 py-4 text-center text-sm text-white">
        <p>© 2026 TshwaneRide. All rights reserved.</p>
      </footer>
    </div>
  );
}
