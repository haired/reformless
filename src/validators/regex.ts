import { Validator } from '../types/validators';

/** Validate a value against a regular expression. The pattern should be passed as a string (no / at the start nor end of the value) */
export function regex(pattern: string): Validator {
  return {
    name: 'regex',
    validation: regexValidation,
    arguments: [pattern],
  };
}

function regexValidation(value: any, pattern: string) {
  const regexp = RegExp(pattern);
  return regexp.test(value);
}
