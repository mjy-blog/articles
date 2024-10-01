'use client';

import {
  ChangeEvent,
  ComponentType,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InputProps } from './InputProps';

export function floatInput(): ComponentType<InputProps<number>> {
  return function FloatInput({
    value,
    setValue,
    style,
    placeholder,
  }: InputProps<number>) {
    const [hasTrailingDot, setHasTrailingDot] = useState(false);
    const [trailingZeroCount, setTrailingZeroCount] = useState(0);

    useEffect(() => {
      setHasTrailingDot(false);
      setTrailingZeroCount(0);
    }, [value]);
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!value) {
        setValue(0);
        setHasTrailingDot(false);
        setTrailingZeroCount(0);
        return;
      }
      const match1 = value.match(/^(?:[1-9][0-9]*|0)\.(0*)$/);
      if (match1) {
        const next = parseFloat(value);
        if (Number.isNaN(next)) return;
        setValue(next);
        setHasTrailingDot(true);
        setTrailingZeroCount(match1[1].length);
        return;
      }
      const match2 = value.match(/^(?:[1-9][0-9]*|0)\.[0-9]*[1-9](0*)$/);
      if (match2) {
        const next = parseFloat(value);
        if (Number.isNaN(next)) return;
        setValue(next);
        setHasTrailingDot(false);
        setTrailingZeroCount(match2[1].length);
        return;
      }
      const next = parseFloat(value);
      if (Number.isNaN(next)) return;
      setValue(next);
      setHasTrailingDot(false);
      setTrailingZeroCount(0);
    }, []);

    return (
      <input
        value={`${value}${hasTrailingDot ? '.' : ''}${'0'.repeat(
          trailingZeroCount,
        )}`}
        onChange={handleChange}
        style={style}
        placeholder={placeholder}
      />
    );
  };
}

export const FloatInput = floatInput();
