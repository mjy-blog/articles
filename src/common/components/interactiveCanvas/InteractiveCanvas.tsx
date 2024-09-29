'use client';

import { useEffect, useState } from 'react';
import { InteractiveCanvasOptionDescriptor } from './InteractiveCanvasOptionDescriptor';

export interface InteractiveCanvasProps<T> {
  options: InteractiveCanvasOptionDescriptor<T>;
  render: (state: T) => ImageData;
  renderAutomatically?: boolean;
}

function getDefault<T>(options: InteractiveCanvasOptionDescriptor<T>): T {
  return Object.fromEntries(
    Object.entries(options).map(([k, v]: any) => [k, v.default]),
  );
}

export function InteractiveCanvas<T>({
  render,
  options,
  renderAutomatically,
}: InteractiveCanvasProps<T>) {
  const [state, setState] = useState(() => getDefault(options));
  const [renderResult, setRenderResult] = useState(() => render(state));
  const [element, ref] = useState<HTMLCanvasElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (element) {
      const context = element.getContext('2d');
      if (context) {
        context.putImageData(renderResult, 0, 0);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [element, renderResult]);

  return (
    <div>
      <canvas
        ref={ref}
        width={renderResult.width}
        height={renderResult.height}
      />
      {error && <div style={{ color: 'red' }}>Error</div>}
      // TODO: add option controller
    </div>
  );
}
