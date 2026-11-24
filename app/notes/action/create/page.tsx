import NoteForm from '@/components/NoteForm/NoteForm';
import { pageMetadata } from '@/lib/metadata';
import { noteTags } from '@/types/note';
import css from './CreateNote.module.css';

export const metadata = pageMetadata(
  'Create note | NoteHub',
  'Write and save a new note in NoteHub.',
  '/notes/action/create',
);

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
