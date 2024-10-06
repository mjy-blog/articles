'use client';

import { ComponentType } from 'react';

export interface ClientComponentProps {
  MDXContent: ComponentType;
}

export function ClientComponent({ MDXContent }: ClientComponentProps) {
  // ...
  return (
    <div>
      {/* ... */}
      <MDXContent />
    </div>
  );
}
