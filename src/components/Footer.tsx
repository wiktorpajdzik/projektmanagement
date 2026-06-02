'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#leistungen', label: t.nav.services },
    { href: '#ueber-uns', label: t.nav.about },
    { href: '#galerie', label: t.nav.gallery },
    { href: '#kontakt', label: t.nav.contact },
  ];

  return (
    <footer
      style={{
        background: '#0F172A',
        color: '#94A3B8',
        paddingTop: '64px',
      }}
      role="contentinfo"
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Image
              src="/logo_white.png"
              alt="ProjektManagement"
              width={200}
              height={52}
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>
          <p style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic', fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
            {t.footer.tagline}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569', marginBottom: '20px' }}>
            Navigation
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#64748B',
                    padding: 0,
                    transition: 'color 200ms',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#EA580C')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#64748B')}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569', marginBottom: '20px' }}>
            {t.nav.contact}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { Icon: MapPin, val: t.footer.address },
              { Icon: Phone, val: t.footer.phone, href: `tel:${t.footer.phone.replace(/\s/g, '')}` },
              { Icon: Mail, val: t.footer.email, href: `mailto:${t.footer.email}` },
            ].map(({ Icon, val, href }, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Icon size={15} color="#EA580C" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                {href ? (
                  <a
                    href={href}
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', color: '#64748B', textDecoration: 'none', transition: 'color 200ms' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#EA580C')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#64748B')}
                  >
                    {val}
                  </a>
                ) : (
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', color: '#64748B' }}>{val}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#475569', margin: 0 }}>
          © {year} {t.footer.company}. {t.footer.rights}
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#475569', margin: 0 }}>
          {t.footer.built_by}{' '}
          <a
            href="https://wprojects.pl"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#EA580C', textDecoration: 'none', fontWeight: 500, transition: 'color 200ms' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#F97316')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#EA580C')}
          >
            wprojects
          </a>
        </p>
      </div>
    </footer>
  );
}
