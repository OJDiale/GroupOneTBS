import { useState } from "react";
import { useTranslation } from "react-i18next";
import cityBck from "../../../resources/city-back.jpeg";

export default function RegisterForm() {
  const { t } = useTranslation("register");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert(t("agreeAlert"));
      return;
    }

    alert(t("success"));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center pt-10 pb-10 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.0), rgba(0,0,0,.15)), url(${cityBck})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        className="text-5xl font-extrabold mb-8 text-center"
        style={{ color: "#0f3d5c" }}
      >
        {t("title")}
      </h1>

      <div
        className="rounded-3xl shadow-lg w-full max-w-xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          border: "8px solid #1cabb0",
          padding: "35px 40px",
        }}
      >
        <p
          className="text-center italic font-semibold mb-8"
          style={{ color: "#083335", fontSize: "22px" }}
        >
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("firstName")}
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("lastName")}
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("idNumber")}
              </label>

              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("email")}
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("cellphone")}
              </label>

              <input
                type="tel"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("password")}
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1.5 text-black">
                {t("confirmPassword")}
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 border-none outline-none text-white"
                style={{ backgroundColor: "#6b8a90" }}
                required
              />
            </div>

            <div className="w-1/2 flex items-center pt-7">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2 h-5 w-5 rounded-sm"
                style={{ accentColor: "#169995" }}
              />

              <label className="text-sm text-[#545454]">
                <span className="italic">{t("agree")}</span>{" "}
                <span className="font-bold">{t("terms")}</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="text-white py-3 px-10 rounded-full font-semibold text-lg"
              style={{
                backgroundColor: "#0f3d5c",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
