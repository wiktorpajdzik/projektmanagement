'use client';

import { useLang } from '@/contexts/LanguageContext';
import { Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2 } from 'lucide-react';

const ICONS = [Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2];

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
                  transition: 'background 250ms',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#0A0A0A';
                  const title = e.currentTarget.querySelector('.s-title') as HTMLElement;
                  const desc = e.currentTarget.querySelector('.s-desc') as HTMLElement;
                  const line = e.currentTarget.querySelector('.s-line') as HTMLElement;
                  const iconBox = e.currentTarget.querySelector('.s-icon') as HTMLElement;
                  if (title) title.style.color = '#F9F7F4';
                  if (desc) desc.style.color = '#888880';
                  if (line) line.style.background = '#C4A44A';
                  if (iconBox) iconBox.style.borderColor = 'rgba(196,164,74,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#FDFCF9';
                  const title = e.currentTarget.querySelector('.s-title') as HTMLElement;
                  const desc = e.currentTarget.querySelector('.s-desc') as HTMLElement;
                  const line = e.currentTarget.querySelector('.s-line') as HTMLElement;
                  const iconBox = e.currentTarget.querySelector('.s-icon') as HTMLElement;
                  if (title) title.style.color = '#0A0A0A';
                  if (desc) desc.style.color = '#888880';
                  if (line) line.style.background = '#D8D4CC';
                  if (iconBox) iconBox.style.borderColor = 'rgba(10,10,10,0.12)';
                }}
              >
                {/* Number */}
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 400, color: 'rgba(196,164,74,0.15)', position: 'absolute', top: '16px', right: '24px', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div
                  className="s-icon"
                  style={{
                    width: '52px',
                    height: '52px',
                    border: '1px solid rgba(10,10,10,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    transition: 'border-color 250ms',
                  }}
                >
                  <Icon size={20} color="#C4A44A" strokeWidth={1.5} />
                </div>

                <h3
                  className="s-title"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    marginBottom: '8px',
                    transition: 'color 250ms',
                  }}
                >
                  {item.title}
                </h3>

                <div
                  className="s-line"
                  style={{ width: '32px', height: '1px', background: '#D8D4CC', marginBottom: '16px', transition: 'background 250ms' }}
                />

                <p
                  className="s-desc"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#888880',
                    lineHeight: 1.7,
                    transition: 'color 250ms',
                  }}
                >
                  {item.desc}
                </p>
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
