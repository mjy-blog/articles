import { ComponentType } from 'react';

export type InteractiveCanvasOptionDescriptor<T> = {
  [K in keyof T]-?: InteractiveCanvasOptionItemDescriptor<T[K]>;
};

export interface InteractiveCanvasOptionItemDescriptor<T> {
  default: T;
  component: ComponentType<
    InteractiveCanvasOptionItemDescriptorComponentProps<T>
  >;
}

export interface InteractiveCanvasOptionItemDescriptorComponentProps<T> {
  value: T;
  setValue: (value: T) => void;
}
