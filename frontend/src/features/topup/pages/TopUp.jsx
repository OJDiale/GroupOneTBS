import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../components/Modal';
import ozowLogo from '../../../resources/icons/ozow tick.svg';
import payflexLogo from '../../../resources/icons/payflex tick.svg';


const BANKS = ['Capitec Pay', 'Absa', 'FNB', 'Nedbank', 'Standard Bank'];

function StepIndicator({ current, t }) {
  const STEP_LABELS = [
    t('step1Short'),
    t('step2Short'),
    t('step3Short'),
    t('step4Short'),
  ];

  return (
    <div className="mb-8 grid w-full max-w-2xl grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} className="flex min-w-0 flex-col items-center gap-2 text-center">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${
              n <= current ? 'bg-[#00bf63]' : 'bg-gray-300'
            }`}
          >
            {n}
          </div>

          <div className="min-h-8 max-w-full text-xs font-semibold leading-snug text-black">
            {STEP_LABELS[i]}
          </div>
        </div>
      ))}
    </div>
  );
}

function BackLink({ onBack, t }) {
  return (
    <button type="button" onClick={onBack} className="text-sm text-[#545454] hover:underline mb-4">
      {t('back')}
    </button>
  );
}

function Step1Amount({ amount, onAmountChange, onContinue, canContinue, t }) {
  return (
    <>
      <h2 className="text-xl font-bold text-[#083335] mb-4">{t('step1Title')}</h2>
      <div className="mb-6">
        <label className="block font-semibold mb-2 text-[#545454]">{t('amountLabel')}</label>
        <input
          className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          type="text"
          inputMode="decimal"
          placeholder="e.g. 50"
          value={amount}
          onChange={onAmountChange}
          autoFocus
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="bg-[#00bf63] text-white font-bold px-6 py-2 rounded-full hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('continue')}
        </button>
      </div>
    </>
  );
}

function Step2Method({ method, onSelect, onBack, onContinue, t }) {
  return (
    <>
      <BackLink onBack={onBack} t={t} />
      <h2 className="text-xl font-bold text-[#083335] mb-4">{t('step2Title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          onClick={() => onSelect('ozow')}
          className={`flex items-center gap-3 border-2 rounded-xl p-4 text-left transition ${
            method === 'ozow' ? 'border-[#7f8689] bg-white' : 'border-[#e4e1e1] bg-white hover:border-[#7f8689]'
          }`}
        >
          <img src={ozowLogo} alt="" className="h-10 w-16 shrink-0 object-contain" />
          <div>
            <div className="font-semibold text-[#545454]">{t('ozowTitle')}</div>
            <div className="text-sm text-[#545454]">{t('ozowSubtitle')}</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect('payflex')}
          className={`flex items-center gap-3 border-2 rounded-xl p-4 text-left transition ${
            method === 'payflex' ? 'border-[#7f8689] bg-white' : 'border-[#e4e1e1] bg-white hover:border-[#7f8689]'
          }`}
        >
          <img src={payflexLogo} alt="" className="h-10 w-16 shrink-0 object-contain scale-150" />
          <div>
            <div className="font-semibold text-[#545454]">{t('payflexTitle')}</div>
            <div className="text-sm text-[#545454]">{t('payflexSubtitle')}</div>
          </div>
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onContinue}
          disabled={!method}
          className="bg-[#00bf63] text-white font-bold px-6 py-2 rounded-full hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('proceedToPayment')}
        </button>
      </div>
    </>
  );
}

function Step3Ozow({ bank, setBank, cellphone, setCellphone, onBack, onContinue, canContinue, t }) {
  return (
    <>
      <BackLink onBack={onBack} t={t} />
      <h2 className="text-xl font-bold text-[#083335] mb-4">{t('step3OzowTitle')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('selectBank')}</label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          >
            <option value="" disabled>{t('chooseBank')}</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('cellphoneLabel')}</label>
          <input
            type="tel"
            placeholder="082 000 0000"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="bg-[#00bf63] text-white font-bold px-6 py-2 rounded-full hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('payWithOzow')}
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
  t,
}) {
  return (
    <>
      <BackLink onBack={onBack} t={t} />
      <h2 className="text-xl font-bold text-[#083335] mb-4">{t('step3PayflexTitle')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('cardholderName')}</label>
          <input
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('cardNumber')}</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            inputMode="numeric"
            placeholder="1234 5678 9110"
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('expiryDate')}</label>
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2 text-[#545454]">{t('securityCode')}</label>
          <input
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="***"
            className="w-full rounded-lg border border-[#e4e1e1] bg-white px-4 py-3"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="bg-[#00bf63] text-white font-bold px-6 py-2 rounded-full hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t('payWithPayflex')}
        </button>
      </div>
    </>
  );
}

function Step4Confirm({ amount, method, bank, cellphone, cardNumber, submitting, onBack, onConfirm, t }) {
  const methodLabel = method === 'ozow' ? t('ozowTitle') : t('payflexTitle');
  const total = Number(amount) || 0;

  return (
    <>
      <BackLink onBack={onBack} t={t} />
      <h2 className="text-xl font-bold text-[#083335] mb-4">{t('step4Title')}</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between border-b pb-2">
          <span className="text-[#545454]">{t('amount')}</span>
          <span className="font-semibold text-black">R{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-[#545454]">{t('paymentMethod')}</span>
          <span className="font-semibold text-black">{methodLabel}</span>
        </div>
        {method === 'ozow' ? (
          <>
            <div className="flex justify-between border-b pb-2">
              <span className="text-[#545454]">{t('bank')}</span>
              <span className="font-semibold text-black">{bank}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-[#545454]">{t('cellphone')}</span>
              <span className="font-semibold text-black">{cellphone}</span>
            </div>
          </>
        ) : (
          <div className="flex justify-between border-b pb-2">
            <span className="text-[#545454]">{t('cardEnding')}</span>
            <span className="font-semibold text-black">•••• {cardNumber?.slice(-4) || '****'}</span>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onConfirm}
          disabled={submitting}
          className="bg-[#00bf63] text-white font-bold px-6 py-2 rounded-full hover:bg-[#00a957] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? t('processing') : t('confirmPayment')}
        </button>
      </div>
    </>
  );
}

export default function TopUp() {
  const { t } = useTranslation('topUp'); // assuming namespace is 'topup'
  const [step, setStep] = useState(1);

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(null); // 'ozow' | 'payflex'
  const [bank, setBank] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // null | 'success' | 'error'

  const total = Number(amount) || 0;
  const isValidAmount = amount !== '' && total > 0;

  function handleAmountChange(e) {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      setAmount(val);
    }
  }

  const canContinueStep3 =
    method === 'ozow'
      ? bank !== '' && cellphone.trim() !== ''
      : cardName.trim() !== '' && cardNumber.trim() !== '' && expiry.trim() !== '' && cvv.trim() !== '';

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  function resetWizard() {
    setStep(1);
    setAmount('');
    setMethod(null);
    setBank('');
    setCellphone('');
    setCardName('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  }

  async function handleConfirmPayment() {
    setSubmitting(true);
    try {
      // ============================================================
      // CONNECT TO BACKEND HERE
      //   const payload = method === 'ozow'
      //     ? { amount, method, bank, cellphone }
      //     : { amount, method, cardName, cardNumber, expiry, cvv };
      //   const res = await fetch('/api/wallet/load', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload),
      //   });
      //   const data = await res.json();
      //   if (data.redirectUrl) {
      //     window.location.href = data.redirectUrl;
      //     return;
      //   }
      //   setResult(data.status === 'success' ? 'success' : 'error');
      // ============================================================
      await new Promise((r) => setTimeout(r, 700));
      setResult('success');
    } catch {
      setResult('error');
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    const wasSuccess = result === 'success';
    setResult(null);
    if (wasSuccess) resetWizard();
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold text-[#083335] mb-2">{t('heading')}</h1>
      <p className="text-[#545454] text-lg mb-8">{t('subtitle')}</p>

      <StepIndicator current={step} t={t} />

      <div className="w-full max-w-xl rounded-2xl border-4 border-[#7f8689] bg-white p-8 text-left shadow-lg">
        {step === 1 && (
          <Step1Amount
            amount={amount}
            onAmountChange={handleAmountChange}
            onContinue={() => setStep(2)}
            canContinue={isValidAmount}
            t={t}
          />
        )}

        {step === 2 && (
          <Step2Method
            method={method}
            onSelect={setMethod}
            onBack={goBack}
            onContinue={() => setStep(3)}
            t={t}
          />
        )}

        {step === 3 && method === 'ozow' && (
          <Step3Ozow
            bank={bank}
            setBank={setBank}
            cellphone={cellphone}
            setCellphone={setCellphone}
            onBack={goBack}
            onContinue={() => setStep(4)}
            canContinue={canContinueStep3}
            t={t}
          />
        )}

        {step === 3 && method === 'payflex' && (
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
            t={t}
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
            t={t}
          />
        )}
      </div>

      <Modal
        open={result === 'success'}
        type="success"
        title={t('successTitle')}
        message={t('successMessage', { amount: total.toFixed(2) })}
        actionLabel={t('done')}
        onClose={closeModal}
      />
      <Modal
        open={result === 'error'}
        type="error"
        title={t('errorTitle')}
        message={t('errorMessage')}
        actionLabel={t('tryAgain')}
        onClose={closeModal}
      />
    </section>
  );
}
