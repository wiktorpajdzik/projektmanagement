'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

interface Testimonial {
  name: string;
  role: { de: string; en: string; pl: string };
  text: { de: string; en: string; pl: string };
  initials: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Thomas Bergmann',
    initials: 'TB',
    rating: 5,
    role: { de: 'Hausbesitzer, Berlin-Mitte', en: 'Homeowner, Berlin-Mitte', pl: 'Właściciel domu, Berlin-Mitte' },
    text: {
      de: 'Absolut professionelle Arbeit. Die Trockenbauarbeiten wurden pünktlich und sauber ausgeführt – weit über meinen Erwartungen. Ich kann ProjektManagement nur wärmstens empfehlen.',
      en: 'Absolutely professional work. The drywall was completed on time and to an immaculate standard – far exceeding my expectations. Highly recommended.',
      pl: 'Absolutnie profesjonalna robota. Prace z karton-gipsu wykonane terminowo i czysto – znacznie powyżej moich oczekiwań. Serdecznie polecam.',
    },
  },
  {
    name: 'Katarzyna Wiśniewska',
    initials: 'KW',
    rating: 5,
    role: { de: 'Eigentumswohnung, Prenzlauer Berg', en: 'Apartment Owner, Prenzlauer Berg', pl: 'Właścicielka mieszkania, Prenzlauer Berg' },
    text: {
      de: 'Komplette Badsanierung in höchster Qualität. Fliesen, Putz und Malerarbeiten – alles aus einer Hand, perfekt abgestimmt. Wir sind sehr zufrieden.',
      en: 'Complete bathroom renovation to the highest standard. Tiles, plaster, painting – all from one team, perfectly coordinated. We are very satisfied.',
      pl: 'Kompleksowy remont łazienki najwyższej jakości. Płytki, tynk, malowanie – wszystko z jednych rąk, idealnie. Jesteśmy bardzo zadowoleni.',
    },
  },
  {
    name: 'Markus Schreiber',
    initials: 'MS',
    rating: 5,
    role: { de: 'Gewerbeobjekt, Charlottenburg', en: 'Commercial Property, Charlottenburg', pl: 'Obiekt komercyjny, Charlottenburg' },
    text: {
      de: 'Großes Büroprojekt, alles reibungslos. Das Team kommuniziert hervorragend, hält Termine ein und liefert Qualitätsarbeit. Werden wir definitiv wieder beauftragen.',
      en: 'Large office project, everything seamless. The team communicates excellently, meets deadlines and delivers quality work. We will definitely hire them again.',
      pl: 'Duży projekt biurowy, wszystko bezproblemowo. Ekipa komunikuje się znakomicie, dotrzymuje terminów. Na pewno skorzystamy ponownie.',
    },
  },
  {
    name: 'Agnieszka Kowalska',
    initials: 'AK',
    rating: 5,
    role: { de: 'Neubauwohnung, Pankow', en: 'New Apartment, Pankow', pl: 'Nowe mieszkanie, Pankow' },
    text: {
      de: 'Estrich, Fliesen und komplett neue Wände – alles in weniger als 3 Wochen. Das Team war jeden Tag pünktlich und hat sauber gearbeitet. Klare Empfehlung!',
      en: 'Floor screed, tiling and completely new walls – all done in under 3 weeks. The team was punctual every day and kept the site clean. Highly recommended!',
      pl: 'Wylewka, płytki i całkowicie nowe ściany – wszystko w mniej niż 3 tygodnie. Ekipa punktualna każdego dnia i czysta robota. Gorąco polecam!',
    },
  },
  {
    name: 'Stefan Nowak',
    initials: 'SN',
    rating: 5,
    role: { de: 'Altbausanierung, Friedrichshain', en: 'Renovation, Friedrichshain', pl: 'Remont kamienicy, Friedrichshain' },
    text: {
      de: 'Altbausanierung ist immer eine Herausforderung, aber ProjektManagement hat das mit Bravour gemeistert. Putzarbeiten an alten Wänden, Trockenbau im Dachgeschoss – top.',
      en: 'Old building renovation is always a challenge, but ProjektManagement handled it brilliantly. Plastering on old walls, drywall in the attic – excellent.',
      pl: 'Remont starej kamienicy to zawsze wyzwanie, ale ProjektManagement poradził sobie znakomicie. Tynkowanie starych ścian, karton-gips na poddaszu – top.',
    },
  },
  {
    name: 'Julia Hartmann',
    initials: 'JH',
    rating: 5,
    role: { de: 'Privatkunde, Spandau', en: 'Private Client, Spandau', pl: 'Klient prywatny, Spandau' },
    text: {
      de: 'Das Badezimmer ist ein Traum geworden. Großformatige Fliesen, perfekte Fugen, nichts schief. Sehr freundliches Team, das auch auf Sonderwünsche eingeht.',
      en: 'The bathroom turned out to be a dream. Large-format tiles, perfect grouting, nothing off. Very friendly team that also accommodates special requests.',
      pl: 'Łazienka wyszła jak marzenie. Wielkoformatowe płytki, idealne fugi, nic krzywo. Bardzo miła ekipa, która wychodzi naprzeciw specjalnym życzeniom.',
    },
  },
  {
    name: 'Piotr Adamski',
    initials: 'PA',
    rating: 5,
    role: { de: 'Hausverwaltung, Steglitz', en: 'Property Manager, Steglitz', pl: 'Zarządca nieruchomości, Steglitz' },
    text: {
      de: 'Wir verwalten mehrere Objekte und arbeiten seit zwei Jahren regelmäßig mit ProjektManagement zusammen. Zuverlässig, fair kalkuliert, immer termingerecht.',
      en: 'We manage several properties and have been working with ProjektManagement regularly for two years. Reliable, fairly priced, always on schedule.',
      pl: 'Zarządzamy kilkoma obiektami i od dwóch lat regularnie współpracujemy z ProjektManagement. Solidnie, uczciwe wyceny, zawsze na czas.',
    },
  },
  {
    name: 'Monika Bauer',
    initials: 'MB',
    rating: 5,
    role: { de: 'Einfamilienhaus, Zehlendorf', en: 'Family Home, Zehlendorf', pl: 'Dom jednorodzinny, Zehlendorf' },
    text: {
      de: 'Komplettausbau unseres Neubaus – von der Estrichschicht bis zur letzten Fliese. Das Ergebnis übertrifft alle Erwartungen. Profis durch und durch.',
      en: 'Complete fit-out of our new build – from the screed layer to the last tile. The result exceeds all expectations. Professionals through and through.',
      pl: 'Kompleksowe wykończenie naszego nowego domu – od wylewki po ostatnią płytkę. Wynik przekracza wszelkie oczekiwania. Profesjonaliści z krwi i kości.',
    },
  },
];

const LABELS = {
  de: { heading: 'Was unsere Kunden sagen', sub: 'Über 500 abgeschlossene Projekte – die Qualität spricht für sich.' },
  en: { heading: 'What our clients say', sub: 'Over 500 completed projects – the quality speaks for itself.' },
  pl: { heading: 'Co mówią nasi klienci', sub: 'Ponad 500 ukończonych projektów – jakość mówi sama za siebie.' },
};

export default function Testimonials() {
  const { lang } = useLang();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const label = LABELS[lang];

  const getText = (tx: Testimonial['text']) => tx[lang];
  const getRole = (r: Testimonial['role']) => r[lang];

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / TESTIMONIALS.length;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.min(idx, TESTIMONIALS.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 420 : -420, behavior: 'smooth' });
  };

  return (
    <section id="meinungen" style={{ background: '#F5F2EC', padding: '72px 0', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative circles */}
      <div aria-hidden="true" style={{ position: 'absolute', right: '-180px', top: '50%', transform: 'translateY(-50%)', width: '560px', height: '560px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.12)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)', width: '360px', height: '360px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.08)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-200px', bottom: '-100px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(196,164,74,0.07)', pointerEvents: 'none' }} />

      {/* Header + arrows */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 52px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p style={labelStyle}>Testimonials</p>
          <h2 style={headingStyle}>{label.heading}</h2>
          <div style={{ width: '60px', height: '2px', background: '#C4A44A', marginTop: '16px' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300, color: '#888880', marginRight: '16px' }}>
            {label.sub}
          </p>
          <button onClick={() => scroll('left')} aria-label="Zurück" style={arrowBtn}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll('right')} aria-label="Weiter" style={arrowBtn}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '16px',
          padding: '0 24px 8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="pm-slider-hide-scrollbar"
      >
        {TESTIMONIALS.map((item, i) => (
          <div
            key={i}
            className="pm-t-card"
            style={{
              flexShrink: 0,
              width: '380px',
              scrollSnapAlign: 'start',
              background: '#FDFCF9',
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderBottom: '2px solid transparent',
              transition: 'border-color 250ms, transform 250ms, box-shadow 250ms',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderBottomColor = '#C4A44A';
              el.style.transform = 'translateY(-4px)';
              el.style.boxShadow = '0 16px 48px rgba(10,10,10,0.1)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderBottomColor = 'transparent';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Quote */}
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', fontWeight: 700, color: 'rgba(196,164,74,0.15)', lineHeight: 1, marginBottom: '-4px', userSelect: 'none' }}>
              "
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
              {Array.from({ length: item.rating }).map((_, si) => (
                <svg key={si} width="13" height="13" viewBox="0 0 24 24" fill="#C4A44A">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>

            {/* Text */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: '#555550', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
              {getText(item.text)}
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(196,164,74,0.15)' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, border: '1px solid rgba(196,164,74,0.3)',
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: '#C4A44A' }}>
                  {item.initials}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: '#0A0A0A' }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#888880', letterSpacing: '0.06em', marginTop: '2px' }}>
                  {getRole(item.role)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '36px' }}>
        {TESTIMONIALS.map((_, i) => (
          <div key={i} style={{ width: i === activeIdx ? '24px' : '6px', height: '6px', borderRadius: '3px', background: i === activeIdx ? '#C4A44A' : 'rgba(196,164,74,0.25)', transition: 'all 300ms' }} />
        ))}
      </div>


      <style>{`
        .pm-slider-hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          #meinungen { padding: 48px 0 !important; }
          .pm-t-card { width: 88vw !important; padding: 32px 24px !important; }

        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '11px',
  letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4A44A', marginBottom: '14px',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
  fontWeight: 600, color: '#0A0A0A', lineHeight: 1.1,
};

const arrowBtn: React.CSSProperties = {
  background: 'transparent', border: '1px solid rgba(196,164,74,0.3)',
  width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#888880', flexShrink: 0, transition: 'border-color 200ms, color 200ms',
};
