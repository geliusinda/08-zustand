import type { Metadata } from 'next';

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const metadataBase = new URL(
  process.env.SITE_URL ??
    (productionHost ? `https://${productionHost}` : 'http://localhost:3000'),
);

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'NoteHub',
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: 'NoteHub',
        },
      ],
    },
  };
}
