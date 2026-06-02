'use client';

import { useLang } from '@/contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
        background: '#0F172A',
      }}
    >
      {/* Background pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(234,88,12,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,88,12,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orange accent bar left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: '15%',
          bottom: '15%',
          width: '4px',
          background: '#EA580C',
        }}
      />

      {/* Content — same container as nav */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'left',
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#EA580C',
            marginBottom: '24px',
          }}
        >
          {t.hero.tagline}
        </p>

        <h1
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 700,
            color: '#F8FAFC',
            lineHeight: 1.08,
            marginBottom: '28px',
            maxWidth: '760px',
            whiteSpace: 'pre-line',
          }}
        >
          {t.hero.heading}
        </h1>

        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            fontWeight: 300,
            color: '#94A3B8',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '48px',
          }}
        >
          {t.hero.subheading}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <button
            onClick={() => scrollTo('#kontakt')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#EA580C',
              color: '#fff',
              border: 'none',
              padding: '16px 32px',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'background 200ms, transform 200ms',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C2410C';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#EA580C';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            {t.hero.cta_primary}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => scrollTo('#leistungen')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              color: '#F8FAFC',
              border: '1px solid rgba(248,250,252,0.25)',
              padding: '16px 32px',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248,250,252,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248,250,252,0.25)';
            }}
          >
            {t.hero.cta_secondary}
          </button>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            marginTop: '80px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '32px',
          }}
        >
          {[
            { num: '10+', label: 'Jahre Erfahrung' },
            { num: '500+', label: 'Projekte' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                paddingRight: '48px',
                marginRight: '48px',
                borderRight: i < 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div style={{ fontFamily: "'Bodoni Moda', serif", fontSize: '2rem', fontWeight: 700, color: '#EA580C' }}>
                {s.num}
              </div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', fontWeight: 400, color: '#64748B', marginTop: '2px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo('#leistungen')}
        aria-label="Nach unten scrollen"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#64748B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          animation: 'bounce 2s infinite',
        }}
      >
        <ChevronDown size={24} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
