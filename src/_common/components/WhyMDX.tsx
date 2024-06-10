'use client';

import { useCallback, useState } from 'react';

export function WhyMDX() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(
    () => setCount((count) => count + 1),
    [setCount],
  );
  return (
    <button onClick={handleClick}>Click to increase number: {count}</button>
  );
}
