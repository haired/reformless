import React from 'react';
import { FormFieldData } from '../FormField';

export const FormContext = React.createContext<FormContextType | null>(null);

export type FormContextType = {
  fields: { [name: string]: FormFieldData };
  errors: string[];
  setFieldValue: (name: string, value: string | number | boolean, errors: string[]) => void;
};
