import { ImageResponse } from 'next/og';

/**
 * Social sharing card, generated at build time so there is no binary asset to
 * keep in sync with the brand.
 */
export const alt = 'Jivaayu Pet Care — Find veterinary doctors in Noida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#FAF6EF',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: 20,
            background: '#17544A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 38,
          }}
        >
          🐾
        </div>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#211E1A' }}>
          Jivaayu<span style={{ color: '#17544A' }}>&nbsp;Pet Care</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: '#211E1A',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Find the right care for your pet,</span>
          <span style={{ color: '#17544A' }}>right when they need it.</span>
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: '#6B6358', display: 'flex' }}>
          Nearby veterinary doctors in Noida — connect on WhatsApp.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {['📍 Nearby doctors', '⚡ No account needed', '💬 WhatsApp request'].map((chip) => (
          <div
            key={chip}
            style={{
              display: 'flex',
              background: '#FFFFFF',
              border: '2px solid #E6DCCD',
              borderRadius: 999,
              padding: '12px 24px',
              fontSize: 24,
              color: '#514A41',
              fontWeight: 600,
            }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
