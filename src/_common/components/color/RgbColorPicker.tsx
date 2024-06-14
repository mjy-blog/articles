'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

export interface RgbColorPickerProps {
  color: string;
  onColorChange?: (color: string) => void;
}

export function RgbColorPicker({ color, onColorChange }: RgbColorPickerProps) {
  const [state, setState] = useState(color);
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => setState(ev.target.value),
    [],
  );
  const handleSubmitClick = useCallback(() => {
    if (RegExp(/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).exec(state)) {
      onColorChange?.(
        state.length === 6
          ? state
          : `${state[0]}${state[0]}${state[1]}${state[1]}${state[2]}${state[2]}`,
      );
    }
  }, [state, onColorChange]);
  const handleResetClick = useCallback(() => setState(color), [color]);
  const [error, previewColor] = useMemo((): [
    error: string | null,
    previewColor: string,
  ] => {
    if (RegExp(/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).exec(state)) {
      return [null, `#${state}`];
    } else {
      return ['16진수 3글자를 입력하세요.', 'transparent'];
    }
  }, [state]);
  useEffect(() => setState(color), [color]);

  return (
    <div>
      {'색상 코드를 입력하세요: #'}
      <input
        type="text"
        maxLength={6}
        accept="[0-9a-fA-F]"
        value={state}
        onChange={handleChange}
      />
      <button
        type="button"
        disabled={error !== null}
        onClick={handleSubmitClick}
      >
        확인
      </button>
      <button
        type="button"
        disabled={state === color}
        onClick={handleResetClick}
      >
        취소
      </button>
      <div style={{ background: previewColor, height: 100 }}>{error}</div>
    </div>
  );
}
