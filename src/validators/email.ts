import { Validator } from '../types/validators';

/** Validate email input */
export function email(): Validator {
  return {
    name: 'email',
    validation: emailValidation,
  };
}

function emailValidation(value: string) {
  return new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$').test(
    value
  );
}
