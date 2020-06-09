import { Validator } from '../types/validators';

/** Specify the maximum length for a value. */
export function maxLength(length: number): Validator {
  return {
    name: 'MaxLength',
    validation: maxLengthValidation,
    arguments: length,
  };
}

function maxLengthValidation(value: any, length: number): boolean {
  return value ? value.length <= length : true;
}
