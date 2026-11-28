import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { pageMetadata } from '@/lib/metadata';
import { fetchNotes } from '@/lib/api/server';
import { notFound } from 'next/navigation';
import { noteTags } from '@/types/note';
import NotesClient from './Notes.client';
export const dynamic = 'force-dynamic';
type NotesPageProps = { params: Promise<{ slug: string[] }> };

async function getFilter(params: NotesPageProps['params']) {
  const [filter, ...rest] = (await params).slug;
  const tag = noteTags.find((tag) => tag === filter);
  if (rest.length || (filter !== 'all' && !tag)) notFound();
  return { filter, tag };
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { filter, tag } = await getFilter(params);
  return pageMetadata(
    tag ? `${tag} notes | NoteHub` : 'All notes | NoteHub',
    tag
      ? `Browse notes tagged ${tag} in NoteHub.`
      : 'Browse and search all your notes in NoteHub.',
    `/notes/filter/${filter}`,
  );
}

export default async function Notes({ params }: NotesPageProps) {
  const { filter, tag } = await getFilter(params);
  const client = new QueryClient();
  const queryKey = ['notes', 1, '', tag ?? null];
  await client.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes({ page: 1, tag }),
  });
  const error = client.getQueryState(queryKey)?.error;
  if (error) throw new Error('Could not fetch the list of notes.');
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient key={filter} tag={tag} />
    </HydrationBoundary>
  );
}
