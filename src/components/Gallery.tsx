'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

type CategoryKey = 'Alle' | 'Trockenbau' | 'Putzarbeiten' | 'Fliesenlegen' | 'Malerarbeiten' | 'Komplettausbau';

interface GalleryItem {
  id: number;
  src: string;
  de: string;
  en: string;
  pl: string;
  cat: CategoryKey;
}

const ITEMS: GalleryItem[] = [
  { id: 1,  src: '/images/gallery/de.jpg',     de: 'Trockenbau – Badezimmer',          en: 'Drywall – Bathroom',          pl: 'Karton-gips – Łazienka',        cat: 'Trockenbau' },
  { id: 2,  src: '/images/gallery/de-2.jpg',   de: 'Trockenbau – Rigips-Wand',         en: 'Drywall – Plasterboard Wall',  pl: 'Karton-gips – Ściana GK',       cat: 'Trockenbau' },
  { id: 3,  src: '/images/gallery/de-3.jpg',   de: 'Trockenbau – Ständerwerk',         en: 'Drywall – Steel Frame',        pl: 'Karton-gips – Szkielet',        cat: 'Trockenbau' },
  { id: 4,  src: '/images/gallery/de-4.jpg',   de: 'Trockenbau – Verspachtelung',      en: 'Drywall – Jointing',           pl: 'Karton-gips – Szpachlowanie',   cat: 'Trockenbau' },
  { id: 5,  src: '/images/gallery/de-5.jpg',   de: 'Putzarbeiten – Außenputz',         en: 'Plastering – Exterior',        pl: 'Tynkowanie – Zewnętrzne',       cat: 'Putzarbeiten' },
  { id: 6,  src: '/images/gallery/de-6.jpg',   de: 'Fliesenlegen – Bodenfliesen',      en: 'Tiling – Floor Tiles',         pl: 'Płytki – Podłoga',              cat: 'Fliesenlegen' },
  { id: 7,  src: '/images/gallery/de-7.jpg',   de: 'Fliesenlegen – Verlegung',         en: 'Tiling – Laying in progress',  pl: 'Płytki – Układanie',            cat: 'Fliesenlegen' },
  { id: 8,  src: '/images/gallery/de-8.jpg',   de: 'Putzarbeiten – Innenputz',         en: 'Plastering – Interior',        pl: 'Tynkowanie – Wewnętrzne',       cat: 'Putzarbeiten' },
  { id: 9,  src: '/images/gallery/de-9.jpg',   de: 'Trockenbau – Fugenspachtel',       en: 'Drywall – Taping',             pl: 'Karton-gips – Fugowanie',       cat: 'Trockenbau' },
  { id: 10, src: '/images/gallery/de-10.jpg',  de: 'Trockenbau – Eckverspachtelung',   en: 'Drywall – Corner Jointing',    pl: 'Karton-gips – Narożniki',       cat: 'Trockenbau' },
  { id: 11, src: '/images/gallery/de-11.jpg',  de: 'Komplettausbau – Dachgeschoss',    en: 'Fit-Out – Attic Floor',        pl: 'Pod klucz – Poddasze',          cat: 'Komplettausbau' },
  { id: 12, src: '/images/gallery/de-12.jpg',  de: 'Komplettausbau – Treppenhaus',     en: 'Fit-Out – Staircase',          pl: 'Pod klucz – Klatka schodowa',   cat: 'Komplettausbau' },
  { id: 13, src: '/images/gallery/de-13.jpg',  de: 'Komplettausbau – Badezimmer',      en: 'Fit-Out – Bathroom',           pl: 'Pod klucz – Łazienka',          cat: 'Komplettausbau' },
  { id: 14, src: '/images/gallery/de-14.jpg',  de: 'Komplettausbau – Sauna',           en: 'Fit-Out – Sauna',              pl: 'Pod klucz – Sauna',             cat: 'Komplettausbau' },
  { id: 15, src: '/images/gallery/de-15.jpg',  de: 'Malerarbeiten – Ziegelwand',       en: 'Painting – Brick Wall Finish', pl: 'Malowanie – Ściana ceglana',    cat: 'Malerarbeiten' },
  { id: 16, src: '/images/gallery/de-16.jpg',  de: 'Komplettausbau – Dachbad',         en: 'Fit-Out – Attic Bathroom',     pl: 'Pod klucz – Łazienka poddasze', cat: 'Komplettausbau' },
  { id: 17, src: '/images/gallery/de-17.jpg',  de: 'Komplettausbau – Holzdecke',       en: 'Fit-Out – Wooden Ceiling',     pl: 'Pod klucz – Drewniany sufit',   cat: 'Komplettausbau' },
  { id: 18, src: '/images/gallery/de-18.jpg',  de: 'Fliesenlegen – Dekorwand Bad',     en: 'Tiling – Decorative Wall',     pl: 'Płytki – Ściana dekoracyjna',   cat: 'Fliesenlegen' },
  { id: 19, src: '/images/gallery/de-19.jpg',  de: 'Fliesenlegen – Großformat',        en: 'Tiling – Large Format',        pl: 'Płytki – Wielkoformatowe',      cat: 'Fliesenlegen' },
  { id: 20, src: '/images/gallery/de-20.jpg',  de: 'Komplettausbau – Premiumduschen',  en: 'Fit-Out – Premium Shower',     pl: 'Pod klucz – Premium prysznic',  cat: 'Komplettausbau' },
  { id: 21, src: '/images/gallery/de-21.jpg',  de: 'Fliesenlegen – Marmor Flur',       en: 'Tiling – Marble Hallway',      pl: 'Płytki – Marmurowy korytarz',   cat: 'Fliesenlegen' },
  { id: 22, src: '/images/gallery/de-22.jpg',  de: 'Fliesenlegen – Badezimmer',        en: 'Tiling – Bathroom',            pl: 'Płytki – Łazienka',             cat: 'Fliesenlegen' },
  { id: 23, src: '/images/gallery/de-23.jpg',  de: 'Fliesenlegen – Naturstein außen',  en: 'Tiling – Exterior Stonework',  pl: 'Płytki – Kamień zewnętrzny',    cat: 'Fliesenlegen' },
  { id: 24, src: '/images/gallery/de-24.jpg',  de: 'Fliesenlegen – Garagenboden',      en: 'Tiling – Garage Floor',        pl: 'Płytki – Podłoga garażu',       cat: 'Fliesenlegen' },
  { id: 25, src: '/images/gallery/de-25.jpg',  de: 'Fliesenlegen – Schwarzer Marmor',  en: 'Tiling – Black Marble',        pl: 'Płytki – Czarny marmur',        cat: 'Fliesenlegen' },
  { id: 26, src: '/images/gallery/de-26.jpg',  de: 'Fliesenlegen – Kontrast-Design',   en: 'Tiling – Contrast Design',     pl: 'Płytki – Kontrast design',      cat: 'Fliesenlegen' },
];

const CATS: { key: CategoryKey | 'Alle'; de: string; en: string; pl: string }[] = [
  { key: 'Alle',          de: 'Alle',          en: 'All',        pl: 'Wszystkie' },
  { key: 'Fliesenlegen',  de: 'Fliesen',       en: 'Tiling',     pl: 'Płytki' },
  { key: 'Trockenbau',    de: 'Trockenbau',    en: 'Drywall',    pl: 'Karton-gips' },
  { key: 'Komplettausbau',de: 'Komplettausbau',en: 'Fit-Out',    pl: 'Pod klucz' },
  { key: 'Putzarbeiten',  de: 'Putz',          en: 'Plastering', pl: 'Tynk' },
  { key: 'Malerarbeiten', de: 'Malerei',       en: 'Painting',   pl: 'Malowanie' },
];

export default function Gallery() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<CategoryKey | 'Alle'>('Alle');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === 'Alle' ? ITEMS : ITEMS.filter((i) => i.cat === active);

  const getLabel = (item: GalleryItem) => {
    if (lang === 'en') return item.en;
    if (lang === 'pl') return item.pl;
    return item.de;
  };

  const getCatLabel = (c: typeof CATS[0]) => {
    if (lang === 'en') return c.en;
    if (lang === 'pl') return c.pl;
    return c.de;
  };

  return (
    <section id="galerie" style={{ background: '#F8FAFC', padding: '100px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={labelStyle}>{t.nav.gallery}</p>
          <h2 style={headingStyle}>{t.gallery.heading}</h2>
          <p style={subStyle}>{t.gallery.subheading}</p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {CATS.map((c) => {
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key as CategoryKey | 'Alle')}
                style={{
                  padding: '8px 18px',
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  border: `1px solid ${isActive ? '#EA580C' : '#E2E8F0'}`,
                  background: isActive ? '#EA580C' : '#FFFFFF',
                  color: isActive ? '#fff' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#EA580C';
                    (e.currentTarget as HTMLButtonElement).style.color = '#EA580C';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0';
                    (e.currentTarget as HTMLButtonElement).style.color = '#64748B';
                  }
                }}
              >
                {getCatLabel(c)}
                {c.key !== 'Alle' && (
                  <span style={{ marginLeft: '6px', opacity: 0.6, fontSize: '11px' }}>
                    ({ITEMS.filter((i) => i.cat === c.key).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '6px',
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightbox(item)}
              aria-label={getLabel(item)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#E2E8F0',
              }}
              onMouseEnter={(e) => {
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement;
                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                if (ov) ov.style.opacity = '1';
                if (img) img.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement;
                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                if (ov) ov.style.opacity = '0';
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <Image
                src={item.src}
                alt={getLabel(item)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 400ms' }}
              />
              {/* Overlay */}
              <div
                className="ov"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(234,88,12,0.82)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: 0,
                  transition: 'opacity 220ms',
                  padding: '16px',
                }}
              >
                <ZoomIn size={26} color="#fff" strokeWidth={1.5} />
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', fontWeight: 500, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.4 }}>
                  {getLabel(item)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#94A3B8', marginTop: '24px', textAlign: 'right' }}>
          {filtered.length} / {ITEMS.length}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={getLabel(lightbox)}
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.95)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Schließen"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              zIndex: 201,
            }}
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '85dvh',
              aspectRatio: '4/3',
            }}
          >
            <Image
              src={lightbox.src}
              alt={getLabel(lightbox)}
              fill
              sizes="900px"
              style={{ objectFit: 'contain' }}
              priority
            />
            {/* Caption */}
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '13px',
                  color: '#64748B',
                  letterSpacing: '0.06em',
                }}
              >
                {getLabel(lightbox)}
              </span>
            </div>
          </div>

          {/* Prev / Next */}
          {(() => {
            const idx = filtered.findIndex((i) => i.id === lightbox.id);
            const prev = filtered[idx - 1];
            const next = filtered[idx + 1];
            return (
              <>
                {prev && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(prev); }}
                    style={navBtn('left')}
                    aria-label="Vorheriges Bild"
                  >
                    ‹
                  </button>
                )}
                {next && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox(next); }}
                    style={navBtn('right')}
                    aria-label="Nächstes Bild"
                  >
                    ›
                  </button>
                )}
              </>
            );
          })()}
        </div>
      )}
    </section>
  );
}

const navBtn = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed',
  top: '50%',
  [side]: '16px',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  fontSize: '2rem',
  lineHeight: 1,
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 202,
  transition: 'background 200ms',
});

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
