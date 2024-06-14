'use client';

import { useMemo, useState } from 'react';

import { hsvToRgb } from '../../util/color/hsvToRgb';
import { HsvColor, HsvColorPicker } from './HsvColorPicker';

export function HsvToRgb() {
  const [color, setColor] = useState<HsvColor>([0, 0, 0]);
  const [previewColor, [r, g, b]] = useMemo((): [
    previewColor: string,
    rgb: [r: number, g: number, b: number],
  ] => {
    const rgb = hsvToRgb(...color);
    const [r, g, b] = rgb;
    return [`rgb(${r}, ${g}, ${b})`, rgb];
  }, [color]);

  return (
    <div>
      <HsvColorPicker color={color} onColorChange={setColor} />
      변환 결과: rgb({r}, {g}, {b})
      <div style={{ background: previewColor, height: 100 }} />
    </div>
  );
}
