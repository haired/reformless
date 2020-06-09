import React from 'react';
import { Form } from '../src/Form';
import { mount } from 'enzyme';
import { Validity, FormField } from '../src/FormField';
import { CrossValidator } from '../src/types/validators';
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

  it('should call cross validation check', () => {
    const sameValidator: CrossValidator = {
      name: 'samePassword',
      validation: jest.fn(),
      arguments: [8],
    };

    const wrapper = mount(<Form validators={[sameValidator]} />);
    const field = { name: 'firstName', value: 'RVN', validity: Validity.INVALID };
    const fields = { firstName: field };
    wrapper.instance().state = { fields };

    const spy = jest.spyOn(validations, 'crossValidation');

    (wrapper.instance() as Form).onFieldChange();

    expect(spy).toHaveBeenCalledWith(fields, [sameValidator]);
  });

  it('should fire onValueChange when input value change', () => {
    const onValueChange = jest.fn();

    const wrapper = mount(<Form valuesChange={onValueChange} />);
    const field = { name: 'firstName', value: 'Rooney', validity: Validity.INVALID };
    const fields = { firstName: field };
    wrapper.instance().state = { fields };

    (wrapper.instance() as Form).onFieldChange();

    expect(onValueChange).toHaveBeenCalledWith(fields);
  });

  it('should fire onValidityChange when input validity change', () => {
    const onValidityChange = jest.fn();

    const wrapper = mount(<Form validityChange={onValidityChange} />);
    const field = { name: 'firstName', value: '', errors: ['name'] };
    const fields = { firstName: field };
    wrapper.instance().state = { fields };

    (wrapper.instance() as Form).onFieldChange();

    expect(onValidityChange).toHaveBeenCalledWith(Validity.INVALID);
  });


});
