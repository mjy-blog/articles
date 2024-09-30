import { ComponentType } from 'react';

export type InteractiveCanvasOptionDescriptor<T> = {
  [K in keyof T]-?: InteractiveCanvasOptionItemDescriptor<T[K]>;
};

export interface InteractiveCanvasOptionItemDescriptor<T> {
  defaultValue: T;
  displayName: string;
  component: ComponentType<
    InteractiveCanvasOptionItemDescriptorComponentProps<T>
  >;
}

export interface InteractiveCanvasOptionItemDescriptorComponentProps<T> {
  value: T;
  setValue: (value: T) => void;
}
