import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

interface CreateNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(API_URL, {
    params: {
      page,
      perPage,
      search,
    },
    headers: { Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}` },
  });
  return response.data;
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axios.post<Note>(API_URL, data, {
    headers: { Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}` },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}` },
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  try {
    const { data } = await axios.get<Note>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    });
    return data;
  } catch {
    return null;
  }
}
