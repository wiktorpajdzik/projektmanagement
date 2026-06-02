import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const SITE_URL = 'https://www.projektmanagement.de';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/favicon.png' },

  title: {
    default: 'ProjektManagement – Innenausbau & Renovierung Berlin',
    template: '%s | ProjektManagement',
  },

  description:
    'ProjektManagement – Ihr Experte für Innenausbau, Malerarbeiten, Trockenbau, Estrich, Fliesenlegen & Putzarbeiten in Berlin und Umgebung. Kostenlose Beratung ✓ Faire Preise ✓ Schnelle Umsetzung.',

  keywords: [
    'Bauunternehmen Berlin',
    'Innenausbau Berlin',
    'Malerarbeiten Berlin',
    'Trockenbau Berlin',
    'Fliesenleger Berlin',
    'Estrich Berlin',
    'Putzarbeiten Berlin',
    'Renovierung Berlin',
    'Sanierung Berlin',
    'Rigips Berlin',
    'Trockenbau Firma Berlin',
    'Innenausbau Firma Berlin',
    'Handwerker Berlin',
    'Bauarbeiten Berlin',
    'Wohnungsrenovierung Berlin',
  ].join(', '),

  authors: [{ name: 'ProjektManagement' }],
  creator: 'ProjektManagement',
  publisher: 'ProjektManagement',

  alternates: {
    canonical: SITE_URL,
    languages: {
      'de-DE': SITE_URL,
      'en-US': `${SITE_URL}?lang=en`,
      'pl-PL': `${SITE_URL}?lang=pl`,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US', 'pl_PL'],
    url: SITE_URL,
    siteName: 'ProjektManagement',
    title: 'ProjektManagement – Innenausbau & Renovierung Berlin',
    description:
      'Ihr zuverlässiger Partner für Innenausbau, Malerarbeiten, Trockenbau, Fliesenlegen & Estrich in Berlin. Über 10 Jahre Erfahrung, 500+ Projekte.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ProjektManagement – Innenausbau Berlin',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ProjektManagement – Innenausbau Berlin',
    description:
      'Malerarbeiten, Trockenbau, Fliesenlegen & Estrich in Berlin. 10+ Jahre Erfahrung.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // google: 'DEIN_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'ProjektManagement',
  description:
    'Professionelle Handwerksleistungen: Innenausbau, Malerarbeiten, Trockenbau, Estrich, Fliesenlegen und Putzarbeiten in Berlin.',
  url: SITE_URL,
  telephone: '+493012345678',
  email: 'info@projektmanagement.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 1',
    addressLocality: 'Berlin',
    postalCode: '10115',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.5200,
    longitude: 13.4050,
  },
  areaServed: [
    { '@type': 'City', name: 'Berlin' },
    { '@type': 'State', name: 'Brandenburg' },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 52.5200,
      longitude: 13.4050,
    },
    geoRadius: '80000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Baudienstleistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Malerarbeiten' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Putzarbeiten' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Trockenbau' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estricharbeiten' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fliesenlegen' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Komplettausbau' } },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Überweisung, Bar',
  sameAs: [],
};
