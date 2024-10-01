'use client';

import { useCallback, useEffect, useState } from 'react';
import { FloatInput } from '../../input/floatInput';
import {
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../InteractiveCanvasOptionDescriptor';

export function FloatOptionComponent({
  value,
  setValue,
}: InteractiveCanvasOptionItemDescriptorComponentProps<number>) {
  const [state, setState] = useState(value);

  useEffect(() => setState(value), [value]);
  const handleSubmit = useCallback(() => setValue(state), [setValue, state]);
  const handleCancel = useCallback(() => setState(value), [setState, value]);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <FloatInput
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
