import { CrossValidator } from '../types/validators';
import { FormFieldData } from '../FormField';

/** Validate that several fields have the same value. */
export function equal(...fieldsName: string[]): CrossValidator {
  return {
    name: 'equal',
    validation: equalValidation,
    arguments: fieldsName,
  };
}

function equalValidation(fields: { [name: string]: FormFieldData }, fieldsName: string[]): boolean {
  const targetFields = fieldsName
    .map((fieldName) => fields[fieldName]?.value)
    .filter((f) => f !== undefined);
  if (targetFields && targetFields.length > 0) {
    const firstValue = targetFields[0];
    return targetFields.every((t) => t === firstValue);
  } else {
    return true;
  }
}
