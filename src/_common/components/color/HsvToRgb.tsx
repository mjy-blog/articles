import { useMemo, useState } from 'react';

import { hsvToRgb } from '../../util/color/hsvToRgb';
import { HsvColor, HsvColorPicker } from './HsvColorPicker';

export function HsvToRgb() {
  const [color, setColor] = useState<HsvColor>([0, 0, 0]);
  const previewColor = useMemo(() => {
    const [r, g, b] = hsvToRgb(...color);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  return (
    <div>
      <HsvColorPicker color={color} onColorChange={setColor} />
      변환 결과:
      <div style={{ background: previewColor, height: 100 }} />
    </div>
  );
}
