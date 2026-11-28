'use client';

import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import type { NoteTag } from '@/types/note';
import css from './NotesPage.module.css';

export default function NotesClient({ tag }: { tag?: NoteTag }) {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value.trim());
    setPage(1);
  }, 300);
  const query = useQuery({
    queryKey: ['notes', page, search, tag ?? null],
    queryFn: ({ signal }) => fetchNotes({ page, search, tag, signal }),
    throwOnError: true,
  });
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    updateSearch(event.target.value);
  };
  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={input} onChange={handleSearch} />
        {query.data && query.data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={query.data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link
          className={css.button}
          href={{
            pathname: '/notes/action/create',
            query: tag ? { from: tag } : undefined,
          }}
        >
          Create note +
        </Link>
      </header>
      {query.isPending && <p role="status">Loading, please wait...</p>}
      {query.isSuccess && query.data.notes.length === 0 && (
        <p role="status">
          {search
            ? 'No notes match your search.'
            : tag
              ? 'No notes with this tag.'
              : 'No notes yet. Create your first note!'}
        </p>
      )}
      {!!query.data?.notes.length && (
        <NoteList
          notes={query.data.notes}
          onEmptyPage={() =>
            setPage((current) =>
              current === page ? Math.max(1, page - 1) : current,
            )
          }
        />
      )}
    </main>
  );
}
