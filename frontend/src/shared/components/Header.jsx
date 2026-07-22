/*export default function Header({ variant = "guest" }) {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div>TshwaneRide</div>

      {variant === "guest" && (
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
      )}

      {variant === "authenticated" && (
        <div>Authenticated Header</div>
      )}
    </header>
  );
}*/

export default function Header({ variant = "guest" }) {
  return (
    <header className="bg-[#4fa9b8] px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-xl font-bold">
          TshwaneRide
        </div>

        {variant === "guest" && (
            <div className="flex gap-3">
                {variant === "guest" && (
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
        )}
            </div>
        )}

        {variant === "authenticated" && (
          <div className="flex items-center gap-3">
            <div>Authenticated Header</div>
          </div>
        )}
      </div>
    </header>
  );
}