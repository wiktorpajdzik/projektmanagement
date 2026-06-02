import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.projektmanagement.de/sitemap.xml',
    host: 'https://www.projektmanagement.de',
  };
}
