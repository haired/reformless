import { min, max, required, minLength, regex, equal, maxLength, email } from '../src/validators';

describe('Validators', () => {
  describe('required', () => {
    it('should return true when value set', () => {
      const validator = required;
      const result = validator.validation('chris');
      expect(result).toBeTruthy();
    });

    it('should return true when value is true', () => {
      const validator = required;
      const result = validator.validation(true);
      expect(result).toBeTruthy();
    });

    it('should return false when value false', () => {
      const validator = required;
      const result = validator.validation(false);
      expect(result).toBeFalsy();
    });

    it('should return false when value empty', () => {
      const validator = required;
      const result = validator.validation('');
      expect(result).toBeFalsy();
    });

    it('should return false when value null', () => {
      const validator = required;
      const result = validator.validation(null);
      expect(result).toBeFalsy();
    });

    it('should return false when value undefined', () => {
      const validator = required;
      const result = validator.validation(null);
      expect(result).toBeFalsy();
    });

    it('should return false when value whitespaces', () => {
      const validator = required;
      const result = validator.validation('  ');
      expect(result).toBeFalsy();
    });
  });

  describe('minLength', () => {
    it('should return true when length match', () => {
      const validator = minLength(2);
      const result = validator.validation('chris', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when value lower', () => {
      const validator = minLength(4);
      const result = validator.validation('ck', validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when value empty', () => {
      const validator = minLength(2);
      const result = validator.validation('', validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when value null', () => {
      const validator = minLength(2);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when value undefined', () => {
      const validator = minLength(2);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when value whitespaces', () => {
      const validator = minLength(2);
      const result = validator.validation('  ', validator.arguments);
      expect(result).toBeFalsy();
    });
  });

  describe('maxLength', () => {
    it('should return true when length equal', () => {
      const validator = maxLength(5);
      const result = validator.validation('chris', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when length smaller', () => {
      const validator = maxLength(5);
      const result = validator.validation('chri', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when value greater', () => {
      const validator = maxLength(4);
      const result = validator.validation('foo fighters', validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return true when value empty', () => {
      const validator = maxLength(2);
      const result = validator.validation('', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when value null', () => {
      const validator = maxLength(2);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when value undefined', () => {
      const validator = maxLength(2);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when value whitespaces', () => {
      const validator = maxLength(2);
      const result = validator.validation('  ', validator.arguments);
      expect(result).toBeTruthy();
    });
  });

  describe('min', () => {
    it('should return true when length greater', () => {
      const validator = min(3);
      const result = validator.validation(4, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when length equals', () => {
      const validator = min(3);
      const result = validator.validation(3, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when length smaller', () => {
      const validator = min(3);
      const result = validator.validation(2, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when string', () => {
      const validator = min(3);
      const result = validator.validation('2', validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when undefined', () => {
      const validator = min(3);
      const result = validator.validation(undefined, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when null', () => {
      const validator = min(3);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when empty', () => {
      const validator = min(3);
      const result = validator.validation('', validator.arguments);
      expect(result).toBeFalsy();
    });
  });

  describe('max', () => {
    it('should return true when length smaller', () => {
      const validator = max(3);
      const result = validator.validation(2, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when length equals', () => {
      const validator = max(3);
      const result = validator.validation(3, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when length greater', () => {
      const validator = max(3);
      const result = validator.validation(4, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when number string', () => {
      const validator = max(3);
      const result = validator.validation('2', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when string', () => {
      const validator = max(3);
      const result = validator.validation('w', validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when undefined', () => {
      const validator = max(3);
      const result = validator.validation(undefined, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when null', () => {
      const validator = max(3);
      const result = validator.validation(null, validator.arguments);
      expect(result).toBeFalsy();
    });

    it('should return false when empty', () => {
      const validator = max(3);
      const result = validator.validation('', validator.arguments);
      expect(result).toBeFalsy();
    });
  });

  describe('regex', () => {
    it('should return true when regex matches', () => {
      const validator = regex(
        '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
      );
      const result = validator.validation('christian.kouame@live.fr', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when regex dont matches', () => {
      const validator = regex(
        'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
      );
      const result = validator.validation('christian.kouame@live.fr', validator.arguments);
      expect(result).toBeFalsy();
    });
  });

  describe('email', () => {
    it('should return true when email is correct', () => {
      const validator = email();
      const result = validator.validation('christian.kouame@live.fr', validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when email is incorrect', () => {
      const validator = email();
      const result = validator.validation('christian.kouamelive.fr', validator.arguments);
      expect(result).toBeFalsy();
    });
  });

  describe('equal', () => {
    it('should return true when fields value are equals', () => {
      const validator = equal('firstname', 'surname');
      const fields = {
        firstname: {
          name: 'firstname',
          value: 'christian',
        },
        surname: {
          name: 'surname',
          value: 'christian',
        },
      };
      const result = validator.validation(fields as any, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when fields name not in context', () => {
      const validator = equal('name', 'lastname');
      const fields = {
        firstname: {
          name: 'firstname',
          value: 'christian',
        },
        surname: {
          name: 'surname',
          value: 'christian',
        },
      };
      const result = validator.validation(fields as any, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return true when on field name not in context', () => {
      const validator = equal('firstname', 'lastname');
      const fields = {
        firstname: {
          name: 'firstname',
          value: 'christian',
        },
        surname: {
          name: 'surname',
          value: 'christian',
        },
      };
      const result = validator.validation(fields as any, validator.arguments);
      expect(result).toBeTruthy();
    });

    it('should return false when fields value are not equals', () => {
      const validator = equal('firstname', 'surname');
      const fields = {
        firstname: {
          name: 'firstname',
          value: 'christian',
        },
        surname: {
          name: 'surname',
          value: 'kouame',
        },
      };
      const result = validator.validation(fields as any, validator.arguments);
      expect(result).toBeFalsy();
    });
  });
});
