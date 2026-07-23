import { useRef, useState } from 'react';

// Manages the digit boxes only — timer, banner, and buttons live in the parent page.
// Reports the finished code upward via onChange.
export default function OTPInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(''));

  // Array of refs so we can .focus() a specific box imperatively (state alone can't do that)
  const inputRefs = useRef([]);

  function handleChange(e, index) {
    const value = e.target.value;
    if (value.length > 1) return; // one char per box only
    if (value && !/^\d$/.test(value)) return; // digits only

    const newOtp = [...otp]; // new array so React detects the change
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    // auto-advance to next box after typing a digit
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    // backspace on an empty box jumps back a box
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pasted)) return;

    const digits = pasted.slice(0, length).split('');
    const newOtp = Array(length).fill('');
    digits.forEach((digit, i) => (newOtp[i] = digit));
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    const lastIndex = Math.min(digits.length, length - 1);
    inputRefs.current[lastIndex]?.focus();
  }

  return (
    <div className="flex justify-center gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)} // stores this box's DOM node
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-16 w-16 rounded-lg bg-[#99a2a2] text-center text-2xl font-bold text-[#545454]
                     focus:outline-none focus:ring-2 focus:ring-[#1cabb0]"
        />
      ))}
    </div>
  );
}
