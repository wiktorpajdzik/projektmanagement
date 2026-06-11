'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

type CategoryKey = 'Fliesenlegen' | 'Komplettausbau' | 'Trockenbau' | 'Putzarbeiten' | 'Malerarbeiten';

interface GalleryItem {
  id: number;
  src: string;
  de: string; en: string; pl: string;
}

interface Category {
  key: CategoryKey;
  de: string; en: string; pl: string;
  cover: string;
  items: GalleryItem[];
}

const CATEGORIES: Category[] = [
  {
    key: 'Fliesenlegen', de: 'Fliesenlegen', en: 'Tiling', pl: 'Płytki',
    cover: '/images/gallery/fliesenlegen/5.jpg',
    items: [
      { id: 1,  src: '/images/gallery/fliesenlegen/1.jpg',  de: 'Bodenfliesen',      en: 'Floor Tiles',       pl: 'Podłoga' },
      { id: 2,  src: '/images/gallery/fliesenlegen/2.jpg',  de: 'Verlegung',         en: 'Laying',            pl: 'Układanie' },
      { id: 3,  src: '/images/gallery/fliesenlegen/3.jpg',  de: 'Dekorwand Bad',     en: 'Decorative Wall',   pl: 'Ściana dekoracyjna' },
      { id: 4,  src: '/images/gallery/fliesenlegen/4.jpg',  de: 'Großformat',        en: 'Large Format',      pl: 'Wielkoformatowe' },
      { id: 5,  src: '/images/gallery/fliesenlegen/5.jpg',  de: 'Marmor Flur',       en: 'Marble Hallway',    pl: 'Marmurowy korytarz' },
      { id: 6,  src: '/images/gallery/fliesenlegen/6.jpg',  de: 'Badezimmer',        en: 'Bathroom',          pl: 'Łazienka' },
      { id: 7,  src: '/images/gallery/fliesenlegen/7.jpg',  de: 'Naturstein außen',  en: 'Stonework',         pl: 'Kamień zewnętrzny' },
      { id: 8,  src: '/images/gallery/fliesenlegen/8.jpg',  de: 'Garagenboden',      en: 'Garage Floor',      pl: 'Podłoga garażu' },
      { id: 9,  src: '/images/gallery/fliesenlegen/9.jpg',  de: 'Schwarzer Marmor',  en: 'Black Marble',      pl: 'Czarny marmur' },
      { id: 10, src: '/images/gallery/fliesenlegen/10.jpg', de: 'Kontrast-Design',   en: 'Contrast Design',   pl: 'Kontrast design' },
    ],
  },
  {
    key: 'Komplettausbau', de: 'Komplettausbau', en: 'Fit-Out', pl: 'Pod klucz',
    cover: '/images/gallery/komplettausbau/3.jpg',
    items: [
      { id: 1, src: '/images/gallery/komplettausbau/1.jpg', de: 'Dachgeschoss',   en: 'Attic Floor',     pl: 'Poddasze' },
      { id: 2, src: '/images/gallery/komplettausbau/2.jpg', de: 'Treppenhaus',    en: 'Staircase',       pl: 'Klatka schodowa' },
      { id: 3, src: '/images/gallery/komplettausbau/3.jpg', de: 'Badezimmer',     en: 'Bathroom',        pl: 'Łazienka' },
      { id: 4, src: '/images/gallery/komplettausbau/4.jpg', de: 'Sauna',          en: 'Sauna',           pl: 'Sauna' },
      { id: 5, src: '/images/gallery/komplettausbau/5.jpg', de: 'Dachbad',        en: 'Attic Bathroom',  pl: 'Łazienka poddasze' },
      { id: 6, src: '/images/gallery/komplettausbau/6.jpg', de: 'Holzdecke',      en: 'Wooden Ceiling',  pl: 'Drewniany sufit' },
      { id: 7, src: '/images/gallery/komplettausbau/7.jpg', de: 'Premiumdusche',  en: 'Premium Shower',  pl: 'Premium prysznic' },
    ],
  },
  {
    key: 'Trockenbau', de: 'Trockenbau', en: 'Drywall', pl: 'Karton-gips',
    cover: '/images/gallery/trockenbau/1.jpg',
    items: [
      { id: 1, src: '/images/gallery/trockenbau/1.jpg', de: 'Badezimmer',        en: 'Bathroom',          pl: 'Łazienka' },
      { id: 2, src: '/images/gallery/trockenbau/2.jpg', de: 'Rigips-Wand',       en: 'Plasterboard Wall', pl: 'Ściana GK' },
      { id: 3, src: '/images/gallery/trockenbau/3.jpg', de: 'Ständerwerk',       en: 'Steel Frame',       pl: 'Szkielet' },
      { id: 4, src: '/images/gallery/trockenbau/4.jpg', de: 'Verspachtelung',    en: 'Jointing',          pl: 'Szpachlowanie' },
      { id: 5, src: '/images/gallery/trockenbau/5.jpg', de: 'Fugenspachtel',     en: 'Taping',            pl: 'Fugowanie' },
      { id: 6, src: '/images/gallery/trockenbau/6.jpg', de: 'Eckverspachtelung', en: 'Corner Jointing',   pl: 'Narożniki' },
    ],
  },
  {
    key: 'Putzarbeiten', de: 'Putzarbeiten', en: 'Plastering', pl: 'Tynkowanie',
    cover: '/images/gallery/putzarbeiten/1.jpg',
    items: [
      { id: 1, src: '/images/gallery/putzarbeiten/1.jpg', de: 'Außenputz', en: 'Exterior Plaster', pl: 'Tynk zewnętrzny' },
      { id: 2, src: '/images/gallery/putzarbeiten/2.jpg', de: 'Innenputz', en: 'Interior Plaster', pl: 'Tynk wewnętrzny' },
    ],
  },
  {
    key: 'Malerarbeiten', de: 'Malerarbeiten', en: 'Painting', pl: 'Malowanie',
    cover: '/images/gallery/malerarbeiten/1.jpg',
    items: [
      { id: 1, src: '/images/gallery/malerarbeiten/1.jpg', de: 'Ziegelwand', en: 'Brick Wall Finish', pl: 'Ściana ceglana' },
    ],
  },
];

interface PopupState { cat: Category; lightboxId: number | null; }

export default function Gallery() {
  const { lang, t } = useLang();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [popup, setPopup] = useState<PopupState | null>(null);

  const getCatName = (c: Category) => lang === 'en' ? c.en : lang === 'pl' ? c.pl : c.de;
  const getLabel   = (item: GalleryItem) => lang === 'en' ? item.en : lang === 'pl' ? item.pl : item.de;

  const scroll = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
  };

  const openPopup = (cat: Category) => setPopup({ cat, lightboxId: null });
  const closePopup = () => setPopup(null);
  const openLightbox = (id: number) => setPopup(p => p ? { ...p, lightboxId: id } : null);
  const closeLightbox = () => setPopup(p => p ? { ...p, lightboxId: null } : null);

  const lbItems  = popup?.cat.items ?? [];
  const lbIdx    = popup?.lightboxId != null ? lbItems.findIndex(i => i.id === popup.lightboxId) : -1;
  const lbItem   = lbIdx >= 0 ? lbItems[lbIdx] : null;

  const goPrev = useCallback(() => { if (lbIdx > 0) openLightbox(lbItems[lbIdx - 1].id); }, [lbIdx, lbItems]);
  const goNext = useCallback(() => { if (lbIdx < lbItems.length - 1) openLightbox(lbItems[lbIdx + 1].id); }, [lbIdx, lbItems]);

  useEffect(() => {
    if (!popup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { lbItem ? closeLightbox() : closePopup(); }
      if (lbItem) {
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [popup, lbItem, goPrev, goNext]);

  return (
    <section id="galerie" style={{ background: '#0F0F0F', padding: '120px 0' }}>

      {/* Header */}
      <div className="pm-gallery-header" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={labelStyle}>{t.nav.gallery}</p>
          <h2 style={headingStyle}>{t.gallery.heading}</h2>
          <div style={{ width: '60px', height: '2px', background: '#C4A44A', marginTop: '16px' }} />
        </div>
        {/* Arrows */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => scroll('left')} aria-label="Zurück" style={arrowBtn}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll('right')} aria-label="Weiter" style={arrowBtn}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider — full bleed, cards uniform 1:1 */}
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '4px',
          padding: '0 24px',
          scrollbarWidth: 'none',
        }}
        className="pm-hide-sb"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => openPopup(cat)}
            aria-label={getCatName(cat)}
            style={{
              flexShrink: 0,
              width: 'clamp(240px, 28vw, 360px)',
              aspectRatio: '1 / 1',
              scrollSnapAlign: 'start',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
              background: '#1A1A1A',
              display: 'block',
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img') as HTMLImageElement;
              const ov  = e.currentTarget.querySelector('.cat-ov') as HTMLElement;
              if (img) img.style.transform = 'scale(1.07)';
              if (ov)  ov.style.opacity    = '1';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img') as HTMLImageElement;
              const ov  = e.currentTarget.querySelector('.cat-ov') as HTMLElement;
              if (img) img.style.transform = 'scale(1)';
              if (ov)  ov.style.opacity    = '0';
            }}
          >
            <Image
              src={cat.cover}
              alt={getCatName(cat)}
              fill sizes="360px"
              style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }}
            />

            {/* Permanent bottom gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)', pointerEvents: 'none' }} />

            {/* Hover tint */}
            <div className="cat-ov" style={{ position: 'absolute', inset: 0, background: 'rgba(196,164,74,0.12)', borderTop: '3px solid #C4A44A', opacity: 0, transition: 'opacity 280ms', pointerEvents: 'none' }} />

            {/* Text */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '6px' }}>
                {cat.items.length} {lang === 'pl' ? 'zdjęć' : lang === 'en' ? 'photos' : 'Fotos'}
              </p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 600, color: '#F9F7F4', lineHeight: 1.1 }}>
                {getCatName(cat)}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* ── POPUP ── */}
      {popup && !lbItem && (
        <div
          onClick={closePopup}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(5,5,5,0.92)',
            backdropFilter: 'blur(6px)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Popup header */}
            <div style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(196,164,74,0.15)', background: 'rgba(10,10,10,0.8)', position: 'sticky', top: 0, zIndex: 10 }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '4px' }}>
                  {popup.cat.items.length} {lang === 'pl' ? 'zdjęć' : lang === 'en' ? 'photos' : 'Fotos'}
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: '#F9F7F4', lineHeight: 1 }}>
                  {getCatName(popup.cat)}
                </h2>
              </div>
              <button
                onClick={closePopup}
                style={{ background: 'transparent', border: '1px solid rgba(196,164,74,0.3)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#C4A44A', flexShrink: 0 }}
                aria-label="Schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Photo grid */}
            <div className="pm-popup-grid" style={{ padding: '4px' }}>
              {popup.cat.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openLightbox(item.id)}
                  style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', cursor: 'pointer', background: '#1A1A1A', border: 'none', padding: 0, display: 'block', width: '100%' }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    const ov  = e.currentTarget.querySelector('.ov') as HTMLElement;
                    if (img) img.style.transform = 'scale(1.07)';
                    if (ov)  ov.style.opacity    = '1';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    const ov  = e.currentTarget.querySelector('.ov') as HTMLElement;
                    if (img) img.style.transform = 'scale(1)';
                    if (ov)  ov.style.opacity    = '0';
                  }}
                  aria-label={getLabel(item)}
                >
                  <Image src={item.src} alt={getLabel(item)} fill sizes="(max-width:640px) 50vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(249,247,244,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{getLabel(item)}</span>
                  </div>
                  <div className="ov" style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.4)', borderBottom: '3px solid #C4A44A', opacity: 0, transition: 'opacity 250ms' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {popup && lbItem && (
        <div
          onClick={closeLightbox}
          style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(5,5,5,0.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          {/* Top bar */}
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 301, background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), transparent)' }}>
            <div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: '#C4A44A' }}>{getCatName(popup.cat)}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#555550', marginLeft: '14px', letterSpacing: '0.1em' }}>{lbIdx + 1} / {lbItems.length}</span>
            </div>
            <button onClick={closeLightbox} style={{ background: 'transparent', border: '1px solid rgba(196,164,74,0.3)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#C4A44A' }}>
              <X size={16} />
            </button>
          </div>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '1000px', maxHeight: '76dvh', aspectRatio: '4/3' }}>
            <Image src={lbItem.src} alt={getLabel(lbItem)} fill sizes="1000px" style={{ objectFit: 'contain' }} priority />
          </div>

          {/* Thumbnail strip */}
          <div className="pm-hide-sb" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '3px', zIndex: 301, maxWidth: '90vw', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {lbItems.map((item, i) => (
              <button key={item.id} onClick={e => { e.stopPropagation(); openLightbox(item.id); }} style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0, border: `2px solid ${i === lbIdx ? '#C4A44A' : 'transparent'}`, padding: 0, cursor: 'pointer', background: '#1A1A1A', opacity: i === lbIdx ? 1 : 0.4, transition: 'opacity 200ms, border-color 200ms' }}>
                <Image src={item.src} alt="" fill sizes="52px" style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Nav */}
          {lbIdx > 0 && (
            <button onClick={e => { e.stopPropagation(); goPrev(); }} style={navBtn('left')}><ChevronLeft size={22} /></button>
          )}
          {lbIdx < lbItems.length - 1 && (
            <button onClick={e => { e.stopPropagation(); goNext(); }} style={navBtn('right')}><ChevronRight size={22} /></button>
          )}
        </div>
      )}

      <style>{`
        .pm-hide-sb::-webkit-scrollbar { display: none; }
        .pm-popup-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
        }
        @media (max-width: 900px)  { .pm-popup-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 540px)  { .pm-popup-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) {
          #galerie { padding: 80px 0 !important; }
          .pm-gallery-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </section>
  );
}

const navBtn = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'fixed', top: '50%', [side]: '20px', transform: 'translateY(-50%)',
  background: 'transparent', border: '1px solid rgba(196,164,74,0.25)', color: '#C4A44A',
  width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', zIndex: 302,
});

const arrowBtn: React.CSSProperties = {
  background: 'transparent', border: '1px solid rgba(196,164,74,0.25)',
  width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#888880',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '11px',
  letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '14px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
  fontWeight: 600, color: '#F9F7F4', lineHeight: 1.1,
};
