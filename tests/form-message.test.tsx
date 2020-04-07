import { mount } from 'enzyme';
import { FormErrorMessage } from '../src/FormErrorMessage';
import React from 'react';
import { FormContext, FormContextType } from '../src/types/FormContextType';
import { Validity } from '../src/FormField';

describe('Form Message component', () => {
  it('should render error message when field invalid and validator name set', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: [],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: ['same', 'minlength'],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage fieldName="firstname" validatorName="minlength">
          error
        </FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).text()).toEqual('error');
  });

  it('should not render error message when context null', () => {
    const wrapper = mount(
      <FormContext.Provider value={null}>
        <FormErrorMessage fieldName="firstname">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });

  it('should not render error message when field valid', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: [],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: [],
          validity: Validity.VALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage fieldName="firstname">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });

  it('should not render error message when field invalid and validator name dont match', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: [],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: ['same', 'minlength'],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage fieldName="firstname" validatorName="surname">
          error
        </FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });

  it('should render error messages when field invalid and validator name not set', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: [],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: ['same', 'minlength'],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage fieldName="firstname">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).text()).toEqual('error');
  });

  it('should render error messages when form invalid and validator name set', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: ['same', 'minlength'],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: [],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage validatorName="same">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).text()).toEqual('error');
  });

  it('should not render error messages when form invalid and no validator name set', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: ['same', 'minlength'],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: [],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage>error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });

  it('should not render error messages when form invalid and field name does not match', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: ['same', 'minlength'],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: [],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage fieldName="surname">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });

  it('should not render error messages when form invalid and validator name incorrect', () => {
    const initialContextValue: FormContextType = {
      setFieldInitialValue: jest.fn(),
      errors: ['same', 'minlength'],
      fields: {
        firstname: {
          name: 'firstname',
          validators: [],
          errors: [],
          validity: Validity.INVALID,
          value: true,
        },
      },
    };

    const wrapper = mount(
      <FormContext.Provider value={initialContextValue}>
        <FormErrorMessage validatorName="maxlength">error</FormErrorMessage>
      </FormContext.Provider>
    );

    expect(wrapper.find(FormErrorMessage).children()).toEqual({});
  });
});
