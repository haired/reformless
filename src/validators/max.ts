import { Validator } from '../types/validators';

/** Validate that a value is smaller than a certain threshold */
export function max(value: number): Validator {
  return {
    name: 'min',
    validation: minValidation,
    arguments: value,
  };
}

function minValidation(value: number, minValue: number) {
  return Number(value) ? value <= minValue : false;
}
