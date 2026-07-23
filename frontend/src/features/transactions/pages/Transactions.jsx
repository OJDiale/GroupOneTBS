import { useTranslation } from 'react-i18next';

const NAVY = '#083335';
const AMOUNT_GREEN = '#00bf63';
const DIVIDER_BLUE = '#c0e0f6';
const BUTTON_BLUE = '#3292d1';
const SUBTITLE_GRAY = '#545454';
const DATE_GRAY = '#a6a6a6';

// STUB DATA — replace once the backend exists.
const defaultTransactions = [
  { label: 'Top Up', dateTime: '13 July 2026, 15:30', amount: '+R50.00' },
  { label: 'Top Up', dateTime: '08 July 2026, 11:30', amount: '+R20.00' },
  { label: 'Top Up', dateTime: '02 July 2026, 06:50', amount: '+R25.00' },
  { label: 'Top Up', dateTime: '25 May 2026, 08:30', amount: '+R110.00' },
];

function TransactionRow({ transaction, isLast }) {
  const { t } = useTranslation('transactions');

  return (
    <div>
      <div className="flex justify-between items-start py-3">
        <div>
          <div className="text-lg font-semibold" style={{ color: SUBTITLE_GRAY }}>
            {t('topUp')}
          </div>

          <div className="text-sm" style={{ color: DATE_GRAY }}>
            {transaction.dateTime}
          </div>
        </div>

        <div className="text-xl font-bold" style={{ color: AMOUNT_GREEN }}>
          {transaction.amount}
        </div>
      </div>

      {!isLast && (
        <hr
          style={{
            border: 'none',
            borderTop: `3px solid ${DIVIDER_BLUE}`,
            margin: 0,
          }}
        />
      )}
    </div>
  );
}

export default function Transactions({
  transactions = defaultTransactions,
  onLoadMore = () => {},
}) {
  const { t } = useTranslation('transactions');

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold" style={{ color: NAVY }}>
          {t('heading')}
        </h1>

        <p style={{ color: SUBTITLE_GRAY }} className="text-lg mt-1">
          {t('subtitle')}
        </p>

        <div className="mt-6 rounded-3xl border-4 border-[#7f8689] bg-white p-7 text-left shadow-lg">
          {transactions.map((tx, i) => (
            <TransactionRow
              key={i}
              transaction={tx}
              isLast={i === transactions.length - 1}
            />
          ))}

          <div className="flex justify-center mt-5">
            <button
              onClick={onLoadMore}
              className="text-white font-bold px-6 py-2 rounded-full hover:opacity-90 transition"
              style={{ background: BUTTON_BLUE }}
            >
              {t('loadMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
