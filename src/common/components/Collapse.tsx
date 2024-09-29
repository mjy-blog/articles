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
    <div>
      <button type="button" onClick={handleClick}>
        {title} - {opened ? '접기' : '열기'}
      </button>
      {opened && <div>{children}</div>}
    </div>
  );
}
