import { useTranslation } from 'react-i18next';
import virtualCardImage from '../../../resources/virtual-card.png';

const NAVY = '#083335';
const SUBTITLE_GRAY = '#545454';
const BUTTON_BLUE = '#3292d1';

function VirtualCard({ last4 = '1112', firstDigits = '0000', validThru = '30/30' }) {
  return (
    <div 
      style={{
        position: 'relative',
        containerType: 'inline-size',
        width: 'min(620px, 100%)',
        maxWidth: '100%',
        aspectRatio: '1.6 / 1',
        borderRadius: 16,
        background: 'linear-gradient(135deg, #d7dde5, #c3cad4)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
        padding: '4.5cqw 5cqw',
        boxSizing: 'border-box',
        color: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '2.2cqw',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'left center',
          fontSize: '1.8cqw',
          fontWeight: 600,
          letterSpacing: 0,
          color: '#555',
          whiteSpace: 'nowrap',
        }}
      >
        VALID ONLY IN SOUTH AFRICA
      </div>

      <div
        style={{
          position: 'absolute',
          top: '4cqw',
          right: '5cqw',
          display: 'flex',
          alignItems: 'center',
          gap: '2.5cqw',
        }}
      >
        <div style={{ width: '10cqw', textAlign: 'center', fontSize: '1.6cqw', fontWeight: 700, color: '#444' }}>
          CITY OF<br />TSHWANE
        </div>

        <div style={{ width: '16cqw', textAlign: 'center', fontSize: '1.6cqw', fontWeight: 700, color: '#444' }}>
          AREYENG<br />
          <span style={{ fontWeight: 400 }}>CONNECTING THE CAPITAL</span>
        </div>
      </div>

      <div style={{ marginTop: '9.5cqw', marginLeft: '5cqw', display: 'flex', alignItems: 'center', gap: '3cqw' }}>
        <div>
          <div style={{ fontSize: '2.1cqw', fontWeight: 600, marginBottom: '1.3cqw' }}>
            For electronic use only
          </div>

          <div
            style={{
              width: '9.5cqw',
              height: '7cqw',
              borderRadius: 6,
              background: 'linear-gradient(135deg, #f7d774, #d9a832)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.5cqw',
            }}
          >
            ◯◯
          </div>
        </div>

        <div style={{ fontSize: '3.8cqw', transform: 'rotate(90deg)' }}></div>
      </div>

      <div style={{ marginLeft: '5cqw', marginTop: '3.2cqw' }}>
        <div style={{ fontSize: '1.9cqw', fontWeight: 600 }}>123</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3.8cqw' }}>
          <div style={{ fontSize: '3.5cqw', fontWeight: 700 }}>{firstDigits}</div>

          <div style={{ fontSize: '1.6cqw', textAlign: 'center' }}>
            VALID<br />THRU
          </div>

          <div style={{ fontSize: '3.5cqw', fontWeight: 700 }}>{validThru}</div>
        </div>

        <div style={{ fontSize: '3.3cqw', fontWeight: 700, marginTop: '1cqw', letterSpacing: 0 }}>
          0123 4567 8910 {last4}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '3.2cqw',
          right: '5cqw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6cqw',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '50%',
            padding: '0.6cqw 2.2cqw',
            fontSize: '1.9cqw',
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#555',
          }}
        >
          Debit
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '4.5cqw',
              height: '4.5cqw',
              borderRadius: '50%',
              background: '#EB001B',
              marginRight: '-1.6cqw',
            }}
          />
          <div
            style={{
              width: '4.5cqw',
              height: '4.5cqw',
              borderRadius: '50%',
              background: '#F79E1B',
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function MyCard({ onTapCard = () => {} }) {
  const { t } = useTranslation('myCard');

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
      <h1
        className="text-center text-4xl font-extrabold"
        style={{ color: NAVY }}
      >
        {t('heading')}
      </h1>

      <p
        className="text-center text-lg mt-1 max-w-xl"
        style={{ color: SUBTITLE_GRAY }}
      >
        {t('subtitle')}
      </p>

      <div className="mt-4">
        <img
          src={virtualCardImage}
          alt=""
          className="h-auto w-full max-w-[1200px]"
        />
      </div>

      <button
        onClick={onTapCard}
        className="mt-3 self-center rounded-full px-6 py-2 font-bold text-white transition hover:opacity-90"
        style={{ background: BUTTON_BLUE }}
      >
        {t('tapCard')}
      </button>
    </div>
  );
}