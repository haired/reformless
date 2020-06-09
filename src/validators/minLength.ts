import { Validator } from '../types/validators';

/** Specify the minimum length for a value. */
export function minLength(length: number): Validator {
  return {
    name: 'minLength',
    validation: minLengthValidation,
    arguments: length,
  };
}

function minLengthValidation(value: string, length: number): boolean {
  const valueLength = value ? value.trim().length : 0;
  return value ? valueLength >= length : false;
}
