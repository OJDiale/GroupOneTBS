import { useState } from "react";
import cityBck from '../../../resources/city-back.jpeg';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
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
        <h1 className="mb-6 text-center text-6xl font-bold text-[#1C3B59] drop-shadow-lg pb-20">
          Log In
        </h1>

          <div className=" scale-125 rounded-[58px] bg-[#FCFDFE]/70 rounded-2xl shadow-xl shadow-emerald-900/5 border border-[10px] border-[#54A4AB] pt-12 pb-8 px-56" >

            {/* Heading */}
            <h1 className="mt-2 mb-4 text-lg text-center italic font-bold text-[#707275] ">
              Login to manage your card
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center">

              {/* Email */}
              <div className="relative">
                <label className="block text--1xl font-semibold text-left text-black mb-2 ">
                      Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="relative w-[300px] bg-[#71898E] rounded-xl py-3 px-4 text-white placeholder:text-white"
                />
              </div>

              {/* Password */}
              <div className="relative">
              <label className="block text-xl font-semibold text-black mb-2">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-[300px] bg-[#71898E] rounded-xl py-3 px-4 text-white placeholder:text-white"
                required
              />

              <div className="mt-2 flex justify-end">
                <label className="flex items-center gap-2 text-sm text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="accent-[#1C3B59]"
                  />
                  Show password
                </label>
              </div>
            </div>

              {/* Submit */}
              <button
                type="submit"
                className="mx-auto block w-2/5 rounded-xl bg-[#1C3B59] py-2 text-lg font-bold text-white hover:bg-[#418d9b] transition"
              >
                Log In
              </button>
            </form>

            <div className="mt-4 text-center">

        <p className="italic text-[#595a5a]">
            Don't have an account?
        </p>

        <a
            href="/register"
            className="mt-2 inline-block font-bold text-[#267FBF] hover:underline"
        >
            Register
        </a>

      </div>
        </div>
      </div>
    </div>
  );
}