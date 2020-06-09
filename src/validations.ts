import { FormFieldData } from './FormField';
import { CrossValidator, Validator } from './types/validators';

export function readHtmlValidationErrors(validationRules: ValidityState): string[] {
  const errors: string[] = [];
  for (const validationRule in validationRules) {
    if ((validationRules as any)[validationRule] === true && validationRule !== 'valid') {
      errors.push(validationRule);
    }
  }

  return errors;
}



export function crossValidation(
  fields: { [name: string]: FormFieldData },
  validators: CrossValidator[]
): string[] {
  const errors: string[] = [];

  if (validators) {
    validators.forEach((v) => {
      let isValid: boolean;
      isValid = v.validation(fields, v.arguments);
      if (!isValid) {
        errors.push(v.name);
      }
    });
  }
  return errors;
}

export function validateInput(validators: Validator[], value: string | boolean): string[] {
  const errors: string[] = [];

  if (validators) {
    validators.forEach((v) => {
      let isValid: boolean;
      isValid = v.validation(value, v.arguments);
      if (!isValid) {
        errors.push(v.name);
      }
    });
  }
  return errors;
}