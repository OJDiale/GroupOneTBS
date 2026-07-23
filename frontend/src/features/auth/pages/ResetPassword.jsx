import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import Modal from "../components/Modal.jsx";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setSubmitting(true);
    try {
      // ============================================================
      // CONNECT TO BACKEND HERE
      //
      // Replace this block with a real call that sends/verifies the OTP
      // and resets the password server-side, e.g.:
      //
      //   const res = await fetch("/api/auth/reset-password", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email }),
      //   });
      //   if (!res.ok) throw new Error("Reset failed");
      //
      // If your backend requires a separate OTP-entry step before the
      // password is actually reset, add that step's UI here and only
      // show the success popup once that final call succeeds.
      // ============================================================
      await new Promise((r) => setTimeout(r, 500));
      setShowSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="city-page">
      <h1 className="page-heading">Forgot your password?</h1>

      <div className="auth-card fade-in">
        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Mail size={44} color="var(--green-icon)" strokeWidth={1.6} />
          </div>

          <div style={{ background: "var(--green-banner)", borderRadius: 14, padding: "14px 18px", textAlign: "center", fontSize: 13.5, fontWeight: 700, lineHeight: 1.5 }}>
            Make sure you enter the same email address you used when you registered to receive the OTP
          </div>

          <div>
            <label className="field-label">Email address</label>
            <input className="field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {error && <div className="field-error">{error}</div>}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn-navy" disabled={submitting}>
              {submitting ? "Verifying…" : "Verify email"}
            </button>
          </div>
        </form>
      </div>

      <Modal
        open={showSuccess}
        type="success"
        title="Password reset successful"
        actionLabel="Back to login"
        onClose={() => navigate("/")}
      />
    </div>
  );
}
