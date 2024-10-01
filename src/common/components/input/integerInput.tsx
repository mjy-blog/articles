'use client';

import { ChangeEvent, ComponentType, useCallback } from 'react';
import { InputProps } from './InputProps';

export function integerInput(
  max?: number,
  min?: number,
): ComponentType<InputProps<number>> {
  return function IntegerInputComponent({
    value,
    setValue,
    style,
    placeholder,
  }: InputProps<number>) {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(e.target.value);
      if (Number.isNaN(newValue)) {
        newValue = 0;
      }
      if (max !== undefined && max < newValue) {
        newValue = max;
      }
      if (min !== undefined && min > newValue) {
        newValue = min;
      }
      setValue(newValue);
    }, []);

    return (
      <input
        value={value.toString()}
        onChange={handleChange}
        style={style}
        placeholder={placeholder}
      />
    );
  };
}
