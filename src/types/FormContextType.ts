import React from 'react';
import { FormFieldData } from '../FormField';

export const FormContext = React.createContext<FormContextType | null>(null);

export type FormContextType = {
  fields: { [name: string]: FormFieldData };
  errors: string[];
  setFieldInitialValue: (field: FormFieldData) => void;
};
