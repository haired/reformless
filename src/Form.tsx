import React, { Component, ChangeEvent } from 'react';
import { FormContext } from './types/FormContextType';
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

  onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, validity } = event.target;

    let { fields } = this.state;

    const errors: string[] = [];
    const newField = { ...this.state.fields[name], name, value };

    fields = { ...this.state.fields, [name]: newField };

    // html validations
    const htmlValidationResult = readHtmlValidationErrors(validity);
    errors.push(...htmlValidationResult);

    // custom validations
    const customValidationResult = validateInput(fields[name]);
    errors.push(...customValidationResult);

    // cross validations
    const globalErrors = [];
    if (this.props.validators) {
      const crossValidations = crossValidation(fields, this.props.validators);
      globalErrors.push(...crossValidations);
    }

    const fieldValidity = errors.length > 0 ? Validity.INVALID : Validity.VALID;

    if (this.props.valuesChange) {
      this.props.valuesChange(this.formatFormValue(fields));
    }

    const formValidity = this.getValidity(fields);
    if (this.props.validityChange && this.state.validity !== formValidity) {
      this.props.validityChange(formValidity);
    }

    this.setState({
      fields: {
        ...fields,
        [name]: { ...newField, validity: fieldValidity, errors },
      },
      errors: globalErrors,
    });
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

  getValidity = (fields: { [name: string]: FormFieldData }) => {
    const errors = [];
    for (const name in fields) {
      if (name) {
        const field = fields[name];
        if (field.errors) {
          errors.push(field.errors);
        }
      }
    }

    return errors.length === 0 ? Validity.VALID : Validity.INVALID;
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
