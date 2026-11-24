import { pageMetadata } from '@/lib/metadata';
import { getNote } from '@/lib/api/server';
import NoteData from '../NoteData';
import NoteDetailsClient from './NoteDetails.client';
import css from './NoteDetails.module.css';

type NoteDetailsProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: NoteDetailsProps) {
  const { id } = await params;
  const note = await getNote(id);
  const content = note.content.trim().replace(/\s+/g, ' ');
  const description =
    content.length > 157 ? `${content.slice(0, 157)}…` : content;
  return pageMetadata(
    `${note.title} | NoteHub`,
    description || `View ${note.title}, a note tagged ${note.tag}.`,
    `/notes/${encodeURIComponent(id)}`,
  );
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  return (
    <main className={css.container}>
      <NoteData id={id}>
        <NoteDetailsClient id={id} />
      </NoteData>
    </main>
  );
}
