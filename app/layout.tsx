import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { metadataBase, pageMetadata } from '@/lib/metadata';
import type { ReactNode } from 'react';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase,
  ...pageMetadata('NoteHub', 'Keep your thoughts organized with NoteHub.', '/'),
};
export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
