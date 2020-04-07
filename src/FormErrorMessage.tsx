import React, { ReactNode, Component } from 'react';
import { FormContext, FormContextType } from './FormContextType';

/* * The component to display an error on a field.
 * It can be used to show either form or field error. */
export class FormErrorMessage extends Component<FormErrorMessageProps> {
  static contextType = FormContext;

  render() {
    const { validatorName, fieldName, children } = this.props;
    const actualContext = this.context as FormContextType;

    const errors: string[] = [];
    if (actualContext) {
      if (fieldName) {
        const field = actualContext.fields[fieldName];
        if (field) {
          errors.push(...field.errors);
        }
      } else {
        errors.push(...actualContext.errors);
      }
    }

    if (errors.length > 0 && (!validatorName || errors.includes(validatorName))) {
      return <FormContext.Consumer>{() => children}</FormContext.Consumer>;
    }

    return null;
  }
}

export type FormErrorMessageProps = {
  /* * The name of the field for which the error should be displayed if it not valid.
   *  This props is not required if we want to show a global form error. */
  fieldName?: string;
  /* * The name of the validator for which the error should be displayed if not valid.
   * If no value is provided, this error will be displayed for all errors on a particular field.
   */
  validatorName?: string;
  children: ReactNode;
};
