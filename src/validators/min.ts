import { Validator } from '../types/validators';

/** Validate that a value is greater than a certain threshold */
export function min(minValue: number): Validator {
  return {
    name: 'min',
    validation: minValidation,
    arguments: [minValue],
  };
}

function minValidation(value: number, minValue: number) {
  return value >= minValue;
}
