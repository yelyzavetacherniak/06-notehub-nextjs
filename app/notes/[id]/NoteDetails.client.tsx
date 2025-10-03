'use client';

import css from './NoteDetails.module.css';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api';

import { Note } from '../../../types/note';
import { useParams } from 'next/navigation';

interface Props {
  noteId: string;
}

export default function NoteDetails({ noteId }: Props) {
  const params = useParams<{ noteId: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note | null>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
