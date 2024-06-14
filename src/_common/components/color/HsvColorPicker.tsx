'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { hsvToRgb } from '../../util/color/hsvToRgb';

export type HsvColor = [h: number, s: number, v: number];

export interface HsvColorPickerProps {
  color: HsvColor;
  onColorChange?: (color: HsvColor) => void;
}

export function HsvColorPicker({ color, onColorChange }: HsvColorPickerProps) {
  const [state, setState] = useState(color);
  const handleHChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) =>
      setState(([_, s, v]) => [parseInt(ev.target.value) / 1000, s, v]),
    [],
  );
  const handleSChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) =>
      setState(([h, _, v]) => [h, parseInt(ev.target.value) / 1000, v]),
    [],
  );
  const handleVChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) =>
      setState(([h, s, _]) => [h, s, parseInt(ev.target.value) / 1000]),
    [],
  );
  const handleSubmitClick = useCallback(() => {
    onColorChange?.(state);
  }, [state, onColorChange]);
  const handleResetClick = useCallback(() => setState(color), [color]);
  const previewColor = useMemo(() => {
    const [r, g, b] = hsvToRgb(...state);
    return `rgb(${r}, ${g}, ${b})`;
  }, [state]);
  useEffect(() => setState(color), [color]);

  return (
    <div>
      <div>
        H:{' '}
        <input
          type="range"
          min="0"
          max="1000"
          value={state[0] * 1000}
          onChange={handleHChange}
        />
      </div>
      <div>
        S:{' '}
        <input
          type="range"
          min="0"
          max="1000"
          value={state[1] * 1000}
          onChange={handleSChange}
        />
      </div>
      <div>
        V:{' '}
        <input
          type="range"
          min="0"
          max="1000"
          value={state[2] * 1000}
          onChange={handleVChange}
        />
      </div>
      <button type="button" onClick={handleSubmitClick}>
        확인
      </button>
      <button
        type="button"
        disabled={state === color}
        onClick={handleResetClick}
      >
        취소
      </button>
      <div style={{ background: previewColor, height: 100 }} />
    </div>
  );
}
