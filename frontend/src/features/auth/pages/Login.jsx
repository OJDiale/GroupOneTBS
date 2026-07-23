import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cityBck from "../../../resources/city-back.jpeg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });

    // Replace with your backend login later
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.15)), url(${cityBck})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center">
        {/* Large heading */}
        <h1 className="text-center text-6xl font-bold text-[#0f3d5c] drop-shadow-lg pb-16">
          {t("submit")}
        </h1>

        <div className="scale-100 rounded-[58px] bg-white/70 shadow-xl shadow-emerald-900/5 border-[10px] border-[#1cabb0] pt-12 pb-8 px-56">

          {/* Subtitle */}
          <h2 className="mt-2 mb-4 text-lg text-center italic font-bold text-[#083335]">
            {t("subtitle")}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 flex flex-col items-center"
          >

            {/* Email */}
            <div className="relative">
              <label className="block font-semibold text-left text-black mb-2">
                {t("email")}
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email")}
                className="w-[300px] bg-[#6b8a90] rounded-xl py-3 px-4 text-white placeholder:text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-xl font-semibold text-black mb-2">
                {t("password")}
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("password")}
                className="w-[300px] bg-[#6b8a90] rounded-xl py-3 px-4 text-white placeholder:text-white"
                required
              />

              <div className="mt-2 flex justify-end">
                <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="accent-[#0f3d5c]"
                  />
                  {t("showPassword")}
                </label>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="w-full flex justify-center">
              <a
                href="/forgot-password"
                className="text-lg font-semibold text-[#083335] hover:underline"
              >
                {t("forgotPassword")}
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mx-auto block w-2/5 rounded-xl bg-[#0f3d5c] py-2 text-lg font-bold text-white hover:bg-[#0b3048] transition"
            >
              {t("submit")}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="italic text-[#083335]">
              {t("noAccount")}
            </p>

            <a
              href="/register"
              className="mt-2 inline-block font-bold text-[#3292d1] hover:underline"
            >
              {t("registerLink")}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
