import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '../../lib/api';

export default async function NotesPage() {
  const page = 1;
  const perPage = 12;
  const search = '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page, perPage, search }],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
