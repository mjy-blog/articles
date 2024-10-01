import { CSSProperties } from 'react';

export interface InputProps<T> {
  value: T;
  setValue: (value: T) => void;
  style?: CSSProperties;
  placeholder?: string;
}
