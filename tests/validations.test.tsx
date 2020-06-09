import { readHtmlValidationErrors, crossValidation, validateInput } from '../src/validations';
import { Validity } from '../src/FormField';
import { Validator, CrossValidator } from '../src/types/validators';

describe('Validations methods', () => {
  it('should read correctly html validation rules', () => {
    const inputValidity = {
      tooShort: true,
      valueMissing: true,
    };

    const result = readHtmlValidationErrors(inputValidity as ValidityState);

    expect(result).toEqual(['tooShort', 'valueMissing']);
  });

  it('should return valid for custom validation', () => {
    const validator: Validator = {
      name: 'minlength',
      validation: () => true,
    };

    const field = {
      password: {
        validators: [validator],
        errors: [],
        name: 'password',
        validity: Validity.PRISTINE,
        value: '',
      },
    };

    const result = validateInput(field.password.validators, field.password.value);

    expect(result).toEqual([]);
  });

  it('should return invalid for custom validation', () => {
    const validator: Validator = {
      name: 'minlength',
      validation: () => false,
    };

    const field = {
      password: {
        validators: [validator],
        errors: [],
        name: 'password',
        validity: Validity.PRISTINE,
        value: '',
      },
    };

    const result = validateInput(field.password.validators, field.password.value);

    expect(result).toEqual(['minlength']);
  });

  it('should return valid for cross validation', () => {
    const validator: CrossValidator = {
      name: 'minlength',
      validation: () => true,
    };

    const fields = {
      password: {
        validators: [validator],
        errors: [],
        name: 'password',
        validity: Validity.PRISTINE,
        value: '',
      },
    };

    const result = crossValidation(fields, [validator]);

    expect(result).toEqual([]);
  });

  it('should return invalid for cross validation', () => {
    const validator: CrossValidator = {
      name: 'same',
      validation: () => false,
    };

    const fields = {
      password: {
        validators: [],
        errors: [],
        name: 'password',
        validity: Validity.PRISTINE,
        value: '',
      },
    };

    const result = crossValidation(fields, [validator]);

    expect(result).toEqual(['same']);
  });
});
