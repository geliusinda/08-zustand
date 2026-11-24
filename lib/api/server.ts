import axios, { isAxiosError } from 'axios';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { createNotesApi } from '../api';

export const noteHub = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  timeout: 15000,
  headers: { Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}` },
});

export const { fetchNotes, fetchNoteById } = createNotesApi(noteHub);

export const getNote = cache(async (id: string) => {
  if (!/^[\w-]+$/.test(id)) notFound();
  try {
    return await fetchNoteById(id);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) notFound();
    throw new Error('Could not fetch note details.');
  }
});
