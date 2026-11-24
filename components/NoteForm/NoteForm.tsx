'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { noteTags } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const client = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const [validationError, setValidationError] = useState('');
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await client.invalidateQueries({ queryKey: ['notes'] });
      router.replace(returnTo);
    },
  });

  async function formAction(formData: FormData) {
    if (mutation.isPending) return;

    const title = String(formData.get('title') ?? '').trim();
    const content = String(formData.get('content') ?? '');
    const tag = noteTags.find((tag) => tag === formData.get('tag'));
    if (title.length < 3 || title.length > 50 || content.length > 500 || !tag) {
      setValidationError(
        'Enter a title of 3–50 characters, content of up to 500 characters, and a valid tag.',
      );
      return;
    }

    setValidationError('');
    await mutation.mutateAsync({ title, content, tag }).catch(() => {});
  }

  return (
    <form className={css.form} action={formAction}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          className={css.input}
          id="title"
          name="title"
          value={draft.title}
          onChange={(event) => setDraft({ title: event.target.value })}
          required
          minLength={3}
          maxLength={50}
          readOnly={mutation.isPending}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          className={css.textarea}
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={(event) => setDraft({ content: event.target.value })}
          maxLength={500}
          readOnly={mutation.isPending}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          className={css.select}
          id="tag"
          name="tag"
          value={draft.tag}
          disabled={mutation.isPending}
          onChange={(event) => {
            const value = event.target.value;
            const tag = noteTags.find((tag) => tag === value);
            if (tag) setDraft({ tag });
          }}
        >
          {noteTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      {validationError && (
        <p className={css.error} role="alert">
          {validationError}
        </p>
      )}
      {!validationError && mutation.isError && (
        <p className={css.error} role="alert">
          Could not create the note. Please try again.
        </p>
      )}
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          disabled={mutation.isPending}
          onClick={() => router.replace(returnTo)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating…' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
