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
    <footer style={{ background: '#0F0E0C', color: '#555550', borderTop: '1px solid rgba(196,164,74,0.12)' }} role="contentinfo">
      <div
        className="pm-footer-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          borderBottom: '1px solid rgba(196,164,74,0.08)',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <Image
              src="/logo_white.png"
              alt="ProjektManagement"
              width={180}
              height={46}
              style={{ objectFit: 'contain', objectPosition: 'left center', opacity: 0.85 }}
            />
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: '#555550', lineHeight: 1.6 }}>
            {t.footer.tagline}
          </p>
          <div style={{ width: '32px', height: '1px', background: '#C4A44A', marginTop: '20px', opacity: 0.6 }} />
        </div>

        {/* Navigation */}
        <div>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '24px' }}>
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
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 300,
                    color: '#555550',
                    padding: 0,
                    transition: 'color 200ms',
                    textAlign: 'left',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C4A44A')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#555550')}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '24px' }}>
            {t.nav.contact}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { Icon: MapPin, val: t.footer.address },
              { Icon: Phone, val: t.footer.phone, href: `tel:${t.footer.phone.replace(/\s/g, '')}` },
              { Icon: Mail, val: t.footer.email, href: `mailto:${t.footer.email}` },
            ].map(({ Icon, val, href }, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Icon size={13} color="#C4A44A" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '3px' }} />
                {href ? (
                  <a
                    href={href}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#555550', textDecoration: 'none', transition: 'color 200ms' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#C4A44A')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#555550')}
                  >
                    {val}
                  </a>
                ) : (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#555550' }}>{val}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pm-footer-bottom"
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
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#333330', letterSpacing: '0.06em', margin: 0 }}>
          © {year} {t.footer.company}. {t.footer.rights}
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#333330', letterSpacing: '0.06em', margin: 0 }}>
          {t.footer.built_by}{' '}
          <a
            href="https://wprojects.pl"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#C4A44A', textDecoration: 'none', transition: 'color 200ms' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#E2C97E')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#C4A44A')}
          >
            wprojects
          </a>
        </p>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pm-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding-top: 48px !important; padding-bottom: 40px !important; }
          .pm-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
        }
      `}</style>
    </footer>
  );
}
