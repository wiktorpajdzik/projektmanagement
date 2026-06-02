'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/contexts/LanguageContext';
import { Lang } from '@/lib/translations';

const FLAGS: { lang: Lang; flag: string; label: string }[] = [
  { lang: 'de', flag: '🇩🇪', label: 'DE' },
  { lang: 'en', flag: '🇬🇧', label: 'EN' },
  { lang: 'pl', flag: '🇵🇱', label: 'PL' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  const navBg = scrolled || open ? '#fff' : 'transparent';
  const navShadow = scrolled ? '0 1px 0 #E2E8F0' : 'none';

  return (
    <header
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'background 250ms, box-shadow 250ms', background: navBg, boxShadow: navShadow }}
      role="banner"
    >
      <nav
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', height: '40px', width: '200px' }}
          aria-label="ProjektManagement – zur Startseite"
        >
          {/* White logo — visible on dark hero */}
          <Image
            src="/logo_white.png"
            alt="ProjektManagement"
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'left center',
              transition: 'opacity 250ms',
              opacity: scrolled || open ? 0 : 1,
            }}
            priority
          />
          {/* Black logo — visible after scroll */}
          <Image
            src="/logo_black.png"
            alt="ProjektManagement"
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'left center',
              transition: 'opacity 250ms',
              opacity: scrolled || open ? 1 : 0,
            }}
            priority
          />
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="pm-hidden-mobile">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '15px', color: scrolled ? '#334155' : '#F8FAFC', letterSpacing: '0.02em', padding: '4px 0', transition: 'color 200ms' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#EA580C')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = scrolled ? '#334155' : '#F8FAFC')}
            >
              {l.label}
            </button>
          ))}

          {/* Language switcher – desktop */}
          <div style={{ display: 'flex', gap: '4px', marginLeft: '8px', borderLeft: `1px solid ${scrolled ? '#E2E8F0' : 'rgba(255,255,255,0.2)'}`, paddingLeft: '16px' }}>
            {FLAGS.map(({ lang: l, label }) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={`Sprache: ${label}`}
                style={{
                  background: lang === l ? '#EA580C' : 'transparent',
                  border: `1px solid ${lang === l ? '#EA580C' : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: 0,
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: lang === l ? '#fff' : (scrolled ? '#64748B' : 'rgba(255,255,255,0.7)'),
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  minHeight: '30px',
                }}
                onMouseEnter={(e) => { if (lang !== l) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#EA580C'; (e.currentTarget as HTMLButtonElement).style.color = '#EA580C'; } }}
                onMouseLeave={(e) => { if (lang !== l) { (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? '#E2E8F0' : 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = scrolled ? '#64748B' : 'rgba(255,255,255,0.7)'; } }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          className="pm-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#334155', display: 'none' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu – full dropdown */}
      {open && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Nav links */}
          <div style={{ padding: '4px 24px 0' }}>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '17px', color: '#334155', padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Language switcher – mobile */}
          <div style={{ display: 'flex', gap: '8px', padding: '16px 24px' }}>
            {FLAGS.map(({ lang: l, label }) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={label}
                style={{
                  background: lang === l ? '#EA580C' : 'transparent',
                  border: `1px solid ${lang === l ? '#EA580C' : '#E2E8F0'}`,
                  borderRadius: 0,
                  padding: '8px 16px',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: lang === l ? '#fff' : '#64748B',
                  cursor: 'pointer',
                  minHeight: '40px',
                  minWidth: '56px',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact info */}
          <div style={{ borderTop: '1px solid #F1F5F9', margin: '0 24px', padding: '16px 0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href={`tel:${t.footer.phone.replace(/\s/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <span style={{ width: '36px', height: '36px', background: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={16} color="#fff" strokeWidth={1.5} />
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                {t.footer.phone}
              </span>
            </a>
            <a
              href={`mailto:${t.footer.email}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <span style={{ width: '36px', height: '36px', background: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={16} color="#fff" strokeWidth={1.5} />
              </span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                {t.footer.email}
              </span>
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
