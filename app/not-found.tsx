import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  ...pageMetadata(
    'Page not found | NoteHub',
    'The requested page does not exist.',
    '/404',
  ),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
