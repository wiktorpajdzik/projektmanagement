'use client';

import { useLang } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const CHECKS = {
  de: ['Pünktliche Fertigstellung', 'Transparente Kommunikation', 'Saubere Arbeit', 'Fachgerechte Ausführung'],
  en: ['On-time delivery', 'Transparent communication', 'Clean worksite', 'Expert craftsmanship'],
  pl: ['Terminowa realizacja', 'Transparentna komunikacja', 'Czyste miejsce pracy', 'Fachowe wykonanie'],
};

export default function About() {
  const { lang, t } = useLang();
  const checks = CHECKS[lang];

  return (
    <section
      id="ueber-uns"
      style={{
        background: '#0F172A',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(234,88,12,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left: Text */}
        <div>
          <p style={{ ...labelStyleDark }}>{t.nav.about}</p>
          <h2
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#F8FAFC',
              marginBottom: '8px',
            }}
          >
            {t.about.heading}
          </h2>
          <p
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#EA580C',
              marginBottom: '28px',
            }}
          >
            {t.about.subheading}
          </p>
          <p style={bodyStyle}>{t.about.body}</p>
          <p style={{ ...bodyStyle, marginTop: '16px' }}>{t.about.body2}</p>

          {/* Checklist */}
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {checks.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} color="#EA580C" strokeWidth={2} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '15px', fontWeight: 400, color: '#94A3B8' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {t.about.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? '#EA580C' : '#1E293B',
                padding: '40px 36px',
                borderLeft: i !== 0 ? '4px solid #1E293B' : 'none',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => {
                if (i !== 0) (e.currentTarget as HTMLDivElement).style.background = '#263348';
              }}
              onMouseLeave={(e) => {
                if (i !== 0) (e.currentTarget as HTMLDivElement).style.background = '#1E293B';
              }}
            >
              <div
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  color: i === 0 ? '#fff' : '#EA580C',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: i === 0 ? 'rgba(255,255,255,0.8)' : '#64748B',
                  marginTop: '8px',
                  letterSpacing: '0.04em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const labelStyleDark: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#EA580C',
  marginBottom: '12px',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '16px',
  fontWeight: 300,
  color: '#94A3B8',
  lineHeight: 1.75,
};
