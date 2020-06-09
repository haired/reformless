import { Validator } from '../types/validators';

/** Validate a value against a regular expression */
export function regex(pattern: RegExp | string): Validator {
  return {
    name: 'regex',
    validation: regexValidation,
    arguments: pattern,
  };
}

function regexValidation(value: any, pattern: string | RegExp) {
  const pat = typeof pattern == 'string' ? RegExp(pattern) : pattern;
  return pat.test(value);
}
