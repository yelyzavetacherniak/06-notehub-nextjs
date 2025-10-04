'use client';

import type { ErrorProps } from '../../types/note';

export default function Error({ error }: ErrorProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
