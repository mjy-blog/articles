'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../InteractiveCanvasOptionDescriptor';

export function IntegerOptionComponent({
  value,
  setValue,
}: InteractiveCanvasOptionItemDescriptorComponentProps<number>) {
  const [state, setState] = useState(value);

  useEffect(() => setState(value), [value]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (Number.isNaN(newValue)) {
      setState(0);
    } else {
      setState(newValue);
    }
  }, []);
  const handleClick = useCallback(() => setValue(state), [setValue, state]);

  return (
    <div>
      <input value={state.toString()} onChange={handleChange} />
      <button type="button" onClick={handleClick}>
        확인
      </button>
    </div>
  );
}

export function integerOption(
  displayName: string,
  defaultValue: number,
): InteractiveCanvasOptionItemDescriptor<number> {
  return {
    defaultValue,
    displayName,
    component: IntegerOptionComponent,
  };
}
