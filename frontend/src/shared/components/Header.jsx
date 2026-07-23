import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ variant = "guest" }) {
  const [language, setLanguage] = useState("en");

  return (
    <header className="bg-[#1C3B59] px-6 py-8 text-white">
      <div className="mx-auto flex  items-center justify-between">
        <div className="text-4xl text-left font-bold">
        <span className="text-white">Tshwane</span>
        <span className="text-[#EAA944]">Ride</span>
      </div>

        {variant === "guest" && (
          <div className="flex items-center gap-3">

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="cursor-pointer appearance-none rounded bg-[#9DCEFB] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#6e8f94] focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="en"> English</option>
              <option value="zu"> IsiZulu</option>
              <option value="tn"> Setswana</option>
            </select>

            <Link
              to="/login"
              className="rounded bg-[#4E8FCB] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#3f3f3f]"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded bg-[#2a8f5e] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#24774b]"
            >
              Register
            </Link>

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