import React, { Component, ChangeEvent } from 'react';
import { FormContext } from './types/formContext';
import { FormFieldData, Validity } from './FormField';
import { validateInput, readHtmlValidationErrors, crossValidation } from './validations';
import { CrossValidator } from './types/validators';

/* * Component to wrap FormFields or Html inputs.*/
export class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      fields: {},
      errors: [],
      validity: Validity.PRISTINE,
    };
  }

  setFieldInitialValue = (field: FormFieldData) => {
    this.setState((state) => ({
      fields: { ...state.fields, [field.name]: field },
    }));
  };

  constructFieldData({ name, value, checked, type }: EventTarget & HTMLInputElement): FormFieldData {
    const fieldValue = type === 'checkbox' ? checked : value;
    const field: FormFieldData = this.state.fields[name] || {
      validity: Validity.PRISTINE,
      errors: [],
      name: '',
      value: '',
      validators: []
    };

    field.name = name;
    field.value = fieldValue;

    return field;
  }

  validateAndUpdate(target: EventTarget & HTMLInputElement) {
    const newField = this.constructFieldData(target);

    const htmlValidationResult = readHtmlValidationErrors(target.validity);
    const customValidationResult = validateInput(newField);
    newField.errors = htmlValidationResult.concat(customValidationResult);

    newField.validity = newField.errors.length > 0 ? Validity.INVALID : Validity.VALID;

    return newField;
  }

  validateForm(fields: { [key: string]: FormFieldData }): string[] {
    const globalErrors = [];

    if (this.props.validators) {
      const crossValidations = crossValidation(fields, this.props.validators);
      globalErrors.push(...crossValidations);
    }

    return globalErrors;
  }

  fireValidityChange(fields: { [key: string]: FormFieldData }, globalError: string[]) {
    const formValidity = this.getValidity(fields, globalError);
    if (this.props.validityChange && this.state.validity !== formValidity) {
      this.props.validityChange(formValidity);
    }
  }

  fireValueChangeCallback(fields: { [key: string]: FormFieldData }) {
    if (this.props.valuesChange) {
      this.props.valuesChange(this.formatFormValue(fields));
    }
  }

  onFieldChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newField = this.validateAndUpdate(target);

    let fields = { ...this.state.fields };
    fields[target.name] = newField;

    const globalErrors = this.validateForm(fields);

    this.setState({
      fields: fields,
      errors: globalErrors,
    });

    this.fireValidityChange(fields, globalErrors);
    this.fireValueChangeCallback(fields);
  };

  formatFormValue = (fields: { [name: string]: FormFieldData }) => {
    const values: { [name: string]: any } = {};

    for (const name in fields) {
      if (name) {
        values[name] = fields[name].value;
      }
    }

    return values;
  };

  getValidity = (fields: { [name: string]: FormFieldData }, globalError: string[]) => {
    const errors = [];
    const areFieldswithErrors = Object.values(fields).some(f => f.errors && f.errors.length > 0);
    for (const name in fields) {
      if (name) {
        const field = fields[name];
        if (field.errors && field.errors.length > 0) {
          errors.push(field.errors);
        }
      }
    }

    return areFieldswithErrors && globalError.length > 0 ? Validity.INVALID : Validity.VALID;
  };

  render() {
    const contextValue = {
      fields: this.state.fields,
      setFieldInitialValue: this.setFieldInitialValue,
      errors: this.state.errors,
    };
    return (
      <span onChange={this.onFieldChange}>
        <FormContext.Provider value={contextValue}>{this.props.children}</FormContext.Provider>
      </span>
    );
  }
}

export type FormProps = {
  /* * A list of global validators.*/
  validators?: CrossValidator[];
  /* * Handler fired everytime the validity of the form changes.*/
  validityChange?: (validity: Validity) => void;
  /* * Handler fired everytime a value in the form changes.*/
  valuesChange?: (values: { [name: string]: any }) => void;
};

export type FormState = {
  fields: { [name: string]: FormFieldData };
  errors: string[];
  validity: Validity;
};
