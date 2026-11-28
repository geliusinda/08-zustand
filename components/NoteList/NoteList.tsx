'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';
interface NoteListProps {
  notes: Note[];
  onEmptyPage: () => void;
}

export default function NoteList({ notes, onEmptyPage }: NoteListProps) {
  const client = useQueryClient();
  const deletion = useMutation({
    mutationFn: deleteNote,
    onSuccess: async (_note, id) => {
      if (notes.length === 1 && notes[0].id === id) onEmptyPage();
      await client.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  return (
    <>
      {deletion.isError && (
        <p role="alert">Could not delete the note. Please try again.</p>
      )}
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                disabled={deletion.isPending}
                onClick={() => deletion.mutate(note.id)}
              >
                {deletion.isPending && deletion.variables === note.id
                  ? 'Deleting…'
                  : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
