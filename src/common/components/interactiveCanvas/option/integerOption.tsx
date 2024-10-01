'use client';

import { useCallback, useEffect, useState } from 'react';
import { integerInput } from '../../input/integerInput';
import {
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../InteractiveCanvasOptionDescriptor';

export function integerOptionComponent(max?: number, min?: number) {
  const IntegerInput = integerInput(max, min);
  return function IntegerOptionComponent({
    value,
    setValue,
  }: InteractiveCanvasOptionItemDescriptorComponentProps<number>) {
    const [state, setState] = useState(value);

    useEffect(() => setState(value), [value]);
    const handleSubmit = useCallback(() => setValue(state), [setValue, state]);
    const handleCancel = useCallback(() => setState(value), [setState, value]);

    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <IntegerInput
          value={state}
          setValue={setState}
          style={{
            flex: 1,
            background: value === state ? undefined : '#FFFF0088',
            gap: 4,
          }}
        />
        <button type="button" onClick={handleSubmit}>
          확인
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </div>
    );
  };
}

export function integerOption(
  displayName: string,
  defaultValue: number,
  max?: number,
  min?: number,
): InteractiveCanvasOptionItemDescriptor<number> {
  return {
    defaultValue,
    displayName,
    component: integerOptionComponent(max, min),
  };
}
