import React from 'react';
import { Form } from '../src/Form';
import { mount } from 'enzyme';
import { Validity, FormField, FormFieldData } from '../src/FormField';
import { Validator, CrossValidator } from '../src/types/validators';
import * as validations from '../src/validations';

describe('Form', () => {
  it('should render children', () => {
    const wrapper = mount(
      <Form>
        <input name="surname" />
      </Form>
    );

    expect(wrapper.find('input').prop('name')).toBe('surname');
  });

  it('should render default FormField', () => {
    const wrapper = mount(
      <Form>
        <FormField name="firstName" />
      </Form>
    );

    expect(wrapper.find('input').prop('name')).toEqual('firstName');
  });

  it('should set state value when input changes', () => {
    const wrapper = mount(<Form />);
    const instance = wrapper.instance();
    instance.setState = jest.fn();

    const changeEvent = { target: { name: 'name', value: 'giggs' } };
    wrapper.simulate('change', changeEvent);

    expect(instance.setState).toHaveBeenCalledWith({
      fields: { name: { name: 'name', value: 'giggs', validity: Validity.VALID, errors: [], validators: [] } },
      errors: [],
    });
  });

  it('should call html validity check for input', () => {
    const wrapper = mount(
      <Form>
        <input name="firstName" required={true} />
      </Form>
    );
    const spy = jest.spyOn(validations, 'readHtmlValidationErrors');

    const changeEvent = { target: { name: 'name', value: 'giggs' } };
    wrapper.simulate('change', changeEvent);

    expect(spy).toHaveBeenCalledWith(undefined);
  });

  it('should call html validity check for FormField', () => {
    const wrapper = mount(
      <Form>
        <FormField name="firstName" required={true} />
      </Form>
    );
    const spy = jest.spyOn(validations, 'readHtmlValidationErrors');

    const changeEvent = { target: { name: 'name', value: 'giggs', validity: { required: true } } };
    wrapper.simulate('change', changeEvent);

    expect(spy).toHaveBeenCalledWith({ required: true });
  });

  it('should call simple validation check', () => {
    const sameValidator: Validator = {
      name: 'samePassword',
      validation: jest.fn(),
      arguments: [8],
    };

    const wrapper = mount(<Form />);
    const field: FormFieldData = {
      errors: [],
      name: 'firstName',
      validators: [sameValidator],
      validity: Validity.PRISTINE,
      value: 'RVN'
    };
    const fields = { [field.name]: field };
    wrapper.instance().state = { fields };
    const spy = jest.spyOn(validations, 'validateInput').mockReturnValue([]);

    const changeEvent = { target: { name: 'firstName', value: 'RVN' } };
    wrapper.simulate('change', changeEvent);

    expect(spy).toHaveBeenCalledWith(field);
  });

  it('should call cross validation check', () => {
    const sameValidator: CrossValidator = {
      name: 'samePassword',
      validation: jest.fn(),
      arguments: [8],
    };

    const wrapper = mount(<Form validators={[sameValidator]} />);
    const fields = { firstName: { name: 'firstName', value: 'RVN', validity: Validity.INVALID } };
    wrapper.instance().state = { fields };
    const spy = jest.spyOn(validations, 'crossValidation');

    const changeEvent = { target: { name: 'firstName', value: 'RVN' } };
    wrapper.simulate('change', changeEvent);

    expect(spy).toHaveBeenCalledWith(fields, [sameValidator]);
  });

  it('should fire onValueChange when input value change', () => {
    const onValueChange = jest.fn();

    const wrapper = mount(<Form valuesChange={onValueChange} />);
    const fields = {
      firstName: { name: 'firstName', value: 'Rooney', validity: Validity.INVALID },
    };
    wrapper.instance().state = { fields };

    const changeEvent = { target: { name: 'firstName', value: 'RVN' } };
    wrapper.simulate('change', changeEvent);

    expect(onValueChange).toHaveBeenCalledWith({ firstName: 'RVN' });
  });

  it('should fire onValidityChange when input validity change', () => {
    const onValidityChange = jest.fn();

    const wrapper = mount(<Form validityChange={onValidityChange} />);
    const fields = { firstName: { name: 'firstName', value: '', validity: Validity.PRISTINE } };
    wrapper.instance().state = { fields };

    const changeEvent = { target: { name: 'firstName', value: 'RVN' } };
    wrapper.simulate('change', changeEvent);

    expect(onValidityChange).toHaveBeenCalledWith(Validity.VALID);
  });

  it('should use checked value for checkbox', () => {
    const wrapper = mount(<Form />);
    const instance = wrapper.instance();
    instance.setState = jest.fn();

    let changeEvent = { target: { name: 'name', value: 'on', checked: true, type: 'checkbox' } };
    wrapper.simulate('change', changeEvent);

    const expectedField: FormFieldData = {
      name: 'name',
      value: true,
      validity: Validity.VALID,
      errors: [],
      validators: []
    };
    expect(instance.setState).toHaveBeenCalledWith({
      fields: { [expectedField.name]: expectedField },
      errors: [],
    });

    changeEvent = { target: { name: 'name', value: 'on', checked: false, type: 'checkbox' } };
    wrapper.simulate('change', changeEvent);

    const expectedField2: FormFieldData = {
      name: 'name',
      value: false,
      validity: Validity.VALID,
      errors: [],
      validators: []
    };

    expect(instance.setState).toHaveBeenCalledWith({
      fields: { [expectedField2.name]: expectedField2 },
      errors: [],
    });
  });
});
