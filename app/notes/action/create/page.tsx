import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import { noteTags } from '@/types/note';
import css from './CreateNote.module.css';

const title = 'Create note | NoteHub';
const description = 'Write and save a new note in NoteHub.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/notes/action/create' },
  openGraph: {
    title,
    description,
    url: '/notes/action/create',
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

export default async function CreateNote({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { from } = await searchParams;
  const tag = noteTags.find((tag) => tag === from);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm returnTo={`/notes/filter/${tag ?? 'all'}`} />
      </div>
    </main>
  );
}
