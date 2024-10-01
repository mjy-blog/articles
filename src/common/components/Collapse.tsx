'use client';

import { PropsWithChildren, useCallback, useState } from 'react';

export interface CollapseProps extends PropsWithChildren {
  title: string;
  defaultOpened?: boolean;
}

export function Collapse({ title, defaultOpened, children }: CollapseProps) {
  const [opened, setOpened] = useState(!!defaultOpened);
  const handleClick = useCallback(() => setOpened((b) => !b), []);

  return (
    <div
      style={{
        border: '1px solid #888',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <button type="button" onClick={handleClick}>
        {opened ? '▼' : '▶'} {title} - {opened ? '접기' : '펼치기'}
      </button>
      {opened && <div>{children}</div>}
    </div>
  );
}
