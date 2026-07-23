import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bus,
  UserCircle,
  Fingerprint,
  CreditCard,
} from "lucide-react";
import Modal from "../components/Modal.jsx";

// TODO: replace with the actual logged-in user's name from your auth/session
const CURRENT_USER_NAME = "Alex Dean";

const BANKS = ["Capitec Pay", "Absa", "FNB", "Nedbank", "Standard Bank"];

const STEP_LABELS = [
  "Enter top up amount",
  "Select payment method",
  "Enter banking details",
  "Confirm payment",
];

function NavBar() {
  return (
    <header className="app-navbar">
      <div className="app-navbar-brand">
        <span className="brand-tshwane">Tshwane</span>
        <span className="brand-ride">Ride</span>
        <Bus size={22} className="brand-bus-icon" />
      </div>
      <nav className="app-navbar-links">
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/load-funds" className="navbar-link">Top up</Link>
        <Link to="/" className="navbar-link">Log out</Link>
        <div className="navbar-user">
          <UserCircle size={22} />
          <span>{CURRENT_USER_NAME}</span>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      © {new Date().getFullYear()} TshwaneRide. All rights reserved
    </footer>
  );
}

function StepIndicator({ current }) {
  return (
    <div className="wizard-steps">
      {[1, 2, 3, 4].map((n, i) => (
        <React.Fragment key={n}>
          <div className="wizard-step">
            <div className="wizard-step-circle">{n}</div>
            <div className="wizard-step-label">{STEP_LABELS[i]}</div>
          </div>
          {n < 4 && <div className="wizard-step-connector" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function BackLink({ onBack }) {
  return (
    <button type="button" className="wizard-back" onClick={onBack}>
      ← Back
    </button>
  );
}

function Step1Amount({ amount, onAmountChange, onContinue, canContinue }) {
  return (
    <>
      <h2 className="wizard-step-title">Step 1 - Enter top up amount</h2>
      <div className="wizard-field">
        <label className="field-label">Custom amount</label>
        <input
          className="field-input-plain"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 50"
          value={amount}
          onChange={onAmountChange}
          autoFocus
        />
      </div>
      <div className="wizard-actions">
        <button className="btn-green" onClick={onContinue} disabled={!canContinue}>
          continue
        </button>
      </div>
    </>
  );
}

function Step2Method({ method, onSelect, onBack, onContinue }) {
  return (
    <>
      <BackLink onBack={onBack} />
      <h2 className="wizard-step-title">Step 2 - Select payment method</h2>
      <div className="method-grid">
        {/* TODO: swap these lucide icons for the real Ozow / PayFlex logo assets
            once you have them (drop files in public/images/ and use <img>) */}
        <button
          type="button"
          className={`method-card${method === "ozow" ? " selected" : ""}`}
          onClick={() => onSelect("ozow")}
        >
          <Fingerprint size={26} style={{ color: "#1C77B0", flexShrink: 0 }} />
          <div>
            <div className="method-title">OZOW - Instant EFT</div>
            <div className="method-sub">Pay directly from your bank card</div>
          </div>
        </button>
        <button
          type="button"
          className={`method-card${method === "payflex" ? " selected" : ""}`}
          onClick={() => onSelect("payflex")}
        >
          <CreditCard size={26} style={{ color: "#7A3FBF", flexShrink: 0 }} />
          <div>
            <div className="method-title">PayFlex</div>
            <div className="method-sub">0% Interest. Flexible Payments</div>
          </div>
        </button>
      </div>
      <div className="wizard-actions" style={{ justifyContent: "center" }}>
        <button className="btn-green" onClick={onContinue} disabled={!method}>
          Proceed to payment
        </button>
      </div>
    </>
  );
}

function Step3Ozow({ bank, setBank, cellphone, setCellphone, onBack, onContinue, canContinue }) {
  return (
    <>
      <BackLink onBack={onBack} />
      <h2 className="wizard-step-title">Step 3 - OZOW payment</h2>
      <div className="wizard-row">
        <div className="wizard-field">
          <label className="field-label">Select your bank</label>
          <select className="field-input-plain" value={bank} onChange={(e) => setBank(e.target.value)}>
            <option value="" disabled>Choose your bank</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="wizard-field">
          <label className="field-label">Cellphone number</label>
          <input
            className="field-input-plain"
            type="tel"
            placeholder="082 000 0000"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
          />
        </div>
      </div>
      <div className="wizard-actions" style={{ justifyContent: "center" }}>
        <button className="btn-green" onClick={onContinue} disabled={!canContinue}>
          Pay with Ozow
        </button>
      </div>
    </>
  );
}

function Step3PayFlex({
  cardName, setCardName,
  cardNumber, setCardNumber,
  expiry, setExpiry,
  cvv, setCvv,
  onBack, onContinue, canContinue,
}) {
  return (
    <>
      <BackLink onBack={onBack} />
      <h2 className="wizard-step-title">Step 3 - Please enter your card details</h2>
      <div className="wizard-row">
        <div className="wizard-field">
          <label className="field-label">Cardholder name</label>
          <input className="field-input-plain" value={cardName} onChange={(e) => setCardName(e.target.value)} />
        </div>
        <div className="wizard-field">
          <label className="field-label">Card number</label>
          <input
            className="field-input-plain"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            inputMode="numeric"
            placeholder="1234 5678 9110"
          />
        </div>
      </div>
      <div className="wizard-row">
        <div className="wizard-field">
          <label className="field-label">Expiration date</label>
          <input
            className="field-input-plain"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div className="wizard-field">
          <label className="field-label">Security code</label>
          <input
            className="field-input-plain"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="***"
          />
        </div>
      </div>
      <div className="wizard-actions" style={{ justifyContent: "center" }}>
        <button className="btn-green" onClick={onContinue} disabled={!canContinue}>
          Pay with PayFlex
        </button>
      </div>
    </>
  );
}

function Step4Confirm({ amount, method, bank, cellphone, cardNumber, submitting, onBack, onConfirm }) {
  const methodLabel = method === "ozow" ? "OZOW - Instant EFT" : "PayFlex";
  return (
    <>
      <BackLink onBack={onBack} />
      <h2 className="wizard-step-title">Step 4 - Confirm payment</h2>
      <div className="confirm-summary">
        <div className="confirm-row">
          <span>Amount</span>
          <span>R{(Number(amount) || 0).toFixed(2)}</span>
        </div>
        <div className="confirm-row">
          <span>Payment method</span>
          <span>{methodLabel}</span>
        </div>
        {method === "ozow" ? (
          <>
            <div className="confirm-row"><span>Bank</span><span>{bank}</span></div>
            <div className="confirm-row"><span>Cellphone</span><span>{cellphone}</span></div>
          </>
        ) : (
          <div className="confirm-row">
            <span>Card ending</span>
            <span>•••• {cardNumber.slice(-4)}</span>
          </div>
        )}
      </div>
      <div className="wizard-actions" style={{ justifyContent: "center" }}>
        <button className="btn-green" onClick={onConfirm} disabled={submitting}>
          {submitting ? "Processing…" : "Confirm payment"}
        </button>
      </div>
    </>
  );
}

export default function LoadFundsPage() {
  const [step, setStep] = useState(1);

  // step 1
  const [amount, setAmount] = useState("");
  // step 2
  const [method, setMethod] = useState(null); // "ozow" | "payflex"
  // step 3 - ozow
  const [bank, setBank] = useState("");
  const [cellphone, setCellphone] = useState("");
  // step 3 - payflex
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // null | "success" | "error"

  const total = Number(amount) || 0;
  const isValidAmount = amount !== "" && total > 0;

  const handleAmountChange = (e) => {
    const val = e.target.value;
    // allow only digits and a single decimal point while typing
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  };

  const canContinueStep3 =
    method === "ozow"
      ? bank !== "" && cellphone.trim() !== ""
      : cardName.trim() !== "" && cardNumber.trim() !== "" && expiry.trim() !== "" && cvv.trim() !== "";

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const resetWizard = () => {
    setStep(1);
    setAmount("");
    setMethod(null);
    setBank("");
    setCellphone("");
    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  const handleConfirmPayment = async () => {
    setSubmitting(true);
    try {
      // ============================================================
      // CONNECT TO BACKEND HERE
      //
      // Send the collected wizard data to your payment endpoint, e.g.:
      //
      //   const payload = method === "ozow"
      //     ? { amount, method, bank, cellphone }
      //     : { amount, method, cardName, cardNumber, expiry, cvv };
      //
      //   const res = await fetch("/api/wallet/load", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   });
      //   const data = await res.json();
      //   if (data.redirectUrl) {
      //     window.location.href = data.redirectUrl; // send user to Ozow/PayFlex if needed
      //     return;
      //   }
      //   setResult(data.status === "success" ? "success" : "error");
      // ============================================================
      await new Promise((r) => setTimeout(r, 700));
      setResult("success");
    } catch (err) {
      setResult("error");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    const wasSuccess = result === "success";
    setResult(null);
    if (wasSuccess) resetWizard();
  };

  return (
    <div className="wizard-page">
      <NavBar />

      <main className="wizard-main">
        <h1 className="page-heading">Top up your card</h1>
        <p className="wizard-subtitle">Follow the steps below to add funds to your card.</p>

        <StepIndicator current={step} />

        <div className="wizard-card fade-in">
          {step === 1 && (
            <Step1Amount
              amount={amount}
              onAmountChange={handleAmountChange}
              onContinue={() => setStep(2)}
              canContinue={isValidAmount}
            />
          )}

          {step === 2 && (
            <Step2Method
              method={method}
              onSelect={setMethod}
              onBack={goBack}
              onContinue={() => setStep(3)}
            />
          )}

          {step === 3 && method === "ozow" && (
            <Step3Ozow
              bank={bank}
              setBank={setBank}
              cellphone={cellphone}
              setCellphone={setCellphone}
              onBack={goBack}
              onContinue={() => setStep(4)}
              canContinue={canContinueStep3}
            />
          )}

          {step === 3 && method === "payflex" && (
            <Step3PayFlex
              cardName={cardName}
              setCardName={setCardName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiry={expiry}
              setExpiry={setExpiry}
              cvv={cvv}
              setCvv={setCvv}
              onBack={goBack}
              onContinue={() => setStep(4)}
              canContinue={canContinueStep3}
            />
          )}

          {step === 4 && (
            <Step4Confirm
              amount={amount}
              method={method}
              bank={bank}
              cellphone={cellphone}
              cardNumber={cardNumber}
              submitting={submitting}
              onBack={goBack}
              onConfirm={handleConfirmPayment}
            />
          )}
        </div>
      </main>

      <Footer />

      <Modal
        open={result === "success"}
        type="success"
        title="Payment successful"
        message={`R${total.toFixed(2)} has been added to your card.`}
        actionLabel="Done"
        onClose={closeModal}
      />
      <Modal
        open={result === "error"}
        type="error"
        title="Payment failed"
        message="We couldn't process that payment. Please try again."
        actionLabel="Try again"
        onClose={closeModal}
      />
    </div>
  );
}
