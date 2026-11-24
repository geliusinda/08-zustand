import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNote } from '@/lib/api/server';
import type { ReactNode } from 'react';
export default async function NoteData({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const client = new QueryClient();
  await client.fetchQuery({
    queryKey: ['note', id],
    queryFn: () => getNote(id),
  });
  return (
    <HydrationBoundary state={dehydrate(client)}>{children}</HydrationBoundary>
  );
}
