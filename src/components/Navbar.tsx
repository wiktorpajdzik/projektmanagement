'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/contexts/LanguageContext';
import { Lang } from '@/lib/translations';

const FLAGS: { lang: Lang; label: string }[] = [
  { lang: 'de', label: 'DE' },
  { lang: 'en', label: 'EN' },
  { lang: 'pl', label: 'PL' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#leistungen', label: t.nav.services },
    { href: '#ueber-uns', label: t.nav.about },
    { href: '#galerie', label: t.nav.gallery },
    { href: '#kontakt', label: t.nav.contact },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrolledBg = 'rgba(10,10,10,0.97)';
  const heroBg = 'transparent';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 300ms, backdrop-filter 300ms, border-color 300ms',
        background: scrolled || open ? scrolledBg : heroBg,
        backdropFilter: scrolled || open ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,164,74,0.15)' : '1px solid transparent',
      }}
      role="banner"
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', height: '38px', width: '190px' }}
          aria-label="ProjektManagement – zur Startseite"
        >
          <Image
            src="/logo_white.png"
            alt="ProjektManagement"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
            priority
          />
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="pm-hidden-mobile">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#888880',
                padding: '4px 0',
                transition: 'color 200ms',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C4A44A')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#888880')}
            >
              {l.label}
            </button>
          ))}

          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: '0', marginLeft: '8px', borderLeft: '1px solid rgba(196,164,74,0.15)', paddingLeft: '20px' }}>
            {FLAGS.map(({ lang: l, label }) => {
              const isActive = lang === l;
              return (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-label={`Sprache: ${label}`}
                  style={{
                    background: isActive ? '#C4A44A' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #C4A44A' : '2px solid transparent',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.12em',
                    color: isActive ? '#0A0A0A' : '#555550',
                    cursor: 'pointer',
                    transition: 'all 180ms',
                    minHeight: '32px',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#C4A44A';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#555550';
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          className="pm-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#F9F7F4', display: 'none' }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#0A0A0A', borderTop: '1px solid rgba(196,164,74,0.15)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 24px 0' }}>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#888880',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', padding: '16px 24px' }}>
            {FLAGS.map(({ lang: l, label }) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? '#C4A44A' : 'transparent',
                  border: `1px solid ${lang === l ? '#C4A44A' : 'rgba(196,164,74,0.25)'}`,
                  borderRadius: 0,
                  padding: '8px 16px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: lang === l ? '#0A0A0A' : '#555550',
                  cursor: 'pointer',
                  minHeight: '40px',
                  minWidth: '52px',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(196,164,74,0.1)', margin: '0 24px', padding: '16px 0 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <span style={{ width: '36px', height: '36px', border: '1px solid rgba(196,164,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={15} color="#C4A44A" strokeWidth={1.5} />
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, color: '#F9F7F4' }}>{t.footer.phone}</span>
            </a>
            <a href={`mailto:${t.footer.email}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <span style={{ width: '36px', height: '36px', border: '1px solid rgba(196,164,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={15} color="#C4A44A" strokeWidth={1.5} />
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, color: '#F9F7F4' }}>{t.footer.email}</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .pm-hidden-mobile { display: none !important; }
          .pm-burger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .pm-burger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
