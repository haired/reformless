import React, { Component, InputHTMLAttributes, ReactElement, ChangeEvent, ContextType, useEffect, useContext, SelectHTMLAttributes, useMemo } from 'react';
import { Validator } from './types/validators';
import { FormContext, FormContextType } from './types/formContext';
import { readHtmlValidationErrors, validateInput } from './validations';

export type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /** The name of the input field */
  name: string;
  /** A list of validator that will be used to validate the value of this field. */
  validators?: Validator[];
  children?: ReactElement;
  initialvalue?: string | number | boolean;
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

type MemoInput = InputHTMLAttributes<HTMLInputElement> & {
  contextValue: number | string | string[];
  contextChecked: boolean;
}

/** Component responsible to encapsulate your input.
 * It can be used with or without any children by using the same props as you input.
 * If you decide to use it with a children, you should put the 'name' props and the input children should be the direct child.
 */
export function FormField(props: FormFieldProps) {

  const context = useContext(FormContext);
  const value = getValue();
  let propValue;
  if (typeof value === 'boolean') {
    propValue = { checked: value as boolean };
  } else {
    propValue = { value };
  }

  const inputField = useMemo(() => (
    <InputFormField
      {...props} onChange={onChange} key={props.name}
      {...propValue} />
  ), [context?.fields[props.name]]
  );

  const children = props.children ? useMemo(() => React.cloneElement(props.children, {
    name: props.name,
    value: getValue(),
    onChange: onChange
  }), [context?.fields[props.name]]) : null;

  useEffect(
    () => initializeField(),
    []
  );

  function getCheckBoxValue(context: FormContextType): boolean {
    const value = getContextValue(context);
    return value ? true : false;
  }

  function getRadioValue(context: FormContextType): string | number | boolean {
    return getContextValue(context) == props.value;
  }

  function getContextValue(context: FormContextType): string | number | boolean {
    if (context == undefined) {
      return props.initialvalue;
    }

    return context?.fields[props.name]?.value || props.initialvalue;
  }

  function initializeField() {
    if (context) {
      context.setFieldValue(props.name, getValue(), []);
    }
  }

  function handleInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    const htmlValidationResult = readHtmlValidationErrors(target.validity);
    const value = target.type == 'checkbox' ? target.checked : target.value;
    const customValidationResult = validateInput(props.validators, value);

    // save value and errors in context
    (context as FormContextType).setFieldValue(
      target.name,
      value,
      htmlValidationResult.concat(customValidationResult)
    );
  }

  function onChange(event: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) {
    handleInputChange(event);
    props.onChange && props.onChange(event);
  }

  function getValue() {
    switch (props.type) {
      case 'radio':
        return getRadioValue(context);
      case 'checkbox':
        return getCheckBoxValue(context);
      default:
        return getContextValue(context);
    }
  }

  return props.children ? children : inputField;
}

function InputFormField(props: InputHTMLAttributes<HTMLInputElement> & FormFieldProps & MemoInput) {

  return (
    <FormContext.Consumer>
      {() => <input {...props} onChange={props.onChange} />}
    </FormContext.Consumer>
  );
}
