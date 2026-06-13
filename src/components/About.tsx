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
      style={{ background: '#F5F2EC', padding: '60px 0 120px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section divider */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,164,74,0.4) 30%, rgba(196,164,74,0.4) 70%, transparent)' }} />

      {/* Decorative circles */}
      <div aria-hidden="true" style={{ position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)', width: '700px', height: '700px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.07)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.05)', pointerEvents: 'none' }} />

      <div className="pm-about-grid" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Left: Text */}
        <div>
          <p style={labelStyle}>{t.nav.about}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: '#0A0A0A', marginBottom: '8px', lineHeight: 1.1 }}>
            {t.about.heading}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#C4A44A', marginBottom: '28px' }}>
            {t.about.subheading}
          </p>
          <div style={{ width: '40px', height: '1px', background: '#C4A44A', marginBottom: '28px' }} />
          <p style={bodyStyle}>{t.about.body}</p>
          <p style={{ ...bodyStyle, marginTop: '16px' }}>{t.about.body2}</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {checks.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CheckCircle2 size={16} color="#C4A44A" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#555550' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(196,164,74,0.15)' }}>
          {t.about.stats.map((stat, i) => (
            <div
              key={i}
              style={{ background: i === 0 ? '#C4A44A' : '#FFFFFF', padding: '40px 36px', transition: 'background 250ms', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={(e) => { if (i !== 0) (e.currentTarget as HTMLDivElement).style.background = '#F9F7F4'; }}
              onMouseLeave={(e) => { if (i !== 0) (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF'; }}
            >
              {i === 0 && <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(10,10,10,0.15)', pointerEvents: 'none' }} />}
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem, 5vw, 4rem)', fontWeight: 600, color: i === 0 ? '#0A0A0A' : '#0A0A0A', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '0.16em', textTransform: 'uppercase', color: i === 0 ? 'rgba(10,10,10,0.6)' : '#888880', marginTop: '10px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pm-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .pm-about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          #ueber-uns { padding: 80px 0 !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '11px',
  letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '14px',
};
const bodyStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, color: '#555550', lineHeight: 1.8,
};
