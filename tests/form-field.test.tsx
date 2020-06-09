import React from 'react';
import { FormField, Validity } from '../src/FormField';
import { mount } from 'enzyme';
import { FormContext, FormContextType } from '../src/types/formContext';

describe('Form Field', () => {

  it('should render default FormField', () => {
    const wrapper = mount(<FormField name="firstName" />);

    expect(wrapper.find('input').prop('name')).toEqual('firstName');
    expect(wrapper.find('input').text()).toEqual('');
  });

  it('should render  FormField initial value', () => {
    const wrapper = mount(<FormField name="firstName" initialvalue="Eric" />);

    expect(wrapper.find('input').prop('value')).toEqual('Eric');
  });

  it('should render radio FormField', () => {
    const wrapper = mount(<FormField name="pass" type="radio" />);

    expect(wrapper.find('input').prop('type')).toEqual('radio');
  });

  it('should render checkbox FormField', () => {
    const wrapper = mount(<FormField name="pass" type="checkbox" />);

    expect(wrapper.find('input').prop('type')).toEqual('checkbox');
    expect(wrapper.find('input').prop('checked')).toEqual(false);
  });

  it('should render password FormField', () => {
    const wrapper = mount(<FormField name="password" type="password" />);

    expect(wrapper.find('input').prop('type')).toEqual('password');
  });

  it('should render textarea input', () => {
    const wrapper = mount(
      <FormField name="team" type="password" initialvalue="Glory Man Utd">
        <textarea />
      </FormField>
    );

    expect(wrapper.find('textarea').prop('name')).toEqual('team');
    expect(wrapper.find('textarea').text()).toEqual('Glory Man Utd');
  });

  it('should render select input', () => {
    const wrapper = mount(
      <FormField name="team">
        <select>
          <option value={20}>Glory Man Utd</option>
          <option value={1}>Shame on City</option>
        </select>
      </FormField>
    );

    expect(wrapper.find('option').first().prop('value')).toEqual(20);
    expect(wrapper.find('select').prop('name')).toEqual('team');
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
      setFieldValue: jest.fn(),
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField name="lastName" />
      </FormContext.Provider>
    );

    expect(wrapper.find('input').prop('value')).toEqual('Bailly');
  });

  it('should read checkbox value from context wrapping FormField when checked', () => {
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
      setFieldValue: jest.fn()
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField type="checkbox" name="fan" />
        );
      </FormContext.Provider>
    );

    expect(wrapper.find('input').prop('checked')).toEqual(true);

  });

  it('should read checkbox value from context wrapping FormField when not checked', () => {
    const initialContext: FormContextType = {
      fields: {
        fan: {
          name: 'fan',
          validators: [],
          errors: [],
          validity: Validity.VALID,
          value: false,
        },
      },
      errors: [],
      setFieldValue: jest.fn()
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField type="checkbox" name="fan" />
        );
      </FormContext.Provider>
    );

    expect(wrapper.find('input').prop('checked')).toEqual(false);

  });

  it('should send checked value for checkbox', () => {
    const setFieldValue = jest.fn();

    const initialContext: FormContextType = {
      fields: {
        fan: {
          name: 'fan',
          validators: [],
          errors: [],
          validity: Validity.VALID,
          value: false,
        },
      },
      errors: [],
      setFieldValue,
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContext}>
        <FormField type="checkbox" name="fan" />
      </FormContext.Provider>
    );

    const event = { target: { name: "fan", checked: true, type: 'checkbox' } };
    wrapper.find('input').simulate('change', event);

    expect(setFieldValue).toHaveBeenCalledTimes(2);
    expect(setFieldValue).toHaveBeenLastCalledWith('fan', true, []);
  });
});
