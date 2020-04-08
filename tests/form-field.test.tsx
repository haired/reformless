import React from 'react';
import { FormField, FormFieldData, Validity } from '../src/FormField';
import { mount } from 'enzyme';
import { Validator } from '../src/types/validators';
import { FormContext, FormContextType } from '../src/types/formContext';

describe('Form Field', () => {
  const requiredValidator: Validator = {
    validation: (value: any) => value.length > 0,
    name: 'requiredMock',
  };

  it('should render default FormField', () => {
    const wrapper = mount(<FormField name="firstName" />);

    expect(wrapper.find('input').prop('name')).toEqual('firstName');
  });

  it('should render default FormField value', () => {
    const wrapper = mount(<FormField name="firstName" defaultValue="Eric" />);

    expect(wrapper.find('input').prop('defaultValue')).toEqual('Eric');
  });

  it('should render radio FormField', () => {
    const wrapper = mount(<FormField name="pass" type="radio" />);

    expect(wrapper.find('input').prop('type')).toEqual('radio');
  });

  it('should render checkbox FormField', () => {
    const wrapper = mount(<FormField name="pass" type="checkbox" />);

    expect(wrapper.find('input').prop('type')).toEqual('checkbox');
  });

  it('should render password FormField', () => {
    const wrapper = mount(<FormField name="pass" type="password" />);

    expect(wrapper.find('input').prop('type')).toEqual('password');
  });

  it('should render wrapper input', () => {
    const wrapper = mount(
      <FormField name="pass" type="password">
        <div>
          <textarea defaultValue="Glory Man Utd" />
        </div>
      </FormField>
    );

    expect(wrapper.find('textarea').text()).toEqual('Glory Man Utd');
  });

  it('should read value from context wrapping FormField', () => {
    const initialContext: FormContextType = {
      fields: {
        lastName: {
          name: 'lastName',
          validators: [],
          errors: [],
          validity: Validity.VALID,
          value: 'Bailly',
        },
      },
      errors: [],
      setFieldInitialValue: jest.fn(),
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField name="lastName" />
        );
      </FormContext.Provider>
    );

    expect(wrapper.find('input').prop('value')).toEqual('Bailly');
  });

  it('should read checked from context wrapping FormField', () => {
    const initialContext: FormContextType = {
      fields: {
        fan: {
          name: 'fan',
          validators: [],
          errors: [],
          validity: Validity.VALID,
          value: true,
        },
      },
      errors: [],
      setFieldInitialValue: jest.fn(),
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField type="checkbox" name="fan" />
        );
      </FormContext.Provider>
    );

    expect(wrapper.find('input').prop('checked')).toBeTruthy();
  });

  it('should save validators to context at mount', () => {
    const setField = jest.fn();
    const initialContextValue: FormContextType = {
      setFieldInitialValue: setField,
      fields: {},
      errors: [],
    };

    mount(
      <FormContext.Provider value={initialContextValue}>
        <FormField name="team" validators={[requiredValidator]} />
      </FormContext.Provider>
    );

    const expectedField: FormFieldData = {
      name: 'team',
      validity: Validity.PRISTINE,
      value: undefined,
      errors: [],
      validators: [requiredValidator],
    };
    expect(setField).toHaveBeenCalledWith(expectedField);
  });

  it('should save validators to context at update', () => {
    const setField = jest.fn();
    const initialContextValue: FormContextType = {
      setFieldInitialValue: setField,
      errors: [],
      fields: {},
    };

    const newValidator = jest.fn();
    const minValidator: Validator = {
      validation: newValidator,
      name: 'minMock',
    };

    const newProps = { name: 'myteam', validators: [minValidator] };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormField {...newProps} />
      </FormContext.Provider>
    );

    const instance = wrapper.instance();
    instance?.componentDidUpdate({}, {});

    const expectedField: FormFieldData = {
      name: 'myteam',
      validity: Validity.PRISTINE,
      value: undefined,
      errors: [],
      validators: [minValidator],
    };
    expect(setField).toHaveBeenLastCalledWith(expectedField);
  });
});
