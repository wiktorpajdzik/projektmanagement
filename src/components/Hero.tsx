'use client';

import { useLang } from '@/contexts/LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

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
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Background image */}
      <Image
        src="/images/hero-bg-new.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.55 }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(10,10,10,0.88) 35%, rgba(10,10,10,0.4) 100%)',
        }}
      />

      {/* Gold vertical accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          bottom: '20%',
          width: '3px',
          background: 'linear-gradient(180deg, transparent, #C4A44A 30%, #C4A44A 70%, transparent)',
        }}
      />

      {/* Main content — vertically centered, grows to fill */}
      <div
        className="pm-hero-content"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px 24px 0',
          position: 'relative',
          zIndex: 1,
          alignSelf: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C4A44A',
              marginBottom: '28px',
            }}
          >
            {t.hero.tagline}
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 600,
              color: '#F9F7F4',
              lineHeight: 1.05,
              marginBottom: '28px',
              maxWidth: '820px',
              whiteSpace: 'pre-line',
            }}
          >
            {t.hero.heading}
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              fontWeight: 300,
              color: '#888880',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '44px',
            }}
          >
            {t.hero.subheading}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              onClick={() => scrollTo('#kontakt')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#C4A44A',
                color: '#0A0A0A',
                border: 'none',
                padding: '15px 32px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#E2C97E';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#C4A44A';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              {t.hero.cta_primary}
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => scrollTo('#leistungen')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'transparent',
                color: '#F9F7F4',
                border: '1px solid rgba(196,164,74,0.35)',
                padding: '15px 32px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#C4A44A';
                (e.currentTarget as HTMLButtonElement).style.color = '#C4A44A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(196,164,74,0.35)';
                (e.currentTarget as HTMLButtonElement).style.color = '#F9F7F4';
              }}
            >
              {t.hero.cta_secondary}
            </button>
          </div>
        </div>
      </div>

      {/* Stats — pinned to bottom, always visible */}
      <div
        className="pm-hero-stats"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1280px',
          alignSelf: 'center',
          padding: '0 24px',
          boxSizing: 'border-box',
          marginBottom: '72px',
          marginTop: '48px',
        }}
      >
        <div
          style={{
            borderTop: '1px solid rgba(196,164,74,0.2)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
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
                borderRight: i < 1 ? '1px solid rgba(196,164,74,0.15)' : 'none',
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 600,
                color: '#C4A44A',
                lineHeight: 1,
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 400,
                color: '#555550',
                marginTop: '6px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}>
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
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#555550',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bounce 2s infinite',
          zIndex: 2,
        }}
      >
        <ChevronDown size={20} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 640px) {
          .pm-hero-content { padding-top: 96px !important; }
          .pm-hero-stats { margin-bottom: 48px !important; margin-top: 32px !important; }
        }
      `}</style>
    </section>
  );
}
