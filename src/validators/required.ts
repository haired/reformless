import { Validator } from '../types/validators';

/** Mark a field as required. */
export const required: Validator = {
  name: 'required',
  validation: RequiredValidation,
};

function RequiredValidation(value: string): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  return value && value.trim() ? true : false;
}
