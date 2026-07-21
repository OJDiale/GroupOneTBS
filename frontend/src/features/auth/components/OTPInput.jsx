import { useRef, useState } from 'react';

// This component ONLY knows about the 4 boxes and the digits inside them.
// It does NOT know about the timer, the banner, or the verify button —
// that separation is intentional (single responsibility). It reports the
// completed code UP to whichever page uses it, via the onChange prop.
//
// Usage from a parent page:
//   <OTPInput onChange={(code) => setOtpCode(code)} />

export default function OTPInput({ length = 6, onChange }) {
  // otp is an array like ['', '', '', ''] — one entry per box.
  // We use an array (not 4 separate useState calls) because it's easier
  // to loop over when rendering, and easier to join into one string later.
  const [otp, setOtp] = useState(Array(length).fill(''));

  // refs let us grab a direct handle on the actual <input> DOM elements,
  // so we can imperatively call .focus() on them (React state alone can't
  // do that — focus is a DOM action, not a render output).
  // inputRefs.current will end up as an array: [inputEl0, inputEl1, inputEl2, inputEl3]
  const inputRefs = useRef([]);

  function handleChange(e, index) {
    const value = e.target.value;

    // Guard: OTP boxes should only ever hold a single digit.
    // If somehow more than 1 character sneaks in (e.g. paste), ignore it here —
    // we handle paste separately below.
    if (value.length > 1) return;

    // Only allow numeric input — reject letters/symbols
    if (value && !/^\d$/.test(value)) return;

    // Build a NEW array rather than mutating the old one directly.
    // React needs a new array reference to know something changed and re-render.
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tell the parent page the current full code every time a digit changes,
    // so the parent can e.g. enable the Verify button once all 4 are filled.
    if (onChange) {
      onChange(newOtp.join(''));
    }

    // Auto-advance: if the user just TYPED a digit (not cleared one),
    // and there's a next box, move focus there automatically.
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    // UX nicety: if the current box is empty and the user hits Backspace,
    // jump focus back to the previous box (mirrors real OTP inputs you've used).
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    // If a user copies a full code (e.g. from a messaging app) and pastes it,
    // this spreads it across all boxes in one go instead of failing.
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();

    // Only proceed if what was pasted is all digits
    if (!/^\d+$/.test(pasted)) return;

    const digits = pasted.slice(0, length).split('');
    const newOtp = Array(length).fill('');
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    if (onChange) {
      onChange(newOtp.join(''));
    }

    // Focus the last filled box (or the last box if fully filled)
    const lastIndex = Math.min(digits.length, length - 1);
    inputRefs.current[lastIndex]?.focus();
  }

  return (
    // flex + gap lays the boxes out in a row with even spacing.
    // justify-center centers the whole group horizontally.
    <div className="flex justify-center gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          // This callback ref pattern stores each input's DOM node into
          // inputRefs.current[index] as soon as it mounts, so we can
          // .focus() it later from handleChange/handleKeyDown.
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric" // shows numeric keyboard on mobile
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          // OTP box color per spec: bg #e4e1e1, no visible border by default,
          // teal ring on focus for feedback, centered bold text
          className="h-16 w-16 rounded-lg bg-[#e4e1e1] text-center text-2xl font-bold text-[#545454]
                     focus:outline-none focus:ring-2 focus:ring-[#4fa9b8]"
        />
      ))}
    </div>
  );
}
