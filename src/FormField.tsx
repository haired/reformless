import React, { Component, InputHTMLAttributes, ReactElement } from 'react';
import { Validator } from './types/validators';
import { FormContext, FormContextType } from './types/formContext';

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /** The name of the input field */
  name: string;
  /** A list of validator that will be used to validate the value of this field. */
  validators?: Validator[];
  children?: ReactElement;
};

/** Data representing the current state of a field */
export interface FormFieldData {
  name: string;
  value: any;
  validity: Validity;
  errors: string[];
  validators: Validator[];
}

/** Validity enumeration used for both FormField and Form */
export enum Validity {
  VALID,
  INVALID,
  PRISTINE,
}

/** Component responsible to encapsulate your input.
 * It can be used with or without any children by using the same props as you input.
 * If you decide to use it with a children, you should put the 'name' props and the input children should be the direct child.
 */
export class FormField extends Component<FormFieldProps> {
  static contextType = FormContext;

  componentDidMount() {
    this.initializeField();
  }

  componentDidUpdate(prevProps: FormFieldProps) {
    if (prevProps.validators !== this.props.validators) {
      this.initializeField();
    }
  }

  initializeField = () => {
    const context = this.context as FormContextType;
    if (context) {
      let field = context.fields[this.props.name];
      if (field) {
        field.validators = this.props.validators || [];
      } else {
        field = {
          name: this.props.name,
          value: this.getValue(),
          validators: this.props.validators || [],
          validity: Validity.PRISTINE,
          errors: [],
        };
      }
      context.setFieldInitialValue(field);
    }
  };

  getValue = (): any => {
    const field = (this.context as FormContextType)?.fields[this.props.name];
    return field ? field.value : undefined;
  };

  checkBoxValue() {
    let value = this.getValue() ? true : false;
    return { checked: value };
  }

  generateChildren = () => {
    const childInput = <input {...this.props} onChange={this.props.onChange || (() => ({}))} />;

    switch (this.props.type) {
      case 'radio':
        return React.cloneElement(childInput, {
          checked: childInput.props.value === this.getValue(),
        });
      case 'checkbox':
        return React.cloneElement(childInput, this.checkBoxValue());
      default:
        return React.cloneElement(childInput, {
          value: this.getValue() || "",
        });
    }
  };

  render() {
    const children =
      this.props.children &&
      React.cloneElement(this.props.children as ReactElement, {
        defaultValue: this.props.defaultValue,
        defaultChecked: this.props.defaultChecked,
      });
    return <FormContext.Consumer>{() => children || this.generateChildren()}</FormContext.Consumer>;
  }
}
