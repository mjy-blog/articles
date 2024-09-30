'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../InteractiveCanvasOptionDescriptor';

export function FloatOptionComponent({
  value,
  setValue,
}: InteractiveCanvasOptionItemDescriptorComponentProps<number>) {
  const [state, setState] = useState(value);
  const [hasTrailingDot, setHasTrailingDot] = useState(false);
  const [trailingZeroCount, setTrailingZeroCount] = useState(0);

  useEffect(() => {
    setState(value);
    setHasTrailingDot(false);
    setTrailingZeroCount(0);
  }, [value]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setState(0);
      setHasTrailingDot(false);
      setTrailingZeroCount(0);
      return;
    }
    const match1 = value.match(/^(?:[1-9][0-9]*|0)\.(0*)$/);
    if (match1) {
      const next = parseFloat(value);
      if (Number.isNaN(next)) return;
      setState(next);
      setHasTrailingDot(true);
      setTrailingZeroCount(match1[1].length);
      return;
    }
    const match2 = value.match(/^(?:[1-9][0-9]*|0)\.[0-9]*[1-9](0*)$/);
    if (match2) {
      const next = parseFloat(value);
      if (Number.isNaN(next)) return;
      setState(next);
      setHasTrailingDot(false);
      setTrailingZeroCount(match2[1].length);
      return;
    }
    const next = parseFloat(value);
    if (Number.isNaN(next)) return;
    setState(next);
    setHasTrailingDot(false);
    setTrailingZeroCount(0);
  }, []);
  const handleClick = useCallback(() => setValue(state), [setValue, state]);

  return (
    <div>
      <input
        value={`${state}${hasTrailingDot ? '.' : ''}${'0'.repeat(
          trailingZeroCount,
        )}`}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}

export function floatOption(
  displayName: string,
  defaultValue: number,
): InteractiveCanvasOptionItemDescriptor<number> {
  return {
    defaultValue,
    displayName,
    component: FloatOptionComponent,
  };
}
