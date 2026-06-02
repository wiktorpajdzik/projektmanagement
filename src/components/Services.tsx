'use client';

import { useLang } from '@/contexts/LanguageContext';
import { Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2 } from 'lucide-react';

const ICONS = [Paintbrush, Layers, LayoutTemplate, Waves, Grid3X3, Building2];

export default function Services() {
  const { t } = useLang();

  return (
    <section
      id="leistungen"
      style={{
        background: '#F8FAFC',
        padding: '100px 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={labelStyle}>{t.nav.services}</p>
          <h2 style={headingStyle}>{t.services.heading}</h2>
          <p style={subStyle}>{t.services.subheading}</p>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2px',
            background: '#E2E8F0',
          }}
        >
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '40px 36px',
                  transition: 'background 200ms',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#FFF7F3';
                  const accent = e.currentTarget.querySelector('.service-accent') as HTMLElement;
                  if (accent) accent.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#FFFFFF';
                  const accent = e.currentTarget.querySelector('.service-accent') as HTMLElement;
                  if (accent) accent.style.opacity = '0';
                }}
              >
                {/* Hover accent line */}
                <div
                  className="service-accent"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#EA580C',
                    opacity: 0,
                    transition: 'opacity 200ms',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#FEF0E9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  <Icon size={22} color="#EA580C" strokeWidth={1.5} />
                </div>

                <h3
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#64748B',
                    lineHeight: 1.65,
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
  fontFamily: "'Jost', sans-serif",
  fontWeight: 500,
  fontSize: '12px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#EA580C',
  marginBottom: '12px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Bodoni Moda', serif",
  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
  fontWeight: 700,
  color: '#0F172A',
  marginBottom: '16px',
};

const subStyle: React.CSSProperties = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '17px',
  fontWeight: 300,
  color: '#64748B',
  maxWidth: '540px',
  lineHeight: 1.7,
};
