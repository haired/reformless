import React, { Component } from 'react';
import { FormContext, FormContextType } from './types/formContext';
import { FormFieldData, Validity } from './FormField';
import { crossValidation } from './validations';
import { CrossValidator } from './types/validators';

/* * Component to wrap FormFields or Html inputs.*/
export class Form extends Component<FormProps, FormContextType> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      fields: {},
      errors: [],
      setFieldValue: this.setFieldValue.bind(this)
    };
  }

  setFieldValue = (name: string, value: string | number | boolean, errors: string[]) => {
    let field = Object.assign({}, this.state.fields[name]);
    field.value = value;
    field.errors = errors;

    this.setState((state) => ({
      fields: { ...state.fields, [name]: field },
    }), this.onFieldChange);
  };

  validateForm = (): string[] => {
    const globalErrors = [];

    if (this.props.validators) {
      const crossValidations = crossValidation(this.state.fields, this.props.validators);
      globalErrors.push(...crossValidations);
    }

    return globalErrors;
  }

  fireValidityChange = (globalError: string[]) => {
    if (this.props.validityChange) {
      const formValidity = this.getValidity(this.state.fields, globalError);
      this.props.validityChange(formValidity);
    }
  }

  fireValueChangeCallback = () => {
    if (this.props.valuesChange) {
      this.props.valuesChange(this.state.fields);
    }
  }

  onFieldChange = () => {
    const globalErrors = this.validateForm();
    this.fireValidityChange(globalErrors);
    this.fireValueChangeCallback();
    this.setState({ errors: globalErrors });
  };

  getValidity = (fields: { [name: string]: FormFieldData }, globalError: string[]) => {
    const areFieldswithErrors = Object.values(fields).some(f => f.errors && f.errors.length > 0);

    return areFieldswithErrors || globalError.length > 0 ? Validity.INVALID : Validity.VALID;
  };

  render() {
    return (
      <span>
        <FormContext.Provider value={this.state}>{this.props.children}</FormContext.Provider>
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