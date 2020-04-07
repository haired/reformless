import { FormFieldData } from '../FormField';

/** Interface to be implemented by all simple validators, that are validation
 * using only one field value.
 */
export interface Validator {
  name: string;
  validation: (value: any, ...rest: any[]) => boolean;
  arguments?: any[];
}

/** Interface to be implemented by all validations using different fields values. */
export interface CrossValidator extends Validator {
  validation: (fields: { [name: string]: FormFieldData }, ...rest: any[]) => boolean;
}
