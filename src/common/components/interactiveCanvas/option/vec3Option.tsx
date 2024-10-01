'use client';

import { useCallback, useEffect, useState } from 'react';
import { FloatInput } from '../../input/floatInput';
import {
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from '../InteractiveCanvasOptionDescriptor';

export function Vec3OptionComponent({
  value,
  setValue,
}: InteractiveCanvasOptionItemDescriptorComponentProps<
  [x: number, y: number, z: number]
>) {
  const [[x, y, z], setState] = useState(value);

  useEffect(() => setState(value), [value]);
  const setX = useCallback(
    (x: number) => setState(([_, y, z]) => [x, y, z]),
    [],
  );
  const setY = useCallback(
    (y: number) => setState(([x, _, z]) => [x, y, z]),
    [],
  );
  const setZ = useCallback((z: number) => setState(([x, y]) => [x, y, z]), []);
  const handleSubmit = useCallback(
    () => setValue([x, y, z]),
    [setValue, x, y, z],
  );
  const handleCancel = useCallback(() => setState(value), [setState, value]);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <FloatInput
        value={x}
        setValue={setX}
        style={{
          flex: 1,
          minWidth: 0,
          background: value[0] === x ? undefined : '#FFFF0088',
        }}
        placeholder="x"
      />
      <FloatInput
        value={y}
        setValue={setY}
        style={{
          flex: 1,
          minWidth: 0,
          background: value[1] === y ? undefined : '#FFFF0088',
        }}
        placeholder="y"
      />
      <FloatInput
        value={z}
        setValue={setZ}
        style={{
          flex: 1,
          minWidth: 0,
          background: value[2] === z ? undefined : '#FFFF0088',
        }}
        placeholder="z"
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

export function vec3Option(
  displayName: string,
  defaultValue: [x: number, y: number, z: number],
): InteractiveCanvasOptionItemDescriptor<[x: number, y: number, z: number]> {
  return {
    defaultValue,
    displayName,
    component: Vec3OptionComponent,
  };
}
