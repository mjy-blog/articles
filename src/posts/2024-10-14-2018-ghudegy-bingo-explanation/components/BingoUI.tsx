'use client';

import { useState } from 'react';
import { BingoGrid, BingoProps, BingoState } from './BingoGrid';

export interface BingoUIProps {
  props: BingoProps;
}

export function BingoUI({ props }: BingoUIProps) {
  const [state, setState] = useState(
    () => props.map((p) => p === 'true' || p === 'true-assumed') as BingoState,
  );

  const reset = () =>
    setState(
      props.map((p) => p === 'true' || p === 'true-assumed') as BingoState,
    );

  return (
    <div>
      <BingoGrid props={props} state={state} setState={setState} />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
