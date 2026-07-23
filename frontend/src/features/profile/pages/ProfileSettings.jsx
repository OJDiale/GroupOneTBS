import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NAVY = '#083335';
const SUBTITLE = '#545454';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
      <div className="w-52 font-bold text-black">
        {label}
      </div>

      <div className="text-[#545454]">
        {value}
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-black">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-lg bg-[#6b8a90] px-4 py-3 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-[#1cabb0]"
      />
    </div>
  );
}

function ReadOnlyCard({
  t,
  profile,
  onEdit,
}) {
  return (
    <div className="w-full max-w-3xl">

      <h1
        className="text-4xl font-extrabold text-center"
        style={{ color: NAVY }}
      >
        {t('heading')}
      </h1>

      <p
        className="text-center text-lg mt-2 mb-8"
        style={{ color: SUBTITLE }}
      >
        {t('subtitle')}
      </p>

      <div className="bg-white rounded-3xl shadow-xl border-4 border-[#7f8689] p-8">

        <InfoRow
          label={t('firstName')}
          value={profile.firstName}
        />

        <InfoRow
          label={t('lastName')}
          value={profile.lastName}
        />

        <InfoRow
          label={t('idNumber')}
          value={profile.idNumber}
        />

        <InfoRow
          label={t('email')}
          value={profile.email}
        />

        <InfoRow
          label={t('cellphone')}
          value={profile.cellphone}
        />

        <InfoRow
          label={t('password')}
          value={'•'.repeat(profile.password.length)}
        />

        <div className="flex justify-center mt-10">
          <button
            onClick={onEdit}
            className="bg-[#3292d1] hover:bg-[#287cb3] text-white font-bold rounded-full px-8 py-3 transition"
          >
            {t('editInformation')}
          </button>
        </div>

      </div>

    </div>
  );
}

function EditCard({
  t,
  formData,
  setFormData,
  onCancel,
  onSave,
}) {
  function handleChange(field) {
    return (e) =>
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
  }

  return (
    <div className="w-full max-w-3xl">

      <h1
        className="text-4xl font-extrabold text-center"
        style={{ color: NAVY }}
      >
        {t('editHeading')}
      </h1>

      <p
        className="text-center text-lg mt-2 mb-8"
        style={{ color: SUBTITLE }}
      >
        {t('editSubtitle')}
      </p>

      <div className="bg-white rounded-3xl shadow-xl border-4 border-[#7f8689] p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField
            label={t('firstName')}
            value={formData.firstName}
            onChange={handleChange('firstName')}
          />

          <InputField
            label={t('lastName')}
            value={formData.lastName}
            onChange={handleChange('lastName')}
          />

          <InputField
            label={t('idNumber')}
            value={formData.idNumber}
            onChange={handleChange('idNumber')}
          />

          <InputField
            label={t('email')}
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
          />

          <InputField
            label={t('cellphone')}
            value={formData.cellphone}
            onChange={handleChange('cellphone')}
          />

          <InputField
            label={t('password')}
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
          />

        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <button
            onClick={onCancel}
            className="bg-[#545454] hover:bg-[#444444] text-white font-bold rounded-full py-3 transition"
          >
            {t('cancel')}
          </button>

          <button
            onClick={onSave}
            className="bg-[#00bf63] hover:bg-[#00a957] text-white font-bold rounded-full py-3 transition"
          >
            {t('save')}
          </button>

        </div>

      </div>

    </div>
  );
}

export default function ProfileSettings() {
  const { t } = useTranslation('profile');

  // ============================================================
  // Replace these values with your backend data later.
  // ============================================================
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Dean',
    idNumber: '8509195012089',
    email: 'alex@gmail.com',
    cellphone: '0821234567',
    password: 'password123',
  });

  // false = read-only profile
  // true = edit profile
  const [editing, setEditing] = useState(false);

  // Copy of the profile used while editing.
  const [formData, setFormData] = useState(profile);

  function handleEdit() {
    setFormData(profile);
    setEditing(true);
  }

  function handleCancel() {
    setFormData(profile);
    setEditing(false);
  }

  async function handleSave() {
    try {
      // ==========================================================
      // BACKEND GOES HERE
      //
      // await axios.put('/api/profile', formData);
      //
      // ==========================================================

      setProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full flex justify-center py-10 px-6 bg-[#f0fdfb] min-h-screen">
      {!editing ? (
        <ReadOnlyCard
          t={t}
          profile={profile}
          onEdit={handleEdit}
        />
      ) : (
        <EditCard
          t={t}
          formData={formData}
          setFormData={setFormData}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
