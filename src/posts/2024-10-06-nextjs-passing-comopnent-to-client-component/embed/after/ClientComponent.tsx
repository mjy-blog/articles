'use client';

import { ReactElement } from 'react';

export interface ClientComponentProps {
  MDXContent: ReactElement;
}

export function ClientComponent({ MDXContent }: ClientComponentProps) {
  // ...
  return (
    <div>
      {/* ... */}
      {MDXContent}
    </div>
  );
}
