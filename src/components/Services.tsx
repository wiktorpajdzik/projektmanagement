'use client';

import { useLang } from '@/contexts/LanguageContext';
import { Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2 } from 'lucide-react';

const ICONS = [Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2];

const IMAGES = [
  '/images/malowanie.jpg',
  '/images/tynkowanie.jpg',
  '/images/gips.jpg',
  '/images/posadzka.jpg',
  '/images/plytki.jpg',
  '/images/72732.jpg',
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="leistungen" style={{ background: '#F5F2EC', padding: '120px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: '72px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p style={labelStyle}>{t.nav.services}</p>
          <h2 style={headingStyle}>{t.services.heading}</h2>
          <div style={{ width: '60px', height: '2px', background: '#C4A44A', margin: '20px 0 24px' }} />
          <p style={subStyle}>{t.services.subheading}</p>
        </div>

        <style>{`
          .pm-services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: #D8D4CC;
          }
          @media (max-width: 900px) { .pm-services-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 560px) { .pm-services-grid { grid-template-columns: 1fr; } }
          @media (max-width: 640px) {
            #leistungen { padding: 80px 0 !important; }
            .pm-service-card { padding: 32px 24px !important; }
          }
        `}</style>
        <div className="pm-services-grid">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="service-card pm-service-card"
                style={{
                  background: '#FDFCF9',
                  padding: '44px 40px',
                  transition: 'background 350ms',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.backgroundImage = `url(${IMAGES[i]})`;
                  card.style.backgroundSize = 'cover';
                  card.style.backgroundPosition = 'center';
                  const overlay = card.querySelector('.s-overlay') as HTMLElement;
                  const content = card.querySelector('.s-content') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                  if (content) content.style.opacity = '0';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.backgroundImage = 'none';
                  const overlay = card.querySelector('.s-overlay') as HTMLElement;
                  const content = card.querySelector('.s-content') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                  if (content) content.style.opacity = '1';
                }}
              >
                {/* Dark overlay on hover */}
                <div
                  className="s-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10,10,10,0.55)',
                    opacity: 0,
                    transition: 'opacity 350ms',
                    pointerEvents: 'none',
                  }}
                />

                {/* Card content — fades out on hover */}
                <div className="s-content" style={{ transition: 'opacity 250ms', position: 'relative', zIndex: 1 }}>
                  {/* Number */}
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 400, color: 'rgba(196,164,74,0.15)', position: 'absolute', top: '-28px', right: '0', lineHeight: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      border: '1px solid rgba(10,10,10,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '28px',
                    }}
                  >
                    <Icon size={20} color="#C4A44A" strokeWidth={1.5} />
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#0A0A0A',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ width: '32px', height: '1px', background: '#D8D4CC', marginBottom: '16px' }} />

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#888880',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase',
  color: '#C4A44A',
  marginBottom: '16px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
  fontWeight: 600,
  color: '#0A0A0A',
  lineHeight: 1.1,
};

const subStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '16px',
  fontWeight: 300,
  color: '#888880',
  maxWidth: '500px',
  lineHeight: 1.75,
};
