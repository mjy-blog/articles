'use client';

import {
  ComponentType,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  InteractiveCanvasOptionDescriptor,
  InteractiveCanvasOptionItemDescriptor,
  InteractiveCanvasOptionItemDescriptorComponentProps,
} from './InteractiveCanvasOptionDescriptor';

export interface InteractiveCanvasProps<T> {
  options: InteractiveCanvasOptionDescriptor<T>;
  render: (state: T) => ImageData;
  renderAutomatically?: boolean;
}

function getDefault<T>(options: InteractiveCanvasOptionDescriptor<T>): T {
  return Object.fromEntries(
    Object.entries(options).map(([k, v]: any) => [
      k,
      (v as InteractiveCanvasOptionItemDescriptor<unknown>).defaultValue,
    ]),
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
  const [dirty, setDirty] = useState(false);

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
  useEffect(() => {
    if (dirty && renderAutomatically) {
      setDirty(false);
      setRenderResult(render(state));
    }
  }, [dirty, renderAutomatically, render]);
  const handleSubmit = useCallback(() => {
    setDirty(false);
    setRenderResult(render(state));
  }, [setRenderResult, render, state]);
  const handleCancel = useCallback(() => {
    const defaults = getDefault(options);
    setDirty(false);
    setRenderResult(render(defaults));
  }, [options]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ overflowX: 'auto' }}>
        <canvas
          ref={ref}
          width={renderResult.width}
          height={renderResult.height}
        />
      </div>
      {error && <div style={{ color: 'red' }}>Error</div>}
      {Object.entries(options)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => {
          const option = v as InteractiveCanvasOptionItemDescriptor<unknown>;
          return (
            <Option
              key={k}
              state={state}
              setState={setState}
              setDirty={setDirty}
              propertyName={k as keyof T}
              displayName={option.displayName}
              component={option.component}
            />
          );
        })}
      {!renderAutomatically && (
        <button
          type="button"
          onClick={handleSubmit}
          style={{ background: dirty ? '#FFFF0088' : undefined }}
          disabled={!dirty}
        >
          확인
        </button>
      )}
      <button type="button" onClick={handleCancel}>
        취소
      </button>
    </div>
  );
}

interface OptionProps<T> {
  state: T;
  setState: (set: SetStateAction<T>) => void;
  setDirty: (dirty: boolean) => void;
  propertyName: keyof T;
  displayName: string;
  component: ComponentType<
    InteractiveCanvasOptionItemDescriptorComponentProps<unknown>
  >;
}

function Option<T>({
  state,
  setState,
  setDirty,
  propertyName,
  displayName,
  component: Component,
}: OptionProps<T>) {
  const handleSetValue = useCallback(
    (newValue: unknown) => {
      setState((v) => ({ ...v, [propertyName]: newValue }));
      setDirty(true);
    },
    [setState, propertyName, setDirty],
  );
  return (
    <div>
      <div>{displayName}</div>
      <Component value={state[propertyName]} setValue={handleSetValue} />
    </div>
  );
}
