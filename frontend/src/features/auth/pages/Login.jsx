import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Fingerprint, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up your auth logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-emerald-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-100 p-6">
        {/* Tab switcher */}
        <div className="flex bg-emerald-50 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "login"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-emerald-700/60 hover:text-emerald-700"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "register"
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-emerald-700/60 hover:text-emerald-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-emerald-950 mb-1">Welcome back</h1>
        <p className="text-sm text-emerald-700/60 mb-6">
          Log in to manage your card and trips.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-emerald-50/70 border border-emerald-100 rounded-xl py-3 pl-10 pr-4 text-sm text-emerald-950 placeholder:text-emerald-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-700/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-emerald-50/70 border border-emerald-100 rounded-xl py-3 pl-10 pr-10 text-sm text-emerald-950 placeholder:text-emerald-700/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700/40 hover:text-emerald-700/70"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Remember me / Forgot password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-emerald-950 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors mt-2"
          >
            Log In
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Biometric login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 mt-5"
        >
          <Fingerprint className="w-4 h-4" />
          Use Face / Fingerprint ID
        </button>
      </div>
    </div>
  );
}
