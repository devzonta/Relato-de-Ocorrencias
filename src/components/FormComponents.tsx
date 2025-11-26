import React from 'react';
import { FormFieldProps } from '../types';

export const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex border-b border-gray-400">{children}</div>
);

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  name,
  fullWidth = false,
  readOnly = false,
  type = "text",
  placeholder,
  flex,
  onChange,
}) => (
  <div
    className={`flex items-center p-1 h-full ${
      flex || (fullWidth ? "w-full" : "flex-1")
    } border-r border-gray-400 last:border-r-0`}
  >
    <label className="font-bold mr-2 whitespace-nowrap">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent focus:outline-none"
      readOnly={readOnly}
      placeholder={placeholder}
    />
  </div>
);